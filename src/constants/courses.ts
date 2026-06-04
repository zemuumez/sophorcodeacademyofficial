import {
  Brain,
  Users,
  Mic,
  Sprout,
  Zap,
  Bot,
  Sparkles,
  Globe2,
  type LucideIcon,
} from "lucide-react";

export type AgeGroup = "Kids" | "Teens" | "Youth";
export type Track = "Fundamentals" | "Web" | "AI" | "Mobile" | "Robotics";

export interface Course {
  id: string;
  title: string;
  ageGroup: AgeGroup;
  track: Track;
  ageRange: string;
  duration: string;
  tools: string[];
  outcomes: string[];
  badge: string;
  accent: "green" | "gold" | "red";
}

export const COURSES: Course[] = [
  {
    id: "scratch-makers",
    title: "Scratch Makers",
    ageGroup: "Kids",
    track: "Fundamentals",
    ageRange: "Ages 8–11",
    duration: "4 weeks · 3 days/week",
    tools: ["Scratch", "MIT App Inventor", "Logic Puzzles"],
    outcomes: ["2 animated stories", "1 mini-game", "Group showcase"],
    badge: "Pixel Pioneer",
    accent: "green",
  },
  {
    id: "web-wizards",
    title: "Web Wizards",
    ageGroup: "Teens",
    track: "Web",
    ageRange: "Ages 12–15",
    duration: "6 weeks · 4 days/week",
    tools: ["HTML", "CSS", "JavaScript", "Git"],
    outcomes: ["Personal portfolio site", "Interactive landing page"],
    badge: "Web Architect",
    accent: "gold",
  },
  {
    id: "python-ai",
    title: "Python & AI Explorers",
    ageGroup: "Teens",
    track: "AI",
    ageRange: "Ages 14–17",
    duration: "6 weeks · 4 days/week",
    tools: ["Python", "Pandas", "scikit-learn", "OpenAI API"],
    outcomes: ["AI chatbot", "Image classifier", "Data story"],
    badge: "AI Whisperer",
    accent: "red",
  },
  {
    id: "mobile-makers",
    title: "Mobile App Makers",
    ageGroup: "Youth",
    track: "Mobile",
    ageRange: "Ages 16–22",
    duration: "8 weeks · 5 days/week",
    tools: ["React Native", "Expo", "Firebase"],
    outcomes: ["Published demo app", "App-store-ready build"],
    badge: "App Forge",
    accent: "green",
  },
  {
    id: "robotics-lab",
    title: "Robotics Lab",
    ageGroup: "Kids",
    track: "Robotics",
    ageRange: "Ages 10–13",
    duration: "5 weeks · 3 days/week",
    tools: ["Arduino", "LEGO Spike", "Sensors"],
    outcomes: ["Line-following bot", "Smart-home demo"],
    badge: "Circuit Hero",
    accent: "gold",
  },
  {
    id: "ai-builders",
    title: "Generative AI Builders",
    ageGroup: "Youth",
    track: "AI",
    ageRange: "Ages 16+",
    duration: "6 weeks · 4 days/week",
    tools: ["LangChain", "Next.js", "Vector DBs"],
    outcomes: ["Custom AI assistant", "Full-stack AI MVP"],
    badge: "Prompt Master",
    accent: "red",
  },
];

export interface IconItem {
  title: string;
  desc: string;
  icon: LucideIcon;
}

export const LIFE_SKILLS: IconItem[] = [
  { title: "Critical Thinking", desc: "Break down problems like an engineer.", icon: Brain },
  { title: "Teamwork", desc: "Ship real projects in cross-age squads.", icon: Users },
  { title: "Presentation", desc: "Pitch on Demo Day in front of family and mentors.", icon: Mic },
  { title: "Growth Mindset", desc: "Embrace bugs, iterate, ship again.", icon: Sprout },
];

export const VALUES: IconItem[] = [
  {
    title: "Hands-on Projects",
    desc: "Every learner ships something real — from games to AI apps.",
    icon: Zap,
  },
  {
    title: "AI-First Mindset",
    desc: "We teach kids to build with AI, not just consume it.",
    icon: Bot,
  },
  {
    title: "Essential Life Skills",
    desc: "Critical thinking, teamwork, and stage-ready presentation.",
    icon: Sparkles,
  },
  {
    title: "Ethiopian, Global",
    desc: "Rooted in Addis. Curriculum built for global standards.",
    icon: Globe2,
  },
];
