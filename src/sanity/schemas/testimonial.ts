import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "role_en", title: "Role (English)", type: "string" }),
    defineField({ name: "role_am", title: "Role (Amharic)", type: "string" }),
    defineField({ name: "quote_en", title: "Quote (English)", type: "text" }),
    defineField({ name: "quote_am", title: "Quote (Amharic)", type: "text" }),
  ],
});
