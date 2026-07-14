import { defineType, defineField } from "sanity";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery Item",
  type: "document",
  fields: [
    defineField({ name: "title_en", title: "Title (English)", type: "string" }),
    defineField({ name: "title_am", title: "Title (Amharic)", type: "string" }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Graduation", value: "graduation" },
          { title: "Classroom", value: "classroom" },
          { title: "Life Skills", value: "life_skills" },
          { title: "Projects", value: "projects" },
          { title: "Avatars", value: "avatars" },
          { title: "Hero", value: "hero" },
          { title: "General", value: "general" },
          { title: "Slideshow", value: "slideshow" },
          { title: "Teachers", value: "teachers" },
        ],
      },
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
