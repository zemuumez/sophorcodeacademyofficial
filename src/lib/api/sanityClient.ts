import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET || "production";

export const isSanityConfigured = !!projectId;

export const sanityClient = createClient({
  projectId: projectId || "disabled",
  dataset: dataset,
  apiVersion: "2026-07-12",
  useCdn: true, // true for fast, cached edge response
});

export const getSanityWriteClient = () => {
  const token = import.meta.env.SANITY_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN;
  if (!projectId || !token) return null;
  return createClient({
    projectId: projectId,
    dataset: dataset,
    token: token,
    apiVersion: "2026-07-12",
    useCdn: false, // must be false for write operations
  });
};

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  if (!source) return "";
  // If the source is already a string (like a local fallback path), return it directly
  if (typeof source === "string") return source;
  try {
    return builder.image(source).url();
  } catch (err) {
    console.warn("Failed to generate image URL from source:", source, err);
    return "";
  }
}
