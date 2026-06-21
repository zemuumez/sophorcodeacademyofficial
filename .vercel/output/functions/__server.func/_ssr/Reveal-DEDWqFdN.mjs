import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { i as initGsap, c as cn } from "./router-JNb6id3g.mjs";
import { g as gsapWithCSS } from "../_libs/gsap.mjs";
function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
const EASE = "power3.out";
function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
  y = 48,
  blur = 6
}) {
  const ref = reactExports.useRef(null);
  reactExports.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    initGsap();
    gsapWithCSS.set(el, { opacity: 0, y, filter: `blur(${blur}px)` });
    const anim = gsapWithCSS.to(el, {
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
        once: true
      }
    });
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [delay, y, blur]);
  const Component = Tag;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Component, { ref, className: cn(className), children });
}
function RevealStagger({
  children,
  className,
  stagger = 0.1
}) {
  const ref = reactExports.useRef(null);
  reactExports.useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = root.querySelectorAll("[data-reveal-item]");
    if (items.length === 0) return;
    if (prefersReducedMotion()) return;
    initGsap();
    gsapWithCSS.set(items, { opacity: 0, y: 36, filter: "blur(4px)" });
    const anim = gsapWithCSS.to(items, {
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
        once: true
      }
    });
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [stagger]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className, children });
}
export {
  Reveal as R,
  RevealStagger as a,
  prefersReducedMotion as p
};
