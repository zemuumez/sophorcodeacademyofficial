import { useTranslation } from "@/hooks/useTranslation";
import { useMemo } from "react";

export function TestimonialsCarousel({
  testimonials,
  personsPhotos = [],
}: {
  testimonials: any[];
  personsPhotos?: string[];
}) {
  const { locale } = useTranslation();

  const repeatedList = useMemo(() => {
    if (testimonials.length === 0) return [];
    const base = [...testimonials];
    // If the list is short, repeat it more times to ensure it overflows the screen width
    if (base.length <= 3) {
      return [...base, ...base, ...base, ...base];
    }
    return [...base, ...base];
  }, [testimonials]);

  const getPersonImage = (name: string) => {
    const normalizedName = name.toLowerCase().replace(/[^a-z0-9]/g, "_");
    const matched = personsPhotos.find((url: string) => {
      const filename = url.split("/").pop() || "";
      const nameWithoutExt = filename.replace(/\.[^/.]+$/, "").toLowerCase().replace(/[^a-z0-9]/g, "_");
      return nameWithoutExt === normalizedName;
    });
    return matched || "/content/photos/persons/placeholder.png";
  };

  if (testimonials.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden py-4 select-none">
      {/* Side gradients to create smooth fade-in/fade-out layout */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--grey-10)] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--grey-10)] to-transparent z-10 pointer-events-none" />

      {/* Scrolling container */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] cursor-pointer">
        {/* First scroll block */}
        <div className="flex gap-6 pr-6 shrink-0">
          {repeatedList.map((t: any, index: number) => {
            const imgSrc = getPersonImage(t.name);
            return (
              <figure
                key={`${t.name}-${index}`}
                className="w-[320px] sm:w-[380px] flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-6 transition-all duration-300 hover:border-[var(--grey-300)] hover:shadow-lg"
              >
                <blockquote className="text-[14.5px] leading-relaxed text-[var(--grey-1200)] flex-1">
                  "{t.quote[locale] || t.quote.en}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-[var(--border)] pt-4">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--grey-15)]">
                    <img
                      src={imgSrc}
                      alt={t.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-[13px] min-w-0">
                    <div className="font-semibold text-[var(--grey-1200)] truncate">{t.name}</div>
                    <div className="text-[11px] text-[var(--grey-800)] truncate">
                      {t.role[locale] || t.role.en}
                    </div>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {/* Second identical duplicate scroll block for seamless looping */}
        <div className="flex gap-6 pr-6 shrink-0" aria-hidden="true">
          {repeatedList.map((t: any, index: number) => {
            const imgSrc = getPersonImage(t.name);
            return (
              <figure
                key={`${t.name}-dup-${index}`}
                className="w-[320px] sm:w-[380px] flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-6 transition-all duration-300 hover:border-[var(--grey-300)] hover:shadow-lg"
              >
                <blockquote className="text-[14.5px] leading-relaxed text-[var(--grey-1200)] flex-1">
                  "{t.quote[locale] || t.quote.en}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-[var(--border)] pt-4">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--grey-15)]">
                    <img
                      src={imgSrc}
                      alt={t.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-[13px] min-w-0">
                    <div className="font-semibold text-[var(--grey-1200)] truncate">{t.name}</div>
                    <div className="text-[11px] text-[var(--grey-800)] truncate">
                      {t.role[locale] || t.role.en}
                    </div>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </div>
  );
}
