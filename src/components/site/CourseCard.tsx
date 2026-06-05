import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import type { Course } from "@/constants/courses";

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-7 transition-all hover:-translate-y-0.5 hover:border-[var(--grey-50)] hover:shadow-[0_24px_48px_-20px_rgba(18,19,23,0.12)]">
      <div className="relative flex items-center gap-2 text-[11px] font-medium tracking-wide text-[var(--grey-800)]">
        <span className="rounded-full bg-[var(--grey-20)] px-2.5 py-1 text-[var(--grey-1200)]">
          {course.track}
        </span>
        <span>{course.ageRange}</span>
      </div>

      <h3 className="relative mt-4 text-[22px] font-medium leading-tight tracking-tight text-[var(--grey-1200)]">
        {course.title}
      </h3>

      <div className="relative mt-2 flex items-center gap-1.5 text-sm text-[var(--grey-800)]">
        <Clock size={13} /> {course.duration}
      </div>

      <ul className="relative mt-5 space-y-1.5 text-[14px] text-[var(--grey-800)]">
        {course.outcomes.map((o) => (
          <li key={o} className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--grey-1200)]" />
            {o}
          </li>
        ))}
      </ul>

      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {course.tools.map((t) => (
          <span
            key={t}
            className="rounded-full bg-[var(--grey-20)] px-2.5 py-1 text-[11px] text-[var(--grey-800)]"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="relative mt-6 flex items-center justify-between border-t border-[var(--border)] pt-5">
        <div className="text-[11px] tracking-wide text-[var(--grey-800)]">
          Badge · <span className="font-medium text-[var(--grey-1200)]">{course.badge}</span>
        </div>
        <Link
          to="/register"
          className="inline-flex items-center gap-1 text-[13px] font-medium text-[var(--grey-1200)] hover:gap-2 transition-all"
        >
          Enroll <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  );
}
