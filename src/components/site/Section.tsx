import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function Section({
  children,
  className,
  id,
  eyebrow,
  title,
  subtitle,
  centered = false,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  centered?: boolean;
  tone?: "default" | "muted" | "brand" | "dark";
}) {
  const isDark = tone === "dark" || tone === "brand";

  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-28",
        tone === "muted" && "bg-[var(--grey-20)]",
        tone === "brand" && "bg-[var(--grey-10)]",
        tone === "dark" && "section-dark",
        className,
      )}
    >
      <Container>
        {(eyebrow || title || subtitle) && (
          <Reveal>
            <div className={cn("mb-14 max-w-3xl", centered && "mx-auto text-center")}>
              {eyebrow && (
                <div
                  className={cn(
                    "agy-eyebrow",
                    isDark ? "text-[var(--grey-50)]/70" : "text-[var(--grey-800)]",
                  )}
                >
                  {eyebrow}
                </div>
              )}
              {title && (
                <h2
                  className={cn(
                    "agy-heading-2 mt-4",
                    isDark ? "text-[var(--grey-10)]" : "text-[var(--grey-1200)]",
                  )}
                >
                  {title}
                </h2>
              )}
              {subtitle && (
                <p
                  className={cn(
                    "mt-5 text-[17px] leading-relaxed",
                    isDark ? "text-[var(--grey-50)]/75" : "text-[var(--grey-800)]",
                  )}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  );
}
