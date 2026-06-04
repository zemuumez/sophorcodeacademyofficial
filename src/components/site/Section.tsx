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
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  centered?: boolean;
  tone?: "default" | "muted" | "brand";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-28",
        tone === "muted" && "bg-[var(--surface)]",
        tone === "brand" && "brand-wash",
        className,
      )}
    >
      <Container>
        {(eyebrow || title || subtitle) && (
          <Reveal>
            <div className={cn("mb-14 max-w-3xl", centered && "mx-auto text-center")}>
              {eyebrow && (
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--brand)]/20 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--brand)] backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
                  {eyebrow}
                </div>
              )}
              {title && (
                <h2 className="mt-5 text-[36px] sm:text-[52px] font-bold leading-[1.05] tracking-tight uppercase">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="mt-5 text-[17px] leading-relaxed text-muted-foreground">
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
