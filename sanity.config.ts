import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemas } from "./src/sanity/schemas/schema";

const projectId = 
  import.meta.env.VITE_SANITY_PROJECT_ID || 
  (typeof process !== "undefined" ? process.env.VITE_SANITY_PROJECT_ID : undefined);

const dataset = 
  import.meta.env.VITE_SANITY_DATASET || 
  (typeof process !== "undefined" ? process.env.VITE_SANITY_DATASET : undefined) || 
  "production";

if (!projectId) {
  throw new Error("Missing environment variable: VITE_SANITY_PROJECT_ID");
}

export default defineConfig({
  name: "sophor-code-academy",
  title: "Sophor Code Academy CMS",

  // These should match your project id from sanity.io/manage
  projectId,
  dataset,

  plugins: [deskTool()],

  schema: {
    types: schemas,
  },
});
