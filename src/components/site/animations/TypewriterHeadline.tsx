import { useEffect, useRef } from "react";
import { initGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-prefs";
import { cn } from "@/lib/utils";

export function TypewriterHeadline({
  text,
  className,
  speed = 0.035,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const rootRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const span = textRef.current;
    if (!root || !span) return;

    if (prefersReducedMotion()) {
      span.textContent = text;
      return;
    }

    initGsap();
    span.textContent = "";
    const chars = [...text];
    let index = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (index >= chars.length) return;
      span.textContent += chars[index];
      index += 1;
      timer = setTimeout(tick, speed * 1000);
    };

    timer = setTimeout(tick, 400);

    return () => clearTimeout(timer);
  }, [text, speed]);

  return (
    <h1 ref={rootRef} className={cn("agy-display", className)}>
      <span ref={textRef} />
      <span className="typewriter-cursor" aria-hidden>
        |
      </span>
    </h1>
  );
}
