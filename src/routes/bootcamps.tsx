import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { CourseCard } from "@/components/site/CourseCard";
import { COURSES, LIFE_SKILLS, type AgeGroup, type Track } from "@/constants/courses";
import { cn } from "@/lib/utils";
import { Award } from "lucide-react";

export const Route = createFileRoute("/bootcamps")({
  head: () => ({
    meta: [
      { title: "Bootcamps — Sophor Code Academy" },
      {
        name: "description",
        content:
          "Explore Sophor's summer bootcamps: Scratch, Web, Python & AI, Mobile, Robotics, and Generative AI tracks for kids and youth in Ethiopia.",
      },
      { property: "og:title", content: "Bootcamps — Sophor Code Academy" },
      { property: "og:description", content: "Filterable list of all Sophor summer bootcamp tracks." },
    ],
  }),
  component: BootcampsPage,
});

const AGES: ("All" | AgeGroup)[] = ["All", "Kids", "Teens", "Youth"];
const TRACKS: ("All" | Track)[] = ["All", "Fundamentals", "Web", "AI", "Mobile", "Robotics"];

function BootcampsPage() {
  const [age, setAge] = useState<(typeof AGES)[number]>("All");
  const [track, setTrack] = useState<(typeof TRACKS)[number]>("All");

  const filtered = useMemo(
    () =>
      COURSES.filter(
        (c) => (age === "All" || c.ageGroup === age) && (track === "All" || c.track === track),
      ),
    [age, track],
  );

  return (
    <>
      <Section
        centered
        eyebrow="Summer 2026"
        title="Choose your bootcamp."
        subtitle="Filter by age group or topic. Every track ends in a Demo Day and a badge."
      >
        <Reveal>
          <div className="mb-10 space-y-3">
            <FilterRow label="Age" options={AGES} value={age} onChange={setAge} />
            <FilterRow label="Track" options={TRACKS} value={track} onChange={setTrack} />
          </div>
        </Reveal>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
            No bootcamps match those filters yet — try a different combo.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c, i) => (
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
        eyebrow="Common core"
        title="Life skills, taught alongside code."
        subtitle="Every Sophor bootcamp, regardless of track, includes our mandatory Life Skills module."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LIFE_SKILLS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 0.07}>
                <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--grey-20)] text-[var(--grey-1200)]">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-4 text-base font-medium text-[var(--grey-1200)]">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--grey-800)]">{s.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* SKILL BADGES */}
      <Section eyebrow="Gamified" title="Collect your Skill Badges.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.05}>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--grey-20)] text-[var(--grey-1200)]">
                  <Award size={20} />
                </div>
                <div>
                  <div className="text-[11px] tracking-wide text-[var(--grey-800)]">
                    {c.title}
                  </div>
                  <div className="text-base font-medium text-[var(--grey-1200)]">{c.badge}</div>
                </div>
              </div>
            </Reveal>
          ))}
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
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
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
            "rounded-full border px-4 py-1.5 text-[12px] font-medium transition",
            value === opt
              ? "border-[var(--grey-1200)] bg-[var(--grey-1200)] text-[var(--grey-10)]"
              : "border-[var(--border)] bg-[var(--grey-0)] text-[var(--grey-800)] hover:bg-[var(--grey-15)] hover:text-[var(--grey-1200)]",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
