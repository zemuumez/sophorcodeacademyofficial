import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import siteData from "../../content/site.json";
import coursesData from "../../content/courses.json";
import galleryData from "../../content/gallery.json";
import translationsData from "../../content/translations.json";
import photosManifest from "../../content/photos-manifest.json";

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
