import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import type { Course } from "@/constants/courses";

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-[var(--brand)]/15 bg-white p-7 transition-all hover:-translate-y-1 hover:border-[var(--brand)]/40 hover:shadow-[0_20px_60px_-15px_rgb(59,130,246,0.25)]">
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[var(--brand-soft)] opacity-0 transition group-hover:opacity-60" />

      <div className="relative flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider">
        <span className="rounded-full bg-[var(--brand)]/10 px-2.5 py-1 text-[var(--brand)]">
          {course.track}
        </span>
        <span className="text-muted-foreground">{course.ageRange}</span>
      </div>

      <h3 className="relative mt-4 text-[24px] font-bold leading-tight tracking-tight">
        {course.title}
      </h3>

      <div className="relative mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Clock size={13} /> {course.duration}
      </div>

      <ul className="relative mt-5 space-y-1.5 text-[14px] text-foreground/80">
        {course.outcomes.map((o) => (
          <li key={o} className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--brand)]" />
            {o}
          </li>
        ))}
      </ul>

      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {course.tools.map((t) => (
          <span
            key={t}
            className="rounded-full bg-[var(--surface)] px-2.5 py-1 text-[11px] text-foreground/70"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="relative mt-6 flex items-center justify-between border-t border-border pt-5">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
          Badge · <span className="text-foreground">{course.badge}</span>
        </div>
        <Link
          to="/register"
          className="inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--brand)] hover:gap-2 transition-all"
        >
          Enroll <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  );
}
