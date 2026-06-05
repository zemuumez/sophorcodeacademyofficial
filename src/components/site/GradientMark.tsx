import { cn } from "@/lib/utils";

/** Rainbow gradient mark inspired by Antigravity branding */
export function GradientMark({
  className,
  children = "S",
}: {
  className?: string;
  children?: string;
}) {
  return (
    <span
      className={cn(
        "grid h-8 w-8 place-items-center rounded-lg agy-gradient-mark text-[11px] font-semibold text-white shadow-sm",
        className,
      )}
      aria-hidden
    >
      {children}
    </span>
  );
}
