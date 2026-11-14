"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap-setup";
import { duration, ease } from "@/animations/presets";

export function SkillsMotion({
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
        const rows = root.current?.querySelectorAll<HTMLElement>("[data-skill-row]");
        if (!rows) return;

        // One timeline per row: the line draws, the text rises out of its
        // mask while the line is still finishing, then the meta line fades in.
        rows.forEach((row) => {
          gsap
            .timeline({
              scrollTrigger: { trigger: row, start: "top 88%", once: true },
            })
            .from("[data-skill-rule]", {
              scaleX: 0,
              duration: duration.slow,
              ease: ease.inOut,
            }, 0)
            .from(row.querySelectorAll("[data-skill-text]"), {
              yPercent: 110,
              duration: duration.slow,
              ease: ease.expo,
            }, 0.15)
            .from(row.querySelectorAll("[data-skill-meta]"), {
              opacity: 0,
              duration: duration.base,
              ease: ease.out,
            }, 0.45);
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