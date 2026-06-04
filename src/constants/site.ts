export const SITE = {
  name: "Sophor Code Academy",
  short: "Sophor Code Academy",
  tagline: "Code. Create. Conquer.",
  description:
    "Ethiopia's summer bootcamp empowering kids and youth with coding, AI, and life skills.",
  location: "Addis Ababa, Ethiopia",
  phone: "+251 911 234 567",
  email: "hello@sophor.academy",
  address: "Bole Road, Addis Ababa, Ethiopia",
  hours: "Mon–Sat · 9:00 – 18:00 EAT",
  social: {
    instagram: "https://instagram.com/sophor.academy",
    telegram: "https://t.me/sophoracademy",
    youtube: "https://youtube.com/@sophoracademy",
  },
};

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Bootcamps", to: "/bootcamps" },
  { label: "Gallery", to: "/gallery" },
  { label: "Register", to: "/register" },
  { label: "Contact", to: "/contact" },
] as const;
