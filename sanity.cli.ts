import { defineCliConfig } from "sanity/cli";

const projectId = process.env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET || "production";

if (!projectId) {
  throw new Error("Missing environment variable: VITE_SANITY_PROJECT_ID");
}

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
});
