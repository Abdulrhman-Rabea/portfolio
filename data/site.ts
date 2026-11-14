import type { SkillGroup, SocialLinks } from "@/types/content";


export const siteConfig = {
  name: "Abdulrhman Rabea",
  title: "Full-Stack Developer",
  location: "Egypt",
  email: "devabdulrhmanrabea@gmail.com",
  description:
    "Full-Stack Developer building scalable, high-performance web applications using React, Next.js, Node.js, Express.js, and TypeScript. Focused on creating seamless user experiences and robust backend solutions.",
  url: "https://portfolio-rho-ten-f8pxo4dc9l.vercel.app",
} as const;

export const socialLinks: readonly SocialLinks[] = [
  { label: "GitHub", href: "https://github.com/Abdulrhman-Rabea" },
  { label: "LinkedIn", href: "https://linkedin.com/in/abdulrhman-rabea" },
];

export const hero = {
  nameLines: ["Abdulrhman", "Rabea"],
  availability: "Open to full-time roles & freelance projects",
  headline:
    "Full-stack developer building seamless experiences from frontend to backend.",
} as const;
export const skillGroups: readonly SkillGroup[] = [
  {
    name: "Interface",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS", "SASS"],
  },

  {
    name: "Data & state",
    items: ["TanStack Query", "Firebase", "Supabase", "Node.js / Express"],
  },
  {
    name: "Tooling & delivery",
    items: ["Git / GitHub", "Vercel"],
  },
];