"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/animations/gsap-setup";

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

        SplitText.create(statement, {
          type: "words",
          autoSplit: true, // re-splits on resize and after the font loads
          onSplit(self) {
            // Each word goes from dim to full brightness as you scroll through the sentence
            return gsap.fromTo(
              self.words,
              { opacity: 0.2 },
              {
                opacity: 1,
                ease: "none",
                stagger: 0.1,
                scrollTrigger: {
                  trigger: statement,
                  start: "top 80%",
                  end: "bottom 45%",
                  scrub: true,
                },
              },
            );
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