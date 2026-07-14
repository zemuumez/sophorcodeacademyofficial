import { defineType, defineField } from "sanity";

export const lifeSkill = defineType({
  name: "lifeSkill",
  title: "Common Core Life Skill",
  type: "document",
  fields: [
    defineField({ name: "title_en", title: "Title (English)", type: "string" }),
    defineField({ name: "title_am", title: "Title (Amharic)", type: "string" }),
    defineField({ name: "desc_en", title: "Description (English)", type: "text" }),
    defineField({ name: "desc_am", title: "Description (Amharic)", type: "text" }),
    defineField({
      name: "icon",
      title: "Lucide Icon Name (e.g., BookOpen, Sparkles, Compass)",
      type: "string",
    }),
  ],
});
