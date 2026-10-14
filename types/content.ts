export interface SocialLinks {
  label: string;
  href: string;
}
export interface Project {
  slug: string; // used in /work/[slug]
  title: string;
  tagline: string; // one line, shown in the project list
  role: string;
  stack: readonly string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  hasCaseStudy: boolean;
}

export interface Experience {
  organization: string;
  role: string;
  start: string; // "2025-07"
  end: string | "present";
  summary: string;
  highlights: readonly string[];
}
