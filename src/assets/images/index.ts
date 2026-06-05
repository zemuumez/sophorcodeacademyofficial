import logo from "./logo.jpg";

export { logo };

const imageModules = import.meta.glob<string>("./*.jpeg", {
  eager: true,
  import: "default",
});

/** All local academy photos, sorted chronologically by filename. */
export const allImages = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src);

export const studentAvatars = allImages.slice(0, 3);
export const heroImage = allImages[3] ?? allImages[0];
export const campusImage = allImages[4] ?? allImages[0];
export const galleryImages = allImages.slice(5, 17);
