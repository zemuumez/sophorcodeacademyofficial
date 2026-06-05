import { cn } from "@/lib/utils";
import { logo } from "@/assets/images";
import { SITE } from "@/constants/site";

export function SiteLogo({
  className,
  imageClassName,
  showName = false,
}: {
  className?: string;
  imageClassName?: string;
  showName?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <img
        src={logo}
        alt={SITE.name}
        className={cn("h-10 w-10 shrink-0 rounded-lg object-contain sm:h-11 sm:w-11", imageClassName)}
      />
      {showName && (
        <span className="text-[15px] font-medium tracking-tight">{SITE.name}</span>
      )}
    </span>
  );
}
