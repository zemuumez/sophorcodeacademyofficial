import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Search, Sparkles } from "lucide-react";
import { useRef } from "react";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { CourseCard } from "@/components/site/CourseCard";
import { COURSES, VALUES } from "@/constants/courses";
import { heroImage, studentAvatars } from "@/assets/images";
import { GALLERY, TESTIMONIALS } from "@/constants/gallery";
import { SITE } from "@/constants/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sophor Code Academy — Shaping Minds, Building Futures" },
      { name: "description", content: SITE.description },
      { property: "og:title", content: "Sophor Code Academy" },
      { property: "og:description", content: SITE.description },
    ],
  }),
  component: Home,
});

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const featured = COURSES.slice(0, 3);

  return (
    <>
      {/* HERO — Antigravity-style dark cinematic panel */}
      <section ref={heroRef} className="hero-dark min-h-[min(92vh,900px)]">
        <Container className="relative flex min-h-[min(92vh,900px)] flex-col justify-center py-20 sm:py-28">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-wide text-[var(--grey-50)]/80 backdrop-blur"
              >
                <Sparkles size={12} className="text-[var(--grey-50)]" />
                Summer 2026 enrollment is open
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7 }}
                className="agy-display mt-6 text-[var(--grey-10)]"
              >
                Shaping minds, building futures through smarter learning
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 max-w-lg text-[17px] leading-relaxed text-[var(--grey-50)]/75"
              >
                Join a new-era education where innovation meets knowledge. Discover expert-led
                bootcamps, practical skills, and real-world projects to launch your goals.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 flex w-full max-w-md items-center gap-2 rounded-full border border-white/12 bg-white/8 p-1.5 backdrop-blur"
              >
                <div className="flex flex-1 items-center gap-2 pl-3">
                  <Search size={15} className="text-[var(--grey-50)]/50" />
                  <input
                    placeholder="Enter your interest"
                    className="w-full bg-transparent py-2 text-sm text-[var(--grey-10)] outline-none placeholder:text-[var(--grey-50)]/40"
                  />
                </div>
                <Link to="/bootcamps" className="agy-btn agy-btn-primary shrink-0 bg-white text-[var(--grey-1200)] hover:bg-[var(--grey-50)]">
                  Search
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6 flex items-center gap-3 text-[12px] text-[var(--grey-50)]/70"
              >
                <div className="flex -space-x-2">
                  {studentAvatars.map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt=""
                      className="h-7 w-7 rounded-full border-2 border-[var(--grey-1200)] object-cover"
                    />
                  ))}
                </div>
                <span>
                  <span className="font-medium text-[var(--grey-10)]">300+ students</span> already
                  learning across Addis Ababa
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="relative"
            >
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
                <img
                  src={heroImage}
                  alt="Student coding at Sophor"
                  className="h-[380px] w-full object-cover sm:h-[480px]"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-white/10 bg-[var(--grey-1100)]/90 p-4 shadow-xl backdrop-blur sm:block">
                <div className="text-[10px] font-medium tracking-wide text-[var(--grey-50)]/60">
                  Next cohort
                </div>
                <div className="mt-1 text-lg font-medium text-[var(--grey-10)]">July 7, 2026</div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* PILLAR CARDS */}
      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { n: "1,000+", t: "Knowledge Paths", d: "From first lines of code to shipping AI-powered apps." },
            { n: "Empowered", t: "Learning", d: "Live mentors, small cohorts, and real classroom energy." },
            { n: "Thriving", t: "Community", d: "Alumni circles, hackathons, and lifelong builder friendships." },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 0.08}>
              <div className="group rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-8 transition hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-20px_rgba(18,19,23,0.1)]">
                <div className="text-[11px] font-medium tracking-wide text-[var(--grey-800)]">
                  {c.n}
                </div>
                <div className="mt-2 text-2xl font-medium tracking-tight text-[var(--grey-1200)]">
                  {c.t}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--grey-800)]">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SHAPING THE FUTURE */}
      <Section tone="muted">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <h2 className="agy-heading-2 text-[var(--grey-1200)]">
              Shaping the future of learning with Sophor Code Academy
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[17px] leading-relaxed text-[var(--grey-800)]">
              At Sophor Code Academy, we combine innovation, technology, and personalized pathways to
              create a smarter learning experience — empowering learners to know more, grow faster,
              and build with greater impact.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--grey-20)] text-[var(--grey-1200)]">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-4 text-base font-medium text-[var(--grey-1200)]">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--grey-800)]">{v.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* FEATURED BOOTCAMPS */}
      <Section
        eyebrow="Popular Tracks"
        title="Pick your bootcamp."
        subtitle="From first-time coders to AI tinkerers — there's a squad for every age."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08}>
              <CourseCard course={c} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-12 text-center">
            <Link
              to="/bootcamps"
              className="inline-flex items-center gap-1 text-[14px] font-medium text-[var(--grey-1200)] hover:gap-2 transition-all"
            >
              See all bootcamps <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* GALLERY TEASER */}
      <Section tone="dark" eyebrow="Inside the academy" title="Where the magic happens.">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {GALLERY.slice(0, 4).map((g, i) => (
            <Reveal key={g.id} delay={i * 0.06}>
              <div className="group aspect-square overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={g.src}
                  alt={g.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section eyebrow="Voices" title="100k+ happy learner journeys.">
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-7 transition hover:-translate-y-0.5 hover:shadow-xl">
                <blockquote className="text-[16px] leading-relaxed text-[var(--grey-1200)]">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--grey-20)] font-medium text-[var(--grey-1200)]">
                    {t.name.charAt(0)}
                  </div>
                  <div className="text-[13px]">
                    <div className="font-medium text-[var(--grey-1200)]">{t.name}</div>
                    <div className="text-[var(--grey-800)]">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <Reveal>
          <div className="hero-gradient relative overflow-hidden rounded-2xl p-12 text-center sm:p-20">
            <h2 className="agy-heading-2 text-[var(--grey-10)]">
              Summer is short.
              <br />
              Skills are forever.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[16px] text-[var(--grey-50)]/75">
              Limited seats per cohort. Reserve yours before the squad fills up.
            </p>
            <Link
              to="/register"
              className="agy-btn mt-9 inline-flex bg-white text-[var(--grey-1200)] hover:bg-[var(--grey-50)]"
            >
              Start enrollment <ArrowUpRight size={14} />
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
