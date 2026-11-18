"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/animations/gsap-setup";
import { duration, ease, stagger } from "@/animations/presets";

export function ContactMotion({
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
        const statement = root.current?.querySelector<HTMLElement>("[data-contact-statement]");
        if (!statement) return;

        SplitText.create(statement, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            // Same mask idea as the hero, but each line also tilts as it rises
            return gsap.from(self.lines, {
              yPercent: 110,
              rotate: 6,
              transformOrigin: "0% 100%", // pivots from the bottom-left corner
              duration: duration.slow,
              ease: ease.expo,
              stagger: stagger.text,
              scrollTrigger: { trigger: statement, start: "top 85%", once: true },
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