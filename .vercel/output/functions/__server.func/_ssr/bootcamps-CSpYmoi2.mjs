import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useLoaderData } from "../_libs/tanstack__react-router.mjs";
import { d as Award, L as LucideIcons, e as CircleQuestionMark } from "../_libs/lucide-react.mjs";
import { S as Section } from "./Section-BigB185K.mjs";
import { R as Reveal } from "./Reveal-DEDWqFdN.mjs";
import { C as CourseCard } from "./CourseCard-DIRNvKPL.mjs";
import { u as useTranslation, c as cn } from "./router-JNb6id3g.mjs";
import "../_libs/seroval.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/gsap.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./server-pv48Vp7X.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
const AGES = ["All", "Kids", "Juniors", "Seniors", "Private"];
const TRACKS = ["All", "Bootcamp Package", "1-on-1 Mentorship"];
function BootcampsPage() {
  const {
    courses
  } = useLoaderData({
    from: "/bootcamps"
  });
  const {
    t,
    locale
  } = useTranslation();
  const [age, setAge] = reactExports.useState("All");
  const [track, setTrack] = reactExports.useState("All");
  const filtered = reactExports.useMemo(() => courses.courses.filter((c) => (age === "All" || c.ageGroup === age) && (track === "All" || c.track === track)), [courses, age, track]);
  const getIcon = (name) => {
    const Icon = LucideIcons[name] || CircleQuestionMark;
    return Icon;
  };
  const getAgeLabel = (val) => {
    return t(`filter_age_${val.toLowerCase()}`, val);
  };
  const getTrackLabel = (val) => {
    return t(`filter_track_${val.toLowerCase()}`, val);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { centered: true, eyebrow: t("bootcamps_eyebrow", "Summer 2026"), title: t("bootcamps_title", "Choose your bootcamp."), subtitle: t("bootcamps_subtitle", "Filter by age group or topic. Every track ends in a Demo Day and a badge."), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FilterRow, { label: t("bootcamps_filter_age", "Age"), options: AGES, value: age, onChange: setAge, getLabel: getAgeLabel }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FilterRow, { label: t("bootcamps_filter_track", "Track"), options: TRACKS, value: track, onChange: setTrack, getLabel: getTrackLabel })
      ] }) }),
      filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground", children: t("bootcamps_no_results", "No bootcamps match those filters yet — try a different combo.") }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: filtered.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 0.06, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CourseCard, { course: c }) }, c.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { tone: "muted", eyebrow: t("bootcamps_life_skills_eyebrow", "Common core"), title: t("bootcamps_life_skills_title", "Common core, taught alongside code."), subtitle: t("bootcamps_life_skills_subtitle", "Every Sophor bootcamp program includes our mandatory common core: Ge'ez heritage, life skills, and indigenous knowledge."), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: courses.life_skills.map((s, i) => {
      const Icon = getIcon(s.icon);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 0.07, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-6 transition hover:-translate-y-0.5 hover:shadow-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-[var(--grey-20)] text-[var(--grey-1200)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-base font-medium text-[var(--grey-1200)]", children: s.title[locale] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm leading-relaxed text-[var(--grey-800)]", children: s.desc[locale] })
      ] }) }, s.title.en);
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { eyebrow: t("bootcamps_badges_eyebrow", "Gamified"), title: t("bootcamps_badges_title", "Collect your Skill Badges."), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: courses.courses.map((c, i) => {
      const courseTitle = c.title[locale];
      const courseBadge = c.badge[locale];
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 0.05, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 rounded-2xl border border-border bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--grey-20)] text-[var(--grey-1200)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { size: 20 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] tracking-wide text-[var(--grey-800)]", children: courseTitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-medium text-[var(--grey-1200)]", children: courseBadge })
        ] })
      ] }) }, c.id);
    }) }) })
  ] });
}
function FilterRow({
  label,
  options,
  value,
  onChange,
  getLabel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-2 text-[11px] font-medium tracking-wide text-[var(--grey-800)]", children: label }),
    options.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onChange(opt), className: cn("rounded-full border px-4 py-1.5 text-[12px] font-medium transition cursor-pointer", value === opt ? "border-[var(--grey-1200)] bg-[var(--grey-1200)] text-[var(--grey-10)]" : "border-[var(--border)] bg-[var(--grey-0)] text-[var(--grey-800)] hover:bg-[var(--grey-15)] hover:text-[var(--grey-1200)]"), children: getLabel(opt) }, opt))
  ] });
}
export {
  BootcampsPage as component
};
