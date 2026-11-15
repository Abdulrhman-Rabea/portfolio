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
      const el = root.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1. Intro: name lines rise from behind their masks, then the rest fades up
        gsap
          .timeline()
          .fromTo(
            "[data-hero-line]",
            { yPercent: 110, opacity: 1 },
            { yPercent: 0, duration: duration.hero, ease: ease.expo, stagger: 0.12 },
          )
          .fromTo(
            "[data-hero-fade]",
            { opacity: 0, y: distance.sm },
            { opacity: 1, y: 0, duration: duration.base, ease: ease.out, stagger: stagger.list },
            "-=0.9",
          );

        // 2. Scroll-out: the whole hero drifts up and fades while you scroll past it
        gsap.to(el, {
          y: -distance.lg,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
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