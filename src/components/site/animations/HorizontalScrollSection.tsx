import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, initGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { cn } from "@/lib/utils";

export function HorizontalScrollSection({
  children,
  className,
  trackClassName,
}: {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    if (prefersReducedMotion()) {
      track.style.overflowX = "auto";
      return;
    }

    initGsap();

    const parentSection = wrap.closest("section");
    const triggerElement = parentSection || wrap;

    const ctx = gsap.context(() => {
      const getScroll = () => Math.max(0, track.scrollWidth - wrap.offsetWidth);

      gsap.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: triggerElement,
          pin: triggerElement,
          scrub: 1,
          start: () => "top " + (document.querySelector("header")?.offsetHeight || 52),
          end: () => `+=${getScroll() + window.innerHeight * 0.25}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, triggerElement);

    const onResize = () => {
      import("@/lib/gsap").then(({ ScrollTrigger: ST }) => {
        gsap.delayedCall(0.15, () => ST.refresh());
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={wrapRef} className={cn("horizontal-scroll-wrap overflow-hidden", className)}>
      <div
        ref={trackRef}
        className={cn(
          "horizontal-scroll-track flex w-max gap-4 will-change-transform",
          trackClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
