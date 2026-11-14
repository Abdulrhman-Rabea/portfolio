"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/animations/gsap-setup";

/**
 * Smooth scroll driven by GSAP's ticker, so Lenis and ScrollTrigger
 * always read the same scroll position on the same frame.
 */
export function SmoothScroll() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    // Skip smooth scroll entirely for users who ask for reduced motion
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({
        autoRaf: false, // GSAP's ticker drives it instead (below)
        anchors: true, // lets links like href="#work" scroll smoothly
      });

      // Tell ScrollTrigger every time Lenis moves the page
      lenis.on("scroll", ScrollTrigger.update);

      // Lenis wants milliseconds, GSAP's ticker gives seconds
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);

      // Without this, GSAP "catches up" after a lag spike and the scroll jumps
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });

    return () => mm.revert();
  }, []);

  return null; // renders nothing, it only sets things up
}