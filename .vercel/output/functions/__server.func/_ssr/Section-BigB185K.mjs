import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as Container, c as cn } from "./router-JNb6id3g.mjs";
import { R as Reveal } from "./Reveal-DEDWqFdN.mjs";
function Section({
  children,
  className,
  id,
  eyebrow,
  title,
  subtitle,
  centered = false,
  tone = "default"
}) {
  const isDark = tone === "dark" || tone === "brand";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      id,
      className: cn(
        "py-20 sm:py-28",
        tone === "muted" && "bg-[var(--grey-20)]",
        tone === "brand" && "bg-[var(--grey-10)]",
        tone === "dark" && "section-dark",
        className
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Container, { children: [
        (eyebrow || title || subtitle) && /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("mb-14 max-w-3xl", centered && "mx-auto text-center"), children: [
          eyebrow && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "agy-eyebrow",
                isDark ? "text-[var(--grey-50)]/70" : "text-[var(--grey-800)]"
              ),
              children: eyebrow
            }
          ),
          title && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              className: cn(
                "agy-heading-2 mt-4",
                isDark ? "text-[var(--grey-10)]" : "text-[var(--grey-1200)]"
              ),
              children: title
            }
          ),
          subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: cn(
                "mt-5 text-[17px] leading-relaxed",
                isDark ? "text-[var(--grey-50)]/75" : "text-[var(--grey-800)]"
              ),
              children: subtitle
            }
          )
        ] }) }),
        children
      ] })
    }
  );
}
export {
  Section as S
};
