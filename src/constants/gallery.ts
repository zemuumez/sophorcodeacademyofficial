import { galleryImages } from "@/assets/images";

export type GalleryCategory = "Graduation" | "Classroom" | "Life Skills" | "Projects";

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  src: string;
}

const galleryMeta: Omit<GalleryItem, "src">[] = [
  { id: "g1", title: "Cohort 03 Graduation", category: "Graduation" },
  { id: "g2", title: "Coding Lab — Web Track", category: "Classroom" },
  { id: "g3", title: "Life Skills Circle", category: "Life Skills" },
  { id: "g4", title: "Capstone Build Sprint", category: "Projects" },
  { id: "g5", title: "Caps Off, Futures On", category: "Graduation" },
  { id: "g6", title: "Python & AI Classroom", category: "Classroom" },
  { id: "g7", title: "Public Speaking Workshop", category: "Life Skills" },
  { id: "g8", title: "Team Project — Demo Day", category: "Projects" },
  { id: "g9", title: "Graduates Group Shot", category: "Graduation" },
  { id: "g10", title: "Mentor-led Code Review", category: "Classroom" },
  { id: "g11", title: "Group Project Whiteboarding", category: "Projects" },
  { id: "g12", title: "Confidence & Leadership", category: "Life Skills" },
];

export const GALLERY: GalleryItem[] = galleryMeta.map((item, index) => ({
  ...item,
  src: galleryImages[index % galleryImages.length],
}));

export const TESTIMONIALS = [
  {
    name: "Sara T.",
    role: "Parent, Bole",
    quote: "My daughter built her first website in 3 weeks. The confidence shift is real.",
  },
  {
    name: "Yonas K.",
    role: "Alumni, Age 16",
    quote: "I went from playing games to building one. Sophor gave me my first GitHub.",
  },
  {
    name: "Mahlet G.",
    role: "Teacher Partner",
    quote: "The blend of code and life skills is exactly what our youth need today.",
  },
];
