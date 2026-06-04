import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { campusImage } from "@/assets/images";
import { GALLERY, type GalleryCategory } from "@/constants/gallery";
import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Sophor Code Academy" },
      {
        name: "description",
        content:
          "Graduation moments, coding classrooms, life-skill sessions, and real-world group projects from Sophor in Addis Ababa.",
      },
      { property: "og:title", content: "Gallery — Sophor Code Academy" },
      { property: "og:description", content: "A look inside Sophor's bootcamps and graduations." },
    ],
  }),
  component: GalleryPage,
});

const FILTERS: ("All" | GalleryCategory)[] = [
  "All",
  "Graduation",
  "Classroom",
  "Life Skills",
  "Projects",
];

function GalleryPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const items = useMemo(
    () => (filter === "All" ? GALLERY : GALLERY.filter((g) => g.category === filter)),
    [filter],
  );

  return (
    <>
      <Section
        centered
        eyebrow="Gallery"
        title="Inside the academy."
        subtitle="Graduation ceremonies, classrooms in motion, life-skill workshops, and real-world group projects."
      >
        <Reveal>
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-[12px] font-semibold transition",
                  filter === f
                    ? "border-[var(--brand)] bg-[var(--brand)] text-white shadow-sm"
                    : "border-border bg-white text-foreground/70 hover:border-[var(--brand)]/40 hover:text-foreground",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((g, i) => (
            <motion.figure
              key={g.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: (i % 8) * 0.05, duration: 0.5 }}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-white"
            >
              <img
                src={g.src}
                alt={g.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white opacity-0 transition group-hover:opacity-100">
                <div className="text-xs font-semibold">{g.title}</div>
                <div className="text-[10px] uppercase tracking-wider opacity-80">{g.category}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Section>

      <Section tone="brand" eyebrow="Campus" title="Find us in Addis.">
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-[12px] font-semibold text-[var(--brand)] backdrop-blur">
                <MapPin size={14} /> Bole, Addis Ababa
              </div>
              <h3 className="mt-4 font-display text-3xl font-bold tracking-tight">
                A space built for builders.
              </h3>
              <p className="mt-4 text-[16px] leading-relaxed text-foreground/70">
                Bright classrooms, fast Wi-Fi, makers' lab, quiet study corners, and a mini
                auditorium for Demo Day. Snacks on us.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-foreground/70">
                <li>{SITE.address}</li>
                <li>{SITE.hours}</li>
                <li>{SITE.phone}</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="aspect-video overflow-hidden rounded-3xl border border-white/60 shadow-xl">
              <img
                src={campusImage}
                alt="Sophor campus"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
