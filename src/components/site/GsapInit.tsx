import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { initGsap, ScrollTrigger } from "@/lib/gsap";

/** Registers GSAP plugins and refreshes ScrollTrigger on route changes. */
export function GsapInit() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    initGsap();
    const t = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    initGsap();
    const t = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(t);
  }, [pathname]);

  return null;
}
