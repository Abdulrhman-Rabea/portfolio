"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { navLinks, siteConfig } from "@/data/site";
import { useRef } from "react"; 
import { gsap, useGSAP ,ScrollTrigger} from "@/animations/gsap-setup";
const linkClass =   "text-muted hover:text-foreground transition-colors aria-[current=location]:text-foreground aria-[current=location]:underline aria-[current=location]:decoration-accent aria-[current=location]:underline-offset-8";

export function Header() {
  const [open, setOpen] = useState(false);
const progress = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("");
  useGSAP(() => {
  navLinks.forEach(({ href }) => {
    const section = document.querySelector<HTMLElement>(href);
    if (!section) return;

    // A section is "active" while it covers the middle of the screen
    ScrollTrigger.create({
      trigger: section,
      start: "top 50%",
      end: "bottom 50%",
      onToggle: (self) => {
        if (self.isActive) setActive(href);
        else setActive((current) => (current === href ? "" : current));
      },
    });
  });
});
useGSAP(() => {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    // fromTo sets the start state itself, so the line only exists when motion is allowed
    gsap.fromTo(
      progress.current,
      { scaleX: 0, opacity: 1 },
      {
        scaleX: 1,
        ease: "none", // scrub must be linear, otherwise the line drifts from the scroll
        scrollTrigger: { start: 0, end: "max", scrub: true },
      },
    );
  });

  return () => mm.revert();
});
  useGSAP(() => {
  navLinks.forEach(({ href }) => {
    const section = document.querySelector<HTMLElement>(href);
    if (!section) return;

    // A section is "active" while it covers the middle of the screen
    ScrollTrigger.create({
      trigger: section,
      start: "top 50%",
      end: "bottom 50%",
      onToggle: (self) => {
        if (self.isActive) setActive(href);
        else setActive((current) => (current === href ? "" : current));
      },
    });
  });
});
  // Close the mobile menu with Escape (keyboard users expect this)
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="border-border bg-background/95 fixed inset-x-0 top-0 z-50 border-b">
      {/* First focusable element: lets keyboard users skip the navigation */}
      <a
        href="#top"
        className="bg-accent text-background sr-only px-4 py-2 focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
<div
  ref={progress}
  aria-hidden="true"
  className="bg-accent absolute inset-x-0 top-0 h-0.5 origin-left opacity-0"
/>
      <Container>

        <div className="flex h-16 items-center justify-between">
          <a href="#top" className="font-display text-foreground text-xl">
            {siteConfig.name}
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="text-label flex gap-8 font-mono uppercase">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}  aria-current={active === link.href ? "location" : undefined} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="text-label text-foreground font-mono uppercase md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </Container>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-border border-t md:hidden">
          <Container>
            <ul className="text-label divide-border divide-y font-mono uppercase">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}   aria-current={active === link.href ? "location" : undefined}
                    className={`${linkClass} block py-4`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      )}
    </header>
  );
}