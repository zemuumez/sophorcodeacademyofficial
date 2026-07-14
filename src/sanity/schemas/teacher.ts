import { defineType, defineField } from "sanity";

export const teacher = defineType({
  name: "teacher",
  title: "Teacher / Mentor",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Full Name", type: "string" }),
    defineField({ name: "role_en", title: "Role (English)", type: "string" }),
    defineField({ name: "role_am", title: "Role (Amharic)", type: "string" }),
    defineField({ name: "degree", title: "Degree / Qualifications", type: "string" }),
    defineField({
      name: "image",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
