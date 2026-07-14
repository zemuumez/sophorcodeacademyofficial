import { useTranslation } from "@/hooks/useTranslation";
import { useMemo, useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function TestimonialsCarousel({
  testimonials,
  personsPhotos = [],
}: {
  testimonials: any[];
  personsPhotos?: string[];
}) {
  const { locale } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Duplicate the list so we have an identical second half for continuous looping
  const repeatedList = useMemo(() => {
    if (testimonials.length === 0) return [];
    const base = [...testimonials];
    return [...base, ...base];
  }, [testimonials]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId: number;
    // Speed factor: 0.35px per frame provides a very slow, elegant, and readable auto-scroll
    const speed = 0.35;

    const animate = () => {
      if (!isPaused) {
        container.scrollLeft += speed;
        // If it goes past half the scrollWidth, loop back to 0 seamlessly
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => {
    // If a button click timeout is active, do not resume auto-scroll yet
    if (pauseTimeoutRef.current) return;
    setIsPaused(false);
  };

  const tempPause = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    // Pause auto-scroll for 7 seconds after a manual control click
    pauseTimeoutRef.current = setTimeout(() => {
      pauseTimeoutRef.current = null;
      setIsPaused(false);
    }, 7000);
  };

  const handleNext = () => {
    const container = scrollRef.current;
    if (!container) return;
    tempPause();

    const card = container.querySelector("figure");
    const cardWidth = card ? card.clientWidth : 380;
    const gap = 24;
    const scrollAmount = cardWidth + gap;

    // Check loop boundaries: if we are close to the middle reset boundary, wrap back to 0 first
    if (container.scrollLeft >= container.scrollWidth / 2 - 10) {
      container.scrollLeft = 0;
    }
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handlePrev = () => {
    const container = scrollRef.current;
    if (!container) return;
    tempPause();

    const card = container.querySelector("figure");
    const cardWidth = card ? card.clientWidth : 380;
    const gap = 24;
    const scrollAmount = cardWidth + gap;

    // Check loop boundaries: if we are near the beginning, wrap to the middle first
    if (container.scrollLeft <= 10) {
      container.scrollLeft = container.scrollWidth / 2;
    }
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

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
    <div className="relative w-full py-4 select-none group">
      {/* Side gradients to create smooth fade-in/fade-out layout */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--grey-10)] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--grey-10)] to-transparent z-10 pointer-events-none" />

      {/* Modern navigation buttons - floating on left/right side */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--grey-0)]/90 backdrop-blur-sm text-[var(--grey-1200)] shadow-md transition-all duration-300 hover:bg-[var(--grey-15)] hover:border-[var(--grey-300)] hover:scale-105 active:scale-95 cursor-pointer opacity-0 group-hover:opacity-100"
        aria-label="Previous Testimonial"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--grey-0)]/90 backdrop-blur-sm text-[var(--grey-1200)] shadow-md transition-all duration-300 hover:bg-[var(--grey-15)] hover:border-[var(--grey-300)] hover:scale-105 active:scale-95 cursor-pointer opacity-0 group-hover:opacity-100"
        aria-label="Next Testimonial"
      >
        <ChevronRight size={20} />
      </button>

      {/* Scrolling container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-none w-full py-2 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* First scroll block */}
        <div className="flex gap-6 pr-6 shrink-0">
          {repeatedList.map((t: any, index: number) => {
            const imgSrc = getPersonImage(t.name);
            return (
              <figure
                key={`${t.name}-${index}`}
                className="w-[320px] sm:w-[380px] flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-6 transition-all duration-300 hover:border-[var(--grey-300)] hover:shadow-lg snap-start"
              >
                <blockquote className="text-[14px] leading-relaxed text-[var(--grey-1200)] flex-1 italic">
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
