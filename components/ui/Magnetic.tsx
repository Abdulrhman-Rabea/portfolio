"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap-setup";

/**
 * Pulls its child toward the pointer while the pointer is near it.
 * The outer span is a still hover zone, the inner span is the part that moves.
 */
export function Magnetic({
  children,
  strength = 0.35,
}: {
  children: React.ReactNode;
  strength?: number; // 0 = no pull, 1 = sticks to the pointer
}) {
  const zone = useRef<HTMLSpanElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const zoneEl = zone.current;
      const innerEl = inner.current;
      if (!zoneEl || !innerEl) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const xTo = gsap.quickTo(innerEl, "x", { duration: 1, ease: "elastic.out(1, 0.4)" });
          const yTo = gsap.quickTo(innerEl, "y", { duration: 1, ease: "elastic.out(1, 0.4)" });

          // Measure the still zone once on enter, not on every mouse move
          let rect = zoneEl.getBoundingClientRect();
          const onEnter = () => {
            rect = zoneEl.getBoundingClientRect();
          };
          const onMove = (e: MouseEvent) => {
            xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
            yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
          };
          const onLeave = () => {
            xTo(0);
            yTo(0);
          };

          zoneEl.addEventListener("mouseenter", onEnter);
          zoneEl.addEventListener("mousemove", onMove);
          zoneEl.addEventListener("mouseleave", onLeave);

          return () => {
            zoneEl.removeEventListener("mouseenter", onEnter);
            zoneEl.removeEventListener("mousemove", onMove);
            zoneEl.removeEventListener("mouseleave", onLeave);
          };
        },
      );

      return () => mm.revert();
    },
    { scope: zone },
  );

  return (
    // p-6 + -m-6: the hover zone is 24px bigger than the button, but the layout doesn't change
    <span ref={zone} className="-m-6 inline-block p-6">
      <span ref={inner} className="inline-block">
        {children}
      </span>
    </span>
  );
}