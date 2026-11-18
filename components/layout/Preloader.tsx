"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/animations/gsap-setup";
import { duration, ease } from "@/animations/presets";
import { siteConfig } from "@/data/site";

/**
 * Covers the page for a beat while the name splits and reveals, then wipes
 * away. Reduced-motion users never see it — the overlay is removed instantly.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const wordEl = word.current;
      if (!el || !wordEl) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        SplitText.create(wordEl, {
          type: "chars",
          mask: "chars",
          autoSplit: true,
          onSplit(self) {
            const tl = gsap.timeline();

            tl.set(el, { display: "flex" })
              .from(self.chars, {
                yPercent: 110,
                duration: duration.slow,
                ease: ease.expo,
                stagger: 0.04,
              })
              .to(self.chars, {
                yPercent: -110,
                duration: duration.base,
                ease: ease.expo,
                stagger: 0.03,
                delay: 0.3,
              })
              .to(
                el,
                {
                  yPercent: -100,
                  duration: duration.slow,
                  ease: ease.expo,
                  onComplete: () => {
                    el.style.display = "none";
                  },
                },
                "-=0.2",
              );

            return tl;
          },
        });
      });

      // No preference recorded: show everything immediately, skip the overlay
      mm.add("(prefers-reduced-motion: reduce)", () => {
        if (el) el.style.display = "none";
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="bg-background fixed inset-0 z-[100] hidden items-center justify-center"
    >
      <span ref={word} className="font-display text-h1 text-foreground block overflow-hidden">
        {siteConfig.name}
      </span>
    </div>
  );
}
