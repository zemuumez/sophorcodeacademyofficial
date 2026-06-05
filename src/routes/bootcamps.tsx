import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import * as LucideIcons from "lucide-react";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { CourseCard } from "@/components/site/CourseCard";
import { useTranslation } from "@/hooks/useTranslation";
import { getCmsData } from "@/lib/api/cms.functions";
import { cn } from "@/lib/utils";
import { Award } from "lucide-react";

export const Route = createFileRoute("/bootcamps")({
  loader: async () => {
    return await getCmsData();
  },
  head: ({ loaderData }) => {
    const site = loaderData?.site || { name: "Sophor Code Academy" };
    return {
      meta: [
        { title: `Bootcamps — ${site.name}` },
        {
          name: "description",
          content: "Explore Sophor's summer bootcamps: Scratch, Web, Python & AI, Mobile, Robotics, and Generative AI tracks for kids and youth.",
        },
        { property: "og:title", content: `Bootcamps — ${site.name}` },
        { property: "og:description", content: "Filterable list of all Sophor summer bootcamp tracks." },
      ],
    };
  },
  component: BootcampsPage,
});

const AGES = ["All", "Kids", "Teens", "Youth"] as const;
const TRACKS = ["All", "Fundamentals", "Web", "AI", "Mobile", "Robotics"] as const;

function BootcampsPage() {
  const { courses } = useLoaderData({ from: "/bootcamps" }) as any;
  const { t, locale } = useTranslation();
  const [age, setAge] = useState<(typeof AGES)[number]>("All");
  const [track, setTrack] = useState<(typeof TRACKS)[number]>("All");

  const filtered = useMemo(
    () =>
      courses.courses.filter(
        (c: any) => (age === "All" || c.ageGroup === age) && (track === "All" || c.track === track),
      ),
    [courses, age, track],
  );

  const getIcon = (name: string) => {
    const Icon = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
    return Icon;
  };

  const getAgeLabel = (val: string) => {
    return t(`filter_age_${val.toLowerCase()}`, val);
  };

  const getTrackLabel = (val: string) => {
    return t(`filter_track_${val.toLowerCase()}`, val);
  };

  return (
    <>
      <Section
        centered
        eyebrow={t("bootcamps_eyebrow", "Summer 2026")}
        title={t("bootcamps_title", "Choose your bootcamp.")}
        subtitle={t("bootcamps_subtitle", "Filter by age group or topic. Every track ends in a Demo Day and a badge.")}
      >
        <Reveal>
          <div className="mb-10 space-y-3">
            <FilterRow
              label={t("bootcamps_filter_age", "Age")}
              options={AGES}
              value={age}
              onChange={setAge}
              getLabel={getAgeLabel}
            />
            <FilterRow
              label={t("bootcamps_filter_track", "Track")}
              options={TRACKS}
              value={track}
              onChange={setTrack}
              getLabel={getTrackLabel}
            />
          </div>
        </Reveal>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
            {t("bootcamps_no_results", "No bootcamps match those filters yet — try a different combo.")}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c: any, i: number) => (
              <Reveal key={c.id} delay={i * 0.06}>
                <CourseCard course={c} />
              </Reveal>
            ))}
          </div>
        )}
      </Section>

      {/* LIFE SKILLS */}
      <Section
        tone="muted"
        eyebrow={t("bootcamps_life_skills_eyebrow", "Common core")}
        title={t("bootcamps_life_skills_title", "Life skills, taught alongside code.")}
        subtitle={t("bootcamps_life_skills_subtitle", "Every Sophor bootcamp, regardless of track, includes our mandatory Life Skills module.")}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {courses.life_skills.map((s: any, i: number) => {
            const Icon = getIcon(s.icon);
            return (
              <Reveal key={s.title.en} delay={i * 0.07}>
                <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--grey-20)] text-[var(--grey-1200)]">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-4 text-base font-medium text-[var(--grey-1200)]">{s.title[locale]}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--grey-800)]">{s.desc[locale]}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* SKILL BADGES */}
      <Section eyebrow={t("bootcamps_badges_eyebrow", "Gamified")} title={t("bootcamps_badges_title", "Collect your Skill Badges.")}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.courses.map((c: any, i: number) => {
            const courseTitle = c.title[locale];
            const courseBadge = c.badge[locale];
            return (
              <Reveal key={c.id} delay={i * 0.05}>
                <div className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--grey-20)] text-[var(--grey-1200)]">
                    <Award size={20} />
                  </div>
                  <div>
                    <div className="text-[11px] tracking-wide text-[var(--grey-800)]">
                      {courseTitle}
                    </div>
                    <div className="text-base font-medium text-[var(--grey-1200)]">{courseBadge}</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>
    </>
  );
}

function FilterRow<T extends string>({
  label,
  options,
  value,
  onChange,
  getLabel,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  getLabel: (v: T) => string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <span className="mr-2 text-[11px] font-medium tracking-wide text-[var(--grey-800)]">
        {label}
      </span>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-[12px] font-medium transition cursor-pointer",
            value === opt
              ? "border-[var(--grey-1200)] bg-[var(--grey-1200)] text-[var(--grey-10)]"
              : "border-[var(--border)] bg-[var(--grey-0)] text-[var(--grey-800)] hover:bg-[var(--grey-15)] hover:text-[var(--grey-1200)]",
          )}
        >
          {getLabel(opt)}
        </button>
      ))}
    </div>
  );
}

