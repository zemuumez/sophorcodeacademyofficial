import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Site Name", type: "string" }),
    defineField({ name: "short", title: "Short Name", type: "string" }),
    defineField({ name: "tagline_en", title: "Tagline (English)", type: "string" }),
    defineField({ name: "tagline_am", title: "Tagline (Amharic)", type: "string" }),
    defineField({ name: "description_en", title: "Description (English)", type: "text" }),
    defineField({ name: "description_am", title: "Description (Amharic)", type: "text" }),
    defineField({ name: "location_en", title: "Location (English)", type: "string" }),
    defineField({ name: "location_am", title: "Location (Amharic)", type: "string" }),
    defineField({ name: "phone", title: "Phone Number", type: "string" }),
    defineField({ name: "email", title: "Email Address", type: "string" }),
    defineField({ name: "address_en", title: "Address (English)", type: "string" }),
    defineField({ name: "address_am", title: "Address (Amharic)", type: "string" }),
    defineField({ name: "hours_en", title: "Hours (English)", type: "string" }),
    defineField({ name: "hours_am", title: "Hours (Amharic)", type: "string" }),
    defineField({ name: "instagram", title: "Instagram Link", type: "url" }),
    defineField({ name: "telegram", title: "Telegram Link", type: "url" }),
    defineField({ name: "youtube", title: "YouTube Link", type: "url" }),
  ],
});
