"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/animations/gsap-setup";
import { duration, ease, stagger } from "@/animations/presets";

export function AboutMotion({
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
        const statement = root.current?.querySelector<HTMLElement>("[data-about-statement]");
        if (!statement) return;

        // One deliberate moment: the statement rises line by line from behind
        // masks, the same language as the hero headline.
        SplitText.create(statement, {
          type: "lines",
          mask: "lines",
          // Re-splits when the width changes or fonts finish loading,
          // so line breaks stay correct on resize and after the font swaps in.
          autoSplit: true,
          onSplit(self) {
            // Returning the tween lets SplitText revert and rebuild it on re-split
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: duration.slow,
              ease: ease.expo,
              stagger: stagger.text,
              scrollTrigger: { trigger: statement, start: "top 80%", once: true },
            });
          },
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