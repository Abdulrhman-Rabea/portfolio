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
          .timeline({ delay: 1.8 }) // lets the preloader wipe clear first
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

        // 3. Blob: drifts continuously, and on fine-pointer devices leans toward the cursor
        const blob = el.querySelector<HTMLElement>("[data-hero-blob]");
        if (blob) {
          gsap.to(blob, {
            x: distance.lg,
            y: -distance.md,
            duration: 8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }
      });

      const blob = el.querySelector<HTMLElement>("[data-hero-blob]");
      const mmPointer = gsap.matchMedia();
      if (blob) {
        mmPointer.add(
          "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
          () => {
            const xTo = gsap.quickTo(blob, "x", { duration: 1.2, ease: ease.out });
            const yTo = gsap.quickTo(blob, "y", { duration: 1.2, ease: ease.out });

            const onMove = (e: MouseEvent) => {
              const rect = el.getBoundingClientRect();
              xTo(((e.clientX - rect.left) / rect.width - 0.5) * distance.lg);
              yTo(((e.clientY - rect.top) / rect.height - 0.5) * distance.lg);
            };

            el.addEventListener("mousemove", onMove);
            return () => el.removeEventListener("mousemove", onMove);
          },
        );
      }

      return () => {
        mm.revert();
        mmPointer.revert();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}