import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "./server-pv48Vp7X.mjs";
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as object, _ as _enum, s as string, b as any } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const CONTENT_DIR = path.join(process.cwd(), "src/content");
const PHOTOS_DIR = path.join(process.cwd(), "public/content/photos");
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
async function readCmsDataServer() {
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
async function writeCmsDataServer(type, data) {
  const filePath = path.join(CONTENT_DIR, `${type}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  return { success: true };
}
async function getPhotosServer() {
  const categories = ["graduation", "classroom", "life_skills", "projects", "avatars", "hero", "general", "slideshow", "teachers"];
  const result = {};
  for (const cat of categories) {
    const catPath = path.join(PHOTOS_DIR, cat);
    if (!await fileExists(catPath)) {
      await fs.mkdir(catPath, { recursive: true });
    }
    const files = await fs.readdir(catPath);
    result[cat] = files.filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file)).map((file) => `/content/photos/${cat}/${file}`);
  }
  return result;
}
async function uploadPhotoServer(category, filename, base64Data) {
  const catPath = path.join(PHOTOS_DIR, category);
  if (!await fileExists(catPath)) {
    await fs.mkdir(catPath, { recursive: true });
  }
  const safeFilename = path.basename(filename).replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const filePath = path.join(catPath, safeFilename);
  const base64Clean = base64Data.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Clean, "base64");
  await fs.writeFile(filePath, buffer);
  return {
    url: `/content/photos/${category}/${safeFilename}`,
    success: true
  };
}
async function deletePhotoServer(photoUrl) {
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
const getCmsData_createServerFn_handler = createServerRpc({
  id: "2f68df1bc7912dea48e0f740a088bd6a875a7ff877472e38cc86d7f242ed2040",
  name: "getCmsData",
  filename: "src/lib/api/cms.functions.ts"
}, (opts) => getCmsData.__executeServer(opts));
const getCmsData = createServerFn({
  method: "GET"
}).handler(getCmsData_createServerFn_handler, async () => {
  return await readCmsDataServer();
});
const saveCmsData_createServerFn_handler = createServerRpc({
  id: "ae4aa1d182f3b742d709ad431a103caf7a5fca666eb602d03a2014e6507ee36d",
  name: "saveCmsData",
  filename: "src/lib/api/cms.functions.ts"
}, (opts) => saveCmsData.__executeServer(opts));
const saveCmsData = createServerFn({
  method: "POST"
}).inputValidator(object({
  type: _enum(["site", "courses", "gallery", "translations"]),
  data: any()
})).handler(saveCmsData_createServerFn_handler, async ({
  data: input
}) => {
  return await writeCmsDataServer(input.type, input.data);
});
const getPhotos_createServerFn_handler = createServerRpc({
  id: "4210455d25da4e34dbbe8f6b131f0db9e214f680b0ae6e7193d90337c4d3e8e5",
  name: "getPhotos",
  filename: "src/lib/api/cms.functions.ts"
}, (opts) => getPhotos.__executeServer(opts));
const getPhotos = createServerFn({
  method: "GET"
}).handler(getPhotos_createServerFn_handler, async () => {
  return await getPhotosServer();
});
const uploadPhoto_createServerFn_handler = createServerRpc({
  id: "bbb049adf08856dfa55ee79ba8b53db588c9843fa30d91e4e108177c9d59599e",
  name: "uploadPhoto",
  filename: "src/lib/api/cms.functions.ts"
}, (opts) => uploadPhoto.__executeServer(opts));
const uploadPhoto = createServerFn({
  method: "POST"
}).inputValidator(object({
  category: string().min(1),
  filename: string().min(1),
  base64Data: string().min(1)
})).handler(uploadPhoto_createServerFn_handler, async ({
  data: input
}) => {
  return await uploadPhotoServer(input.category, input.filename, input.base64Data);
});
const deletePhoto_createServerFn_handler = createServerRpc({
  id: "972560a032c8f579c8d635233af58d4c41596548ac543b5e8ea84b33f0e7dfc2",
  name: "deletePhoto",
  filename: "src/lib/api/cms.functions.ts"
}, (opts) => deletePhoto.__executeServer(opts));
const deletePhoto = createServerFn({
  method: "POST"
}).inputValidator(object({
  photoUrl: string().min(1)
})).handler(deletePhoto_createServerFn_handler, async ({
  data: input
}) => {
  return await deletePhotoServer(input.photoUrl);
});
export {
  deletePhoto_createServerFn_handler,
  getCmsData_createServerFn_handler,
  getPhotos_createServerFn_handler,
  saveCmsData_createServerFn_handler,
  uploadPhoto_createServerFn_handler
};
