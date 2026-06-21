import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useTranslation } from "./router-JNb6id3g.mjs";
import { c as Clock, j as ArrowRight } from "../_libs/lucide-react.mjs";
function CourseCard({ course }) {
  const { locale, t } = useTranslation();
  const title = typeof course.title === "string" ? course.title : course.title[locale];
  const ageRange = typeof course.ageRange === "string" ? course.ageRange : course.ageRange[locale];
  const duration = typeof course.duration === "string" ? course.duration : course.duration[locale];
  const outcomes = Array.isArray(course.outcomes) ? course.outcomes : course.outcomes[locale] || [];
  const badge = typeof course.badge === "string" ? course.badge : course.badge[locale];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-7 transition-all hover:-translate-y-0.5 hover:border-[var(--grey-50)] hover:shadow-[0_24px_48px_-20px_rgba(18,19,23,0.12)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-2 text-[11px] font-medium tracking-wide text-[var(--grey-800)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-[var(--grey-20)] px-2.5 py-1 text-[var(--grey-1200)]", children: t(`filter_track_${course.track.toLowerCase()}`, course.track) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ageRange })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "relative mt-4 text-[22px] font-medium leading-tight tracking-tight text-[var(--grey-1200)]", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-2 flex items-center gap-1.5 text-sm text-[var(--grey-800)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 13 }),
      " ",
      duration
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "relative mt-5 space-y-1.5 text-[14px] text-[var(--grey-800)]", children: outcomes.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--grey-1200)]" }),
      o
    ] }, o)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mt-5 flex flex-wrap gap-1.5", children: course.tools.map((t2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "rounded-full bg-[var(--grey-20)] px-2.5 py-1 text-[11px] text-[var(--grey-800)]",
        children: t2
      },
      t2
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-6 flex items-center justify-between border-t border-[var(--border)] pt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] tracking-wide text-[var(--grey-800)]", children: [
        t("nav_register", "Badge"),
        " · ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-[var(--grey-1200)]", children: badge })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/register",
          search: (prev) => prev,
          className: "inline-flex items-center gap-1 text-[13px] font-medium text-[var(--grey-1200)] hover:gap-2 transition-all",
          children: [
            t("nav_register", "Enroll"),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 13 })
          ]
        }
      )
    ] })
  ] });
}
export {
  CourseCard as C
};
