import { siteConfig } from "@/data/site";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-svh max-w-5xl flex-col justify-center px-6">
      <p className="text-muted font-mono text-sm">
        {siteConfig.title} · {siteConfig.location}
      </p>
      <h1 className="font-display text-foreground mt-4 text-6xl md:text-8xl">{siteConfig.name}</h1>
      <p className="text-accent mt-6">Phase 2 check: fonts and tokens</p>
    </div>
  );
}
