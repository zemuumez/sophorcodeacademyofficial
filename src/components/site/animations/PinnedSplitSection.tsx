import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, initGsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { cn } from "@/lib/utils";

export function PinnedSplitSection({
  aside,
  children,
  className,
}: {
  aside: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const list = listRef.current;
    if (!section || !pin || !list) return;

    if (prefersReducedMotion()) return;

    initGsap();

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          start: () => "top " + ((document.querySelector("header")?.offsetHeight || 52) + 32),
          end: () => `+=${Math.max(list.offsetHeight - pin.offsetHeight, 200)}`,
          pin: pin,
          pinSpacing: true,
          anticipatePin: 1,
        });

        gsap.from(list.children, {
          opacity: 0,
          y: 40,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: list,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className={cn("pinned-split", className)}>
      <div className="grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-14">
        <div ref={pinRef} className="md:self-start">
          {aside}
        </div>
        <div ref={listRef} className="space-y-4">
          {children}
        </div>
      </div>
    </section>
  );
}
