"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap-setup";
import { distance, duration, ease, stagger } from "@/animations/presets";

export function HeroMotion({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // matchMedia runs the animation only when the condition is true
      // and undoes it automatically if the condition changes
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline();

        // 1. Name lines rise up from behind their masks
        tl.fromTo(
          "[data-hero-line]",
          { yPercent: 110, opacity: 1 },
          { yPercent: 0, duration: duration.hero, ease: ease.expo, stagger: 0.12 },
        )
          // 2. Everything else fades up, overlapping the end of step 1
          .fromTo(
            "[data-hero-fade]",
            { opacity: 0, y: distance.sm },
            { opacity: 1, y: 0, duration: duration.base, ease: ease.out, stagger: stagger.list },
            "-=0.9",
          );
      });

      // Explicit cleanup (the hook's context also reverts, so this is just safe)
      return () => mm.revert();
    },
    { scope: root }, // selectors above only match inside this element
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}