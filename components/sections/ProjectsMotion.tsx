"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/animations/gsap-setup";
import { duration, ease } from "@/animations/presets";

export function ProjectsMotion({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      // 1. Reveal: each screenshot opens with a clip-path wipe as it scrolls in
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        el.querySelectorAll<HTMLElement>("[data-project-frame]").forEach((frame) => {
          const media = frame.querySelector<HTMLElement>("[data-project-media]");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: frame, start: "top 85%", once: true },
          });

          tl.from(frame, {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: duration.hero,
            ease: ease.expo,
          });
          if (media) {
            tl.from(media, { scale: 1.15, duration: duration.hero, ease: ease.expo }, 0);
          }
        });
      });

      // 2. Parallax: the image slides inside its frame while you scroll (wide screens only)
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        el.querySelectorAll<HTMLElement>("[data-project-frame]").forEach((frame) => {
          const layer = frame.querySelector("[data-project-parallax]");
          if (!layer) return;

          gsap.fromTo(
            layer,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });

      // 3. Card stack: each project pins briefly while the next one slides over it
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-project-card]"));

        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;

          ScrollTrigger.create({
            trigger: card,
            start: "top top+=64", // clears the fixed header
            endTrigger: next,
            end: "top top+=64",
            pin: true,
            pinSpacing: false,
          });

          gsap.to(card, {
            scale: 0.94,
            opacity: 0.4,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top top+=64",
              endTrigger: next,
              end: "top top+=64",
              scrub: true,
            },
          });
        });
      });

      // 4. Tilt: the screenshot leans toward the pointer in 3D (mouse devices only)
      mm.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          el.querySelectorAll<HTMLElement>("[data-project-tilt]").forEach((tilt) => {
            const rotateX = gsap.quickTo(tilt, "rotateX", { duration: 0.6, ease: ease.out });
            const rotateY = gsap.quickTo(tilt, "rotateY", { duration: 0.6, ease: ease.out });

            const onMove = (e: MouseEvent) => {
              const rect = tilt.getBoundingClientRect();
              const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
              const py = (e.clientY - rect.top) / rect.height - 0.5;
              rotateY(px * 14);
              rotateX(py * -14);
            };
            const onLeave = () => {
              rotateX(0);
              rotateY(0);
            };

            tilt.addEventListener("mousemove", onMove);
            tilt.addEventListener("mouseleave", onLeave);

            return () => {
              tilt.removeEventListener("mousemove", onMove);
              tilt.removeEventListener("mouseleave", onLeave);
            };
          });
        },
      );

      // 5. Cursor label: follows the mouse over a screenshot (mouse devices only)
      mm.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const label = cursor.current;
          if (!label) return;

          gsap.set(label, { xPercent: -50, yPercent: -50 }); // center it on the pointer

          // quickTo reuses ONE tween for every mouse move instead of creating a new one
          const xTo = gsap.quickTo(label, "x", { duration: duration.base, ease: ease.out });
          const yTo = gsap.quickTo(label, "y", { duration: duration.base, ease: ease.out });
          const fade = gsap.quickTo(label, "opacity", { duration: duration.fast, ease: ease.out });

          const onEnter = (e: MouseEvent) => {
            gsap.set(label, { x: e.clientX, y: e.clientY }); // appear at the pointer, don't fly in
            fade(1);
          };
          const onMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
          };
          const onLeave = () => fade(0);

          const links = el.querySelectorAll<HTMLElement>("[data-project-link]");
          links.forEach((link) => {
            link.addEventListener("mouseenter", onEnter);
            link.addEventListener("mousemove", onMove);
            link.addEventListener("mouseleave", onLeave);
          });

          return () => {
            links.forEach((link) => {
              link.removeEventListener("mouseenter", onEnter);
              link.removeEventListener("mousemove", onMove);
              link.removeEventListener("mouseleave", onLeave);
            });
          };
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
      <span
        ref={cursor}
        aria-hidden="true"
        className="bg-accent text-background text-label pointer-events-none fixed top-0 left-0 z-40 rounded-full px-5 py-3 font-mono uppercase opacity-0"
      >
        Visit ↗
      </span>
    </div>
  );
}