import type { Project } from "@/types/content";
export const projects: readonly Project[] = [
  {
    slug: "avante",
    title: "Avante Dental Solutions",
    tagline: "A digital workflow for a dental laboratory.",
    role: "Front-End Developer",
    stack: ["Next.js", "React", "TypeScript", "TanStack Query"],
    image: {
      src: "/Avante screenshot.png",
      alt: "Screenshot of the Avante Dental Solutions platform",
    },
    featured: true,
    hasCaseStudy: false,
    liveUrl: "https://web.archive.org/web/20260304033332/https://avantedentalsolutions.cloud/en",
  },
  {
    slug: "up-course",
    title: "Up-Course",
    tagline: "An e-learning platform for design and development courses.",
    role: "Front-End Developer",
    stack: ["React", "Firebase", "Tailwind CSS", "Supabase"],
    image: {
      src: "/upcourse.png",
      alt: "Screenshot of the Up-Course e-learning platform",
    },
    liveUrl: "https://up-course-1.vercel.app/",
    repoUrl: "https://github.com/Abdulrhman-Rabea/Up-Course",
    featured: true,
    hasCaseStudy: false,
  },
];
