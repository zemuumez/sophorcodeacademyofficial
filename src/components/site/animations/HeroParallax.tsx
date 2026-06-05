import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, initGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-prefs";

/** Scroll-scrubbed parallax for hero copy and media (Antigravity-style liftoff). */
export function HeroParallaxSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const inner = innerRef.current;
    if (!section || !inner) return;
    if (prefersReducedMotion()) return;

    initGsap();
    const media = inner.querySelector<HTMLElement>("[data-hero-media]");

    const ctx = gsap.context(() => {
      gsap.to(inner, {
        y: -90,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      if (media) {
        gsap.fromTo(
          media,
          { scale: 1, y: 0 },
          {
            scale: 1.06,
            y: -28,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={className}>
      <div ref={innerRef}>{children}</div>
    </section>
  );
}
