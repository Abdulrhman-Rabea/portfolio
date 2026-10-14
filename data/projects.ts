import type { Project } from "@/types/content";

export const projects: readonly Project[] = [
  {
    slug: "avante",
    title: "Avante Dental Solutions",
    tagline: "A digital workflow for a dental laboratory.",
    role: "Front-End Developer",
    stack: ["Next.js", "React", "TypeScript", "TanStack Query"],
    featured: true,
    hasCaseStudy: true,
    liveUrl: " https://www.avantedentalsolutions.cloud/en",
  },
  {
    slug: "up-course",
    title: "Up-Course",
    tagline: "An e-learning platform for design and development courses.",
    role: "Front-End Developer",
    stack: ["React", "Firebase", "Tailwind CSS", "Supabase"],
    liveUrl: "https://up-course-1.vercel.app/",
    repoUrl: "https://github.com/Abdulrhman-Rabea/Up-Course",
    featured: true,
    hasCaseStudy: true,
  },
];
