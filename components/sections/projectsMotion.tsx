"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap-setup";
import { duration, ease } from "@/animations/presets";

export function ProjectsMotion({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const frames = root.current?.querySelectorAll<HTMLElement>("[data-project-frame]");
        if (!frames) return;

        // One trigger per project, so each screenshot opens as it scrolls in.
        // Only clip-path and transform are animated: no layout work per frame.
        frames.forEach((frame) => {
          const media = frame.querySelector<HTMLElement>("[data-project-media]");

          const tl = gsap.timeline({
            scrollTrigger: { trigger: frame, start: "top 85%", once: true },
          });

          tl.from(frame, {
            clipPath: "inset(0% 0% 100% 0%)", // fully closed from the bottom
            duration: duration.hero,
            ease: ease.expo,
          });

          if (media) {
            // Starts at the same time (position 0) so the image settles as it opens
            tl.from(media, { scale: 1.15, duration: duration.hero, ease: ease.expo }, 0);
          }
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}