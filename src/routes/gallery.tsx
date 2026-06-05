import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { RevealStagger } from "@/components/site/Reveal";
import { MapPin } from "lucide-react";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { useTranslation } from "@/hooks/useTranslation";
import { getCmsData, getPhotos } from "@/lib/api/cms.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  loader: async () => {
    const data = await getCmsData();
    const photos = await getPhotos();
    return { ...data, photos };
  },
  head: ({ loaderData }) => {
    const site = loaderData?.site || { name: "Sophor Code Academy" };
    return {
      meta: [
        { title: `Gallery — ${site.name}` },
        {
          name: "description",
          content:
            "Graduation moments, coding classrooms, life-skill sessions, and real-world group projects from Sophor in Addis Ababa.",
        },
        { property: "og:title", content: `Gallery — ${site.name}` },
        { property: "og:description", content: "A look inside Sophor's bootcamps and graduations." },
      ],
    };
  },
  component: GalleryPage,
});

const FILTERS = [
  "All",
  "Graduation",
  "Classroom",
  "Life Skills",
  "Projects",
] as const;

// Helper to format filenames (e.g. "cohort_03_graduation.jpeg" -> "Cohort 03 Graduation")
function formatFilenameToTitle(url: string) {
  const filename = url.split("/").pop() || "";
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  let formatted = nameWithoutExt.replace(/[_\-]/g, " ");
  formatted = formatted.replace(/\s+/g, " ");
  return formatted
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Helper to check if a title is generic (e.g., camera default names or numbers)
function isGenericTitle(title: string) {
  const clean = title.toLowerCase().trim();
  if (/^\d+$/.test(clean)) return true;
  if (/^(img|dsc|screenshot|photo|image|avatar|untitled)\s*\d*$/i.test(clean)) return true;
  if (/^(img|dsc|screenshot|photo|image|avatar|untitled)[_\-\s]*\d+$/i.test(clean)) return true;
  return false;
}

const catFolderMap: Record<string, string> = {
  "Graduation": "graduation",
  "Classroom": "classroom",
  "Life Skills": "life_skills",
  "Projects": "projects",
};

function GalleryPage() {
  const { site, photos, gallery } = useLoaderData({ from: "/gallery" }) as any;
  const { t, locale } = useTranslation();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  
  const campusImage = "/content/photos/general/campus.jpeg";
  const photoTitles = gallery?.photo_titles || {};

  const items = useMemo(() => {
    const list: { id: string; category: string; src: string; title: string }[] = [];
    
    if (filter === "All") {
      Object.entries(catFolderMap).forEach(([displayName, folderName]) => {
        const filePaths = photos[folderName] || [];
        filePaths.forEach((src: string) => {
          const customTitle = photoTitles[src]?.[locale];
          const fallbackTitle = formatFilenameToTitle(src);
          const title = customTitle || fallbackTitle;
          list.push({
            id: src,
            category: displayName,
            src,
            title,
          });
        });
      });
      return list;
    } else {
      const folderName = catFolderMap[filter];
      const filePaths = photos[folderName] || [];
      return filePaths.map((src: string) => {
        const customTitle = photoTitles[src]?.[locale];
        const fallbackTitle = formatFilenameToTitle(src);
        const title = customTitle || fallbackTitle;
        return {
          id: src,
          category: filter,
          src,
          title,
        };
      });
    }
  }, [photos, filter, photoTitles, locale]);

  const getFilterLabel = (val: string) => {
    const keyMap: Record<string, string> = {
      "All": "all",
      "Graduation": "graduation",
      "Classroom": "classroom",
      "Life Skills": "life_skills",
      "Projects": "projects"
    };
    return t(`filter_cat_${keyMap[val]}`, val);
  };

  return (
    <>
      <Section
        centered
        eyebrow={t("gallery_eyebrow", "Gallery")}
        title={t("gallery_title", "Inside the academy.")}
        subtitle={t("gallery_subtitle", "Graduation ceremonies, classrooms in motion, life-skill workshops, and real-world group projects.")}
      >
        <Reveal>
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-[12px] font-semibold transition cursor-pointer",
                  filter === f
                    ? "border-[var(--grey-1200)] bg-[var(--grey-1200)] text-[var(--grey-10)]"
                    : "border-[var(--border)] bg-[var(--grey-0)] text-[var(--grey-800)] hover:bg-[var(--grey-15)] hover:text-[var(--grey-1200)]",
                )}
              >
                {getFilterLabel(f)}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4 [column-fill:_balance]">
          {items.map((g: any) => (
            <Reveal
              key={g.id}
              as="figure"
              y={24}
              blur={4}
              className="break-inside-avoid mb-4 group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] cursor-pointer shadow-sm hover:shadow-xl hover:border-[var(--grey-300)] transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01]"
            >
              <img
                src={g.src}
                alt={g.title}
                loading="lazy"
                className="w-full h-auto object-cover transition duration-700 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="muted" eyebrow={t("gallery_campus_eyebrow", "Campus")} title={t("gallery_campus_title", "Find us in Addis.")}>
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--grey-0)] px-3 py-1 text-[12px] font-medium text-[var(--grey-1200)]">
                <MapPin size={14} /> {site.location[locale]}
              </div>
              <h3 className="mt-4 text-3xl font-medium tracking-tight text-[var(--grey-1200)]">
                {t("gallery_campus_subtitle_1", "A space built for builders.")}
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-[var(--grey-800)]">
                {t("gallery_campus_subtitle_2", "Bright classrooms, fast Wi-Fi, makers' lab, quiet study corners, and a mini auditorium for Demo Day. Snacks on us.")}
              </p>
              <ul className="mt-6 space-y-2 text-sm text-[var(--grey-800)] border-t border-border/40 pt-4">
                <li><strong className="text-[var(--grey-1200)]">{t("gallery_visit_us", "Visit us")}:</strong> {site.address[locale]}</li>
                <li><strong className="text-[var(--grey-1200)]">{t("gallery_hours", "Hours")}:</strong> {site.hours[locale]}</li>
                <li><strong className="text-[var(--grey-1200)]">{t("gallery_call", "Call")}:</strong> {site.phone}</li>
                <li><strong className="text-[var(--grey-1200)]">{t("gallery_email", "Email")}:</strong> {site.email}</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="aspect-video overflow-hidden rounded-2xl border border-[var(--border)] shadow-xl">
              <img
                src={campusImage}
                alt="Sophor campus"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
