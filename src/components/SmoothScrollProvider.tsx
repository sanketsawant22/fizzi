"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
    });

    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // lenis.on(
    //   "scroll",
    //   ({ scroll, limit }: { scroll: number; limit: number }) => {
    //     const progress = scroll / limit;
    //     const bar = document.getElementById("scroll-progress-bar");
    //     if (bar) {
    //       bar.style.transform = `translateX(-50%) scaleX(${progress})`;
    //     }
    //   }
    // );

    lenis.on("scroll", (e: { scroll: number; limit: number }) => {
      const progress = (e.scroll / e.limit) * 100;
      const bar = document.getElementById("scroll-progress-bar");
      if (bar) bar.style.width = `${progress}%`;
    });
    

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (typeof value !== "undefined") {
          lenis.scrollTo(value);
        } else {
          return window.scrollY;
        }
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
