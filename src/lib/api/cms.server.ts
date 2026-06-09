import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

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

  const site = JSON.parse(await fs.readFile(sitePath, "utf-8"));
  const courses = JSON.parse(await fs.readFile(coursesPath, "utf-8"));
  const gallery = JSON.parse(await fs.readFile(galleryPath, "utf-8"));
  const translations = JSON.parse(await fs.readFile(translationsPath, "utf-8"));

  return { site, courses, gallery, translations };
}

export async function writeCmsDataServer(type: string, data: any) {
  const filePath = path.join(CONTENT_DIR, `${type}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  return { success: true };
}

export async function getPhotosServer() {
  const categories = ["graduation", "classroom", "life_skills", "projects", "avatars", "hero", "general", "slideshow", "teachers"];
  const result: Record<string, string[]> = {};

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

  return result;
}

export async function uploadPhotoServer(category: string, filename: string, base64Data: string) {
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
}

export async function deletePhotoServer(photoUrl: string) {
  const relativePath = photoUrl.replace(/^\/content\/photos\//, "");
  
  if (relativePath.includes("..") || relativePath.startsWith("/")) {
    throw new Error("Invalid photo URL");
  }

  const filePath = path.join(PHOTOS_DIR, relativePath);

  if (await fileExists(filePath)) {
    await fs.unlink(filePath);
    return { success: true };
  }

  return { success: false, error: "File not found" };
}
