import type { SocialLinks } from "@/types/content";

export const siteConfig = {
  name: "Abdulrhman Rabea",
  title: "Full-Stack Developer",
  location: " Egypt",
  email: "devabdulrhmanrabea@gmail.com",
  description:
    "Front-End Developer building fast, accessible web applications with React, Next.js and TypeScript.",
  // Update when you add a custom domain
  url: "https://portfolio-rho-ten-f8pxo4dc9l.vercel.app",
} as const;

export const socialLinks: readonly SocialLinks[] = [
  { label: "GitHub", href: "https://github.com/Abdulrhman-Rabea" },
  { label: "LinkedIn", href: "https://linkedin.com/in/abdulrhman-rabea" },
];
export const hero = {
  nameLines: ["Abdulrhman", "Rabea"],
  availability: "Open to full-time roles & freelance projects",
  headline: "Full-stack developer turning complex workflows into simple interfaces.",
} as const;