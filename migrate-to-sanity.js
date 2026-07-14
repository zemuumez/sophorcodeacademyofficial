import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("\x1b[31mError: SANITY_PROJECT_ID and SANITY_WRITE_TOKEN environment variables must be set.\x1b[0m");
  console.log("\nUsage:");
  console.log("  SANITY_PROJECT_ID=xxxx SANITY_WRITE_TOKEN=yyyy node migrate-to-sanity.js\n");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-07-12",
  useCdn: false,
});

async function uploadImage(localPath) {
  if (!localPath) return null;

  // Clean lead slash and construct absolute path
  const cleanPath = localPath.replace(/^\//, "");
  const absolutePath = path.join(__dirname, cleanPath);

  try {
    if (!fs.existsSync(absolutePath)) {
      console.warn(`\x1b[33mWarning: Image file not found at ${absolutePath}, skipping.\x1b[0m`);
      return null;
    }

    console.log(`Uploading image asset: ${cleanPath}...`);
    const fileStream = fs.createReadStream(absolutePath);
    const asset = await client.assets.upload("image", fileStream, {
      filename: path.basename(absolutePath),
    });
    console.log(`Uploaded image successfully, asset ID: ${asset._id}`);
    
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    };
  } catch (err) {
    console.error(`\x1b[31mError uploading image ${localPath}:\x1b[0m`, err);
    return null;
  }
}

async function migrateSiteSettings() {
  console.log("\n--- Migrating Site Settings ---");
  const sitePath = path.join(__dirname, "src/content/site.json");
  if (!fs.existsSync(sitePath)) {
    console.log("No site.json found, skipping.");
    return;
  }
  
  const site = JSON.parse(fs.readFileSync(sitePath, "utf-8"));
  
  const doc = {
    _id: "siteSettings", // Singleton document ID
    _type: "siteSettings",
    name: site.name,
    short: site.short,
    tagline_en: site.tagline?.en || "",
    tagline_am: site.tagline?.am || "",
    description_en: site.description?.en || "",
    description_am: site.description?.am || "",
    location_en: site.location?.en || "",
    location_am: site.location?.am || "",
    phone: site.phone,
    email: site.email,
    address_en: site.address?.en || "",
    address_am: site.address?.am || "",
    hours_en: site.hours?.en || "",
    hours_am: site.hours?.am || "",
    instagram: site.social?.instagram || "",
    telegram: site.social?.telegram || "",
    youtube: site.social?.youtube || "",
  };

  console.log("Uploading siteSettings...");
  await client.createOrReplace(doc);
  console.log("\x1b[32mSite settings migrated successfully!\x1b[0m");
}

async function migrateCourses() {
  console.log("\n--- Migrating Courses, Life Skills, Core Values, and Teachers ---");
  const coursesPath = path.join(__dirname, "src/content/courses.json");
  if (!fs.existsSync(coursesPath)) {
    console.log("No courses.json found, skipping.");
    return;
  }
  
  const data = JSON.parse(fs.readFileSync(coursesPath, "utf-8"));

  // Courses
  if (data.courses && Array.isArray(data.courses)) {
    for (const c of data.courses) {
      console.log(`Migrating Course: ${c.title?.en || c.id}...`);
      const doc = {
        _id: `course-${c.id}`,
        _type: "course",
        id: { _type: "slug", current: c.id },
        title_en: c.title?.en || "",
        title_am: c.title?.am || "",
        ageGroup: c.ageGroup,
        track: c.track,
        ageRange_en: c.ageRange?.en || "",
        ageRange_am: c.ageRange?.am || "",
        duration_en: c.duration?.en || "",
        duration_am: c.duration?.am || "",
        tools: c.tools || [],
        outcomes_en: c.outcomes?.en || [],
        outcomes_am: c.outcomes?.am || [],
        badge_en: c.badge?.en || "",
        badge_am: c.badge?.am || "",
        accent: c.accent || "green",
      };
      await client.createOrReplace(doc);
    }
  }

  // Life Skills
  if (data.life_skills && Array.isArray(data.life_skills)) {
    for (let i = 0; i < data.life_skills.length; i++) {
      const s = data.life_skills[i];
      console.log(`Migrating Life Skill: ${s.title?.en}...`);
      const doc = {
        _id: `lifeSkill-${i}`,
        _type: "lifeSkill",
        title_en: s.title?.en || "",
        title_am: s.title?.am || "",
        desc_en: s.desc?.en || "",
        desc_am: s.desc?.am || "",
        icon: s.icon,
      };
      await client.createOrReplace(doc);
    }
  }

  // Core Values
  if (data.values && Array.isArray(data.values)) {
    for (let i = 0; i < data.values.length; i++) {
      const v = data.values[i];
      console.log(`Migrating Core Value: ${v.title?.en}...`);
      const doc = {
        _id: `coreValue-${i}`,
        _type: "coreValue",
        title_en: v.title?.en || "",
        title_am: v.title?.am || "",
        desc_en: v.desc?.en || "",
        desc_am: v.desc?.am || "",
        icon: v.icon,
      };
      await client.createOrReplace(doc);
    }
  }

  // Teachers
  if (data.teachers && Array.isArray(data.teachers)) {
    for (const t of data.teachers) {
      console.log(`Migrating Teacher: ${t.name}...`);
      const doc = {
        _id: `teacher-${t.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
        _type: "teacher",
        name: t.name,
        role_en: t.role?.en || "",
        role_am: t.role?.am || "",
        degree: t.degree || "",
      };

      if (t.image) {
        const localImgPath = path.join("public", t.image);
        const imageAsset = await uploadImage(localImgPath);
        if (imageAsset) {
          doc.image = imageAsset;
        }
      }
      await client.createOrReplace(doc);
    }
  }
  
  console.log("\x1b[32mCourses content migrated successfully!\x1b[0m");
}

async function migrateGallery() {
  console.log("\n--- Migrating Gallery and Testimonials ---");
  const galleryPath = path.join(__dirname, "src/content/gallery.json");
  const manifestPath = path.join(__dirname, "src/content/photos-manifest.json");

  if (!fs.existsSync(galleryPath)) {
    console.log("No gallery.json found, skipping.");
    return;
  }
  
  const galleryData = JSON.parse(fs.readFileSync(galleryPath, "utf-8"));

  // Testimonials
  if (galleryData.testimonials && Array.isArray(galleryData.testimonials)) {
    for (let i = 0; i < galleryData.testimonials.length; i++) {
      const t = galleryData.testimonials[i];
      console.log(`Migrating Testimonial: ${t.name}...`);
      const doc = {
        _id: `testimonial-${i}`,
        _type: "testimonial",
        name: t.name,
        role_en: t.role?.en || "",
        role_am: t.role?.am || "",
        quote_en: t.quote?.en || "",
        quote_am: t.quote?.am || "",
      };
      await client.createOrReplace(doc);
    }
  }

  // Gallery Items
  if (fs.existsSync(manifestPath)) {
    const photosManifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    const photoTitles = galleryData.photo_titles || {};
    const categories = Object.keys(photosManifest);

    for (const cat of categories) {
      const fileUrls = photosManifest[cat] || [];
      for (const url of fileUrls) {
        console.log(`Processing gallery photo: ${url} (category: ${cat})...`);
        const localImgPath = path.join("public", url);
        const imageAsset = await uploadImage(localImgPath);

        if (imageAsset) {
          const titleInfo = photoTitles[url] || {};
          const titleEn = titleInfo.en || "";
          const titleAm = titleInfo.am || "";
          
          // Generate a safe unique ID from the filename
          const filename = url.split("/").pop().replace(/\.[^/.]+$/, "");
          const cleanId = `gallery-${cat}-${filename.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;

          const doc = {
            _id: cleanId,
            _type: "galleryItem",
            title_en: titleEn,
            title_am: titleAm,
            category: cat,
            image: imageAsset,
          };
          
          await client.createOrReplace(doc);
        }
      }
    }
  }
  console.log("\x1b[32mGallery and Testimonials migrated successfully!\x1b[0m");
}

async function runMigration() {
  try {
    console.log("Starting Sophor Academy CMS Migration...");
    await migrateSiteSettings();
    await migrateCourses();
    await migrateGallery();
    console.log("\n\x1b[32;1mAll migrations complete! Sanity is fully populated. 🎉\x1b[0m\n");
  } catch (err) {
    console.error("\x1b[31mCritical error during migration:\x1b[0m", err);
    process.exit(1);
  }
}

runMigration();
