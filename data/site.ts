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
export const about = {
  label: "About",
  statement:
    "Real products have messy requirements. I build the front end that keeps them clear, fast and accessible.",
  body: "I'm a front-end developer based in Cairo, working mostly with React, Next.js and TypeScript. My most recent project is Avante Dental Solutions, a real client's platform that replaced a dental lab's manual order process: dentists upload cases, pick materials, pay and follow each case through production. I built the user-facing side. I trained in front-end development at ITI in 2025.",
  photo: {
    src: "/Abdulrhamn.png",
    alt: "Portrait of Abdulrhman Rabea",
  },
  facts: [
    { label: "Based in", value: "Cairo, Egypt" },
    { label: "Focus", value: "React, Next.js, TypeScript" },
    { label: "Training", value: "ITI, Front-End Development (2025)" },
    { label: "Languages", value: "Arabic (native), English (B2)" },
  ],
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
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;
