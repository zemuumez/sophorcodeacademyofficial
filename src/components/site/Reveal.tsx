import { useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, initGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { cn } from "@/lib/utils";

const EASE = "power3.out";

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
  y = 48,
  blur = 6,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "figure";
  y?: number;
  blur?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) return;

    initGsap();

    gsap.set(el, { opacity: 0, y, filter: `blur(${blur}px)` });

    const anim = gsap.to(el, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.9,
      delay,
      ease: EASE,
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [delay, y, blur]);

  const Component = Tag as ElementType;

  return (
    <Component ref={ref} className={cn(className)}>
      {children}
    </Component>
  );
}

/** Stagger-reveal children inside a container (grid rows, cards, etc.) */
export function RevealStagger({
  children,
  className,
  stagger = 0.1,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = root.querySelectorAll<HTMLElement>("[data-reveal-item]");
    if (items.length === 0) return;

    if (prefersReducedMotion()) return;

    initGsap();

    gsap.set(items, { opacity: 0, y: 36, filter: "blur(4px)" });

    const anim = gsap.to(items, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.75,
      stagger,
      ease: EASE,
      scrollTrigger: {
        trigger: root,
        start: "top 82%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
