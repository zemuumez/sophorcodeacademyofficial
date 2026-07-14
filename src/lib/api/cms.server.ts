import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import siteData from "../../content/site.json";
import coursesData from "../../content/courses.json";
import galleryData from "../../content/gallery.json";
import translationsData from "../../content/translations.json";
import photosManifest from "../../content/photos-manifest.json";

import { sanityClient, urlFor, isSanityConfigured, getSanityWriteClient } from "./sanityClient";

const CONTENT_DIR = path.join(process.cwd(), "src/content");
const PHOTOS_DIR = path.join(process.cwd(), "public/content/photos");

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function readCmsDataServer() {
  // If Sanity is configured, attempt to fetch from Sanity first
  if (isSanityConfigured) {
    try {
      console.log("Fetching CMS data from Sanity...");
      
      // 1. Fetch Site Settings
      const siteSettingsQuery = `*[_type == "siteSettings"][0]{
        name,
        short,
        "tagline": {
          "en": tagline_en,
          "am": tagline_am
        },
        "description": {
          "en": description_en,
          "am": description_am
        },
        "location": {
          "en": location_en,
          "am": location_am
        },
        phone,
        email,
        "address": {
          "en": address_en,
          "am": address_am
        },
        "hours": {
          "en": hours_en,
          "am": hours_am
        },
        "social": {
          "instagram": instagram,
          "telegram": telegram,
          "youtube": youtube
        }
      }`;
      const sanitySite = await sanityClient.fetch(siteSettingsQuery);

      // 2. Fetch Courses / Bootcamps
      const coursesQuery = `*[_type == "course"] | order(title_en asc){
        "id": id.current,
        "title": { "en": title_en, "am": title_am },
        ageGroup,
        track,
        "ageRange": { "en": ageRange_en, "am": ageRange_am },
        "duration": { "en": duration_en, "am": duration_am },
        tools,
        "outcomes": { "en": outcomes_en, "am": outcomes_am },
        "badge": { "en": badge_en, "am": badge_am },
        accent
      }`;
      const sanityCourses = await sanityClient.fetch(coursesQuery);

      // 3. Fetch Life Skills
      const lifeSkillsQuery = `*[_type == "lifeSkill"] | order(title_en asc){
        "title": { "en": title_en, "am": title_am },
        "desc": { "en": desc_en, "am": desc_am },
        icon
      }`;
      const sanityLifeSkills = await sanityClient.fetch(lifeSkillsQuery);

      // 4. Fetch Core Values
      const valuesQuery = `*[_type == "coreValue"] | order(title_en asc){
        "title": { "en": title_en, "am": title_am },
        "desc": { "en": desc_en, "am": desc_am },
        icon
      }`;
      const sanityValues = await sanityClient.fetch(valuesQuery);

      // 5. Fetch Teachers / Mentors
      const teachersQuery = `*[_type == "teacher"] | order(name asc){
        name,
        "role": { "en": role_en, "am": role_am },
        degree,
        image
      }`;
      const sanityTeachersRaw = await sanityClient.fetch(teachersQuery);
      const sanityTeachers = (sanityTeachersRaw || []).map((t: any) => ({
        name: t.name,
        role: t.role,
        degree: t.degree,
        image: urlFor(t.image) || "/placeholder.jpg"
      }));

      // Assemble Courses Object
      const courses = {
        courses: sanityCourses && sanityCourses.length > 0 ? sanityCourses : coursesData.courses,
        life_skills: sanityLifeSkills && sanityLifeSkills.length > 0 ? sanityLifeSkills : coursesData.life_skills,
        values: sanityValues && sanityValues.length > 0 ? sanityValues : coursesData.values,
        teachers: sanityTeachers && sanityTeachers.length > 0 ? sanityTeachers : coursesData.teachers
      };

      // 6. Fetch Gallery and Photo Titles and Testimonials
      const testimonialsQuery = `*[_type == "testimonial"] | order(name asc){
        name,
        "role": { "en": role_en, "am": role_am },
        "quote": { "en": quote_en, "am": quote_am }
      }`;
      const sanityTestimonials = await sanityClient.fetch(testimonialsQuery);

      const galleryItemsQuery = `*[_type == "galleryItem"]{
        "title_en": title_en,
        "title_am": title_am,
        image
      }`;
      const sanityGalleryItems = await sanityClient.fetch(galleryItemsQuery);
      const photo_titles: Record<string, { en: string; am: string }> = {};
      (sanityGalleryItems || []).forEach((item: any) => {
        if (item.image) {
          const url = urlFor(item.image);
          if (url) {
            photo_titles[url] = {
              en: item.title_en || "",
              am: item.title_am || "",
            };
          }
        }
      });

      const gallery = {
        photo_titles: Object.keys(photo_titles).length > 0 ? photo_titles : galleryData.photo_titles,
        testimonials: sanityTestimonials && sanityTestimonials.length > 0 ? sanityTestimonials : galleryData.testimonials
      };

      // 7. Local translations fallback (translations are static string dictionaries, kept local for safety/performance)
      const translationsPath = path.join(CONTENT_DIR, "translations.json");
      let translations = translationsData;
      try {
        if (await fileExists(translationsPath)) {
          translations = JSON.parse(await fs.readFile(translationsPath, "utf-8"));
        }
      } catch (e) {
        console.warn("Using bundled translations.json fallback:", e);
      }

      return {
        site: sanitySite || siteData,
        courses,
        gallery,
        translations
      };

    } catch (error) {
      console.error("Sanity query failed. Falling back to local JSON files.", error);
    }
  }

  // Fallback / standard code to read local JSON files:
  const sitePath = path.join(CONTENT_DIR, "site.json");
  const coursesPath = path.join(CONTENT_DIR, "courses.json");
  const galleryPath = path.join(CONTENT_DIR, "gallery.json");
  const translationsPath = path.join(CONTENT_DIR, "translations.json");

  let site = siteData;
  let courses = coursesData;
  let gallery = galleryData;
  let translations = translationsData;

  try {
    if (await fileExists(sitePath)) {
      site = JSON.parse(await fs.readFile(sitePath, "utf-8"));
    }
  } catch (e) {
    console.warn("Using bundled site.json fallback:", e);
  }

  try {
    if (await fileExists(coursesPath)) {
      courses = JSON.parse(await fs.readFile(coursesPath, "utf-8"));
    }
  } catch (e) {
    console.warn("Using bundled courses.json fallback:", e);
  }

  try {
    if (await fileExists(galleryPath)) {
      gallery = JSON.parse(await fs.readFile(galleryPath, "utf-8"));
    }
  } catch (e) {
    console.warn("Using bundled gallery.json fallback:", e);
  }

  try {
    if (await fileExists(translationsPath)) {
      translations = JSON.parse(await fs.readFile(translationsPath, "utf-8"));
    }
  } catch (e) {
    console.warn("Using bundled translations.json fallback:", e);
  }

  return { site, courses, gallery, translations };
}

export async function writeCmsDataServer(type: string, data: any) {
  try {
    const filePath = path.join(CONTENT_DIR, `${type}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    return { success: true };
  } catch (error) {
    console.error("Failed to write CMS data to disk (unsupported in serverless):", error);
    return { success: false, error: String(error) };
  }
}

export async function getPhotosServer() {
  if (isSanityConfigured) {
    try {
      console.log("Fetching photo paths from Sanity...");
      const sanityItems = await sanityClient.fetch(`*[_type == "galleryItem"]{ category, image }`);
      const result: Record<string, string[]> = {
        graduation: [],
        classroom: [],
        life_skills: [],
        projects: [],
        avatars: [],
        hero: [],
        general: [],
        slideshow: [],
        teachers: []
      };

      (sanityItems || []).forEach((item: any) => {
        if (item.category && result[item.category] !== undefined && item.image) {
          const url = urlFor(item.image);
          if (url) {
            result[item.category].push(url);
          }
        }
      });

      // Fill in any missing category arrays to prevent errors
      Object.keys(result).forEach(key => {
        if (result[key].length === 0) {
          result[key] = photosManifest[key as keyof typeof photosManifest] || [];
        }
      });

      return result;
    } catch (err) {
      console.warn("Failed to get photos from Sanity, falling back to local files:", err);
    }
  }

  // Local filesystem fallback
  const categories = ["graduation", "classroom", "life_skills", "projects", "avatars", "hero", "general", "slideshow", "teachers"];
  const result: Record<string, string[]> = {};

  try {
    for (const cat of categories) {
      const catPath = path.join(PHOTOS_DIR, cat);
      if (!(await fileExists(catPath))) {
        await fs.mkdir(catPath, { recursive: true });
      }
      
      const files = await fs.readdir(catPath);
      result[cat] = files
        .filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
        .map((file) => `/content/photos/${cat}/${file}`);
    }
  } catch (error) {
    console.warn("Failed to read photos from disk, using pre-scanned photo manifest fallback:", error);
    return photosManifest as Record<string, string[]>;
  }

  return result;
}

export async function uploadPhotoServer(category: string, filename: string, base64Data: string) {
  try {
    const catPath = path.join(PHOTOS_DIR, category);
    if (!(await fileExists(catPath))) {
      await fs.mkdir(catPath, { recursive: true });
    }

    const safeFilename = path.basename(filename).replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const filePath = path.join(catPath, safeFilename);

    const base64Clean = base64Data.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Clean, "base64");

    await fs.writeFile(filePath, buffer);

    return {
      url: `/content/photos/${category}/${safeFilename}`,
      success: true,
    };
  } catch (error) {
    console.error("Failed to upload photo (unsupported in serverless):", error);
    return { success: false, error: String(error) };
  }
}

export async function deletePhotoServer(photoUrl: string) {
  try {
    const relativePath = photoUrl.replace(/^\/content\/photos\//, "");
    
    if (relativePath.includes("..") || relativePath.startsWith("/")) {
      throw new Error("Invalid photo URL");
    }

    const filePath = path.join(PHOTOS_DIR, relativePath);

    if (await fileExists(filePath)) {
      await fs.unlink(filePath);
      return { success: true };
    }
  } catch (error) {
    console.error("Failed to delete photo (unsupported in serverless):", error);
    return { success: false, error: String(error) };
  }

  return { success: false, error: "File not found" };
}

export async function submitContactFormServer(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const writeClient = getSanityWriteClient();
  if (writeClient) {
    try {
      console.log("Saving contact submission to Sanity...");
      const doc = {
        _type: "contactSubmission",
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        submittedAt: new Date().toISOString(),
      };
      const result = await writeClient.create(doc);
      return { success: true, id: result._id };
    } catch (error) {
      console.error("Failed to write contact submission to Sanity:", error);
      return { success: false, error: String(error) };
    }
  }

  // Fallback if write token is not configured
  console.log("Sanity write client not configured. Local console log fallback:", data);
  return { success: true, localOnly: true };
}
