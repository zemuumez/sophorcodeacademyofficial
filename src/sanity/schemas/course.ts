import { defineType, defineField } from "sanity";

export const course = defineType({
  name: "course",
  title: "Course / Bootcamp",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "Course ID (e.g., kids-bootcamp)",
      type: "slug",
      options: { source: "title_en" },
    }),
    defineField({ name: "title_en", title: "Title (English)", type: "string" }),
    defineField({ name: "title_am", title: "Title (Amharic)", type: "string" }),
    defineField({
      name: "ageGroup",
      title: "Age Group",
      type: "string",
      options: {
        list: ["Kids", "Juniors", "Seniors", "Private"],
      },
    }),
    defineField({
      name: "track",
      title: "Track Type",
      type: "string",
      options: {
        list: ["Bootcamp Package", "1-on-1 Mentorship"],
      },
    }),
    defineField({ name: "ageRange_en", title: "Age Range (English)", type: "string" }),
    defineField({ name: "ageRange_am", title: "Age Range (Amharic)", type: "string" }),
    defineField({ name: "duration_en", title: "Duration (English)", type: "string" }),
    defineField({ name: "duration_am", title: "Duration (Amharic)", type: "string" }),
    defineField({
      name: "tools",
      title: "Tools & Technologies",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "outcomes_en",
      title: "Learning Outcomes (English)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "outcomes_am",
      title: "Learning Outcomes (Amharic)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "badge_en", title: "Skill Badge (English)", type: "string" }),
    defineField({ name: "badge_am", title: "Skill Badge (Amharic)", type: "string" }),
    defineField({
      name: "accent",
      title: "Color Accent",
      type: "string",
      options: {
        list: [
          { title: "Green", value: "green" },
          { title: "Gold/Yellow", value: "gold" },
          { title: "Red", value: "red" },
          { title: "Blue", value: "blue" },
        ],
      },
    }),
  ],
});
