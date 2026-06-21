import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useLoaderData } from "../_libs/tanstack__react-router.mjs";
import { S as Section } from "./Section-BigB185K.mjs";
import { R as Reveal } from "./Reveal-DEDWqFdN.mjs";
import { u as useTranslation, c as cn } from "./router-JNb6id3g.mjs";
import "../_libs/seroval.mjs";
import { a as MapPin } from "../_libs/lucide-react.mjs";
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
const FILTERS = ["All", "Graduation", "Classroom", "Life Skills", "Projects"];
function formatFilenameToTitle(url) {
  const filename = url.split("/").pop() || "";
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  let formatted = nameWithoutExt.replace(/[_\-]/g, " ");
  formatted = formatted.replace(/\s+/g, " ");
  return formatted.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
const catFolderMap = {
  "Graduation": "graduation",
  "Classroom": "classroom",
  "Life Skills": "life_skills",
  "Projects": "projects"
};
function GalleryPage() {
  const {
    site,
    photos,
    gallery
  } = useLoaderData({
    from: "/gallery"
  });
  const {
    t,
    locale
  } = useTranslation();
  const [filter, setFilter] = reactExports.useState("All");
  const campusImage = "/content/photos/general/campus.jpeg";
  const photoTitles = gallery?.photo_titles || {};
  const items = reactExports.useMemo(() => {
    const list = [];
    if (filter === "All") {
      Object.entries(catFolderMap).forEach(([displayName, folderName]) => {
        const filePaths = photos[folderName] || [];
        filePaths.forEach((src) => {
          const customTitle = photoTitles[src]?.[locale];
          const fallbackTitle = formatFilenameToTitle(src);
          const title = customTitle || fallbackTitle;
          list.push({
            id: src,
            category: displayName,
            src,
            title
          });
        });
      });
      return list;
    } else {
      const folderName = catFolderMap[filter];
      const filePaths = photos[folderName] || [];
      return filePaths.map((src) => {
        const customTitle = photoTitles[src]?.[locale];
        const fallbackTitle = formatFilenameToTitle(src);
        const title = customTitle || fallbackTitle;
        return {
          id: src,
          category: filter,
          src,
          title
        };
      });
    }
  }, [photos, filter, photoTitles, locale]);
  const getFilterLabel = (val) => {
    const keyMap = {
      "All": "all",
      "Graduation": "graduation",
      "Classroom": "classroom",
      "Life Skills": "life_skills",
      "Projects": "projects"
    };
    return t(`filter_cat_${keyMap[val]}`, val);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { centered: true, eyebrow: t("gallery_eyebrow", "Gallery"), title: t("gallery_title", "Inside the academy."), subtitle: t("gallery_subtitle", "Graduation ceremonies, classrooms in motion, life-skill workshops, and real-world group projects."), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10 flex flex-wrap justify-center gap-2", children: FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFilter(f), className: cn("rounded-full border px-4 py-1.5 text-[12px] font-semibold transition cursor-pointer", filter === f ? "border-[var(--grey-1200)] bg-[var(--grey-1200)] text-[var(--grey-10)]" : "border-[var(--border)] bg-[var(--grey-0)] text-[var(--grey-800)] hover:bg-[var(--grey-15)] hover:text-[var(--grey-1200)]"), children: getFilterLabel(f) }, f)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4 [column-fill:_balance]", children: items.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { as: "figure", y: 24, blur: 4, className: "break-inside-avoid mb-4 group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] cursor-pointer shadow-sm hover:shadow-xl hover:border-[var(--grey-300)] transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: g.src, alt: g.title, loading: "lazy", className: "w-full h-auto object-cover transition duration-700 group-hover:scale-[1.06]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" })
      ] }, g.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { tone: "muted", eyebrow: t("gallery_campus_eyebrow", "Campus"), title: t("gallery_campus_title", "Find us in Addis."), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-[var(--grey-0)] px-3 py-1 text-[12px] font-medium text-[var(--grey-1200)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14 }),
          " ",
          site.location[locale]
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-3xl font-medium tracking-tight text-[var(--grey-1200)]", children: t("gallery_campus_subtitle_1", "A space built for builders.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[16px] leading-relaxed text-[var(--grey-800)]", children: t("gallery_campus_subtitle_2", "Bright classrooms, fast Wi-Fi, makers' lab, quiet study corners, and a mini auditorium for Demo Day. Snacks on us.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-6 space-y-2 text-sm text-[var(--grey-800)] border-t border-border/40 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-[var(--grey-1200)]", children: [
              t("gallery_visit_us", "Visit us"),
              ":"
            ] }),
            " ",
            site.address[locale]
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-[var(--grey-1200)]", children: [
              t("gallery_hours", "Hours"),
              ":"
            ] }),
            " ",
            site.hours[locale]
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-[var(--grey-1200)]", children: [
              t("gallery_call", "Call"),
              ":"
            ] }),
            " ",
            site.phone
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-[var(--grey-1200)]", children: [
              t("gallery_email", "Email"),
              ":"
            ] }),
            " ",
            site.email
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video overflow-hidden rounded-2xl border border-[var(--border)] shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: campusImage, alt: "Sophor campus", loading: "lazy", className: "h-full w-full object-cover" }) }) })
    ] }) })
  ] });
}
export {
  GalleryPage as component
};
