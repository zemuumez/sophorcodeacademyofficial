import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  readCmsDataServer,
  writeCmsDataServer,
  getPhotosServer,
  uploadPhotoServer,
  deletePhotoServer,
  submitContactFormServer,
} from "./cms.server";

// 1. Get CMS data
export const getCmsData = createServerFn({ method: "GET" })
  .handler(async () => {
    return await readCmsDataServer();
  });

// 2. Save CMS data
export const saveCmsData = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      type: z.enum(["site", "courses", "gallery", "translations"]),
      data: z.any(),
    })
  )
  .handler(async ({ data: input }) => {
    return await writeCmsDataServer(input.type, input.data);
  });

// 3. Get all photos categorized
export const getPhotos = createServerFn({ method: "GET" })
  .handler(async () => {
    return await getPhotosServer();
  });

// 4. Upload photo
export const uploadPhoto = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      category: z.string().min(1),
      filename: z.string().min(1),
      base64Data: z.string().min(1),
    })
  )
  .handler(async ({ data: input }) => {
    return await uploadPhotoServer(input.category, input.filename, input.base64Data);
  });

// 5. Delete photo
export const deletePhoto = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      photoUrl: z.string().min(1),
    })
  )
  .handler(async ({ data: input }) => {
    return await deletePhotoServer(input.photoUrl);
  });

// 6. Submit contact form submission
export const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string().min(1),
      email: z.string().email(),
      subject: z.string().min(1),
      message: z.string().min(1),
    })
  )
  .handler(async ({ data: input }) => {
    return await submitContactFormServer(input);
  });
