import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { Reveal, RevealStagger } from "@/components/site/Reveal";
import { CourseCard } from "@/components/site/CourseCard";
import { COURSES, VALUES } from "@/constants/courses";
import { heroImage, studentAvatars } from "@/assets/images";
import heroImage2 from "../assets/images/photo_2026-06-05 01.54.02.jpeg";

import { GALLERY, TESTIMONIALS } from "@/constants/gallery";
import { SITE } from "@/constants/site";
import { TypewriterHeadline } from "@/components/site/animations/TypewriterHeadline";
import { HeroParallaxSection } from "@/components/site/animations/HeroParallax";
import { HorizontalScrollSection } from "@/components/site/animations/HorizontalScrollSection";
import { PinnedSplitSection } from "@/components/site/animations/PinnedSplitSection";
import { gsap, initGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-prefs";

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
  const heroIntroRef = useRef<HTMLDivElement>(null);
  const featured = COURSES.slice(0, 3);

  useLayoutEffect(() => {
    const intro = heroIntroRef.current;
    if (!intro || prefersReducedMotion()) return;

    initGsap();
    const items = intro.querySelectorAll<HTMLElement>("[data-hero-intro]");
    const ctx = gsap.context(() => {
      gsap.from(items, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15,
      });
    }, intro);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <HeroParallaxSection className="hero-dark min-h-[min(92vh,900px)]">
        <Container className="relative flex min-h-[min(92vh,900px)] flex-col justify-center py-20 sm:py-28">
          <div
            ref={heroIntroRef}
            className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16"
          >
            <div>
              <div
                data-hero-intro
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-wide text-[var(--grey-50)]/80 backdrop-blur"
              >
                {/* <Sparkles size={12} className="text-[var(--grey-50)]" /> */}
                Summer 2026 enrollment is open
              </div>

              <TypewriterHeadline
                text="Shaping minds, building futures through smarter learning"
                className="mt-6 text-[var(--grey-10)]"
              />

              <p
                data-hero-intro
                className="mt-6 max-w-lg text-[17px] leading-relaxed text-[var(--grey-50)]/75"
              >
                Join a new-era education where innovation meets knowledge. Discover expert-led
                bootcamps, practical skills, and real-world projects to launch your goals.
              </p>

              <div data-hero-intro className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/bootcamps"
                  className="agy-btn bg-white text-[var(--grey-1200)] hover:bg-[var(--grey-50)]"
                >
                  Explore bootcamps <ArrowRight size={14} />
                </Link>
                <Link
                  to="/register"
                  className="agy-btn border border-white/20 bg-transparent text-[var(--grey-10)] hover:bg-white/10"
                >
                  Register now <ArrowUpRight size={14} />
                </Link>
              </div>

              <div
                data-hero-intro
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
              </div>
            </div>

            <div data-hero-media className="relative">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
                <img
                  src={heroImage2}
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
            </div>
          </div>
        </Container>
      </HeroParallaxSection>

      <Section>
        <RevealStagger className="grid gap-5 md:grid-cols-3" stagger={0.1}>
          {[
            {
              n: "1,000+",
              t: "Knowledge Paths",
              d: "From first lines of code to shipping AI-powered apps.",
            },
            {
              n: "Empowered",
              t: "Learning",
              d: "Live mentors, small cohorts, and real classroom energy.",
            },
            {
              n: "Thriving",
              t: "Community",
              d: "Alumni circles, hackathons, and lifelong builder friendships.",
            },
          ].map((c) => (
            <div
              key={c.t}
              data-reveal-item
              className="group rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-8 transition hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-20px_rgba(18,19,23,0.1)]"
            >
              <div className="text-[11px] font-medium tracking-wide text-[var(--grey-800)]">
                {c.n}
              </div>
              <div className="mt-2 text-2xl font-medium tracking-tight text-[var(--grey-1200)]">
                {c.t}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--grey-800)]">{c.d}</p>
            </div>
          ))}
        </RevealStagger>
      </Section>

      <Section tone="muted">
        <PinnedSplitSection
          aside={
            <Reveal>
              <h2 className="agy-heading-2 text-[var(--grey-1200)]">
                Shaping the future of learning with Sophor Code Academy
              </h2>
              <p className="mt-6 text-[17px] leading-relaxed text-[var(--grey-800)] md:max-w-md">
                At Sophor Code Academy, we combine innovation, technology, and personalized pathways
                to create a smarter learning experience — empowering learners to know more, grow
                faster, and build with greater impact.
              </p>
            </Reveal>
          }
        >
          {VALUES.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-6"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--grey-20)] text-[var(--grey-1200)]">
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 text-base font-medium text-[var(--grey-1200)]">{v.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--grey-800)]">{v.desc}</p>
              </div>
            );
          })}
        </PinnedSplitSection>
      </Section>

      <Section
        eyebrow="Popular Tracks"
        title="Pick your bootcamp."
        subtitle="From first-time coders to AI tinkerers — there's a squad for every age."
      >
        <RevealStagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {featured.map((c) => (
            <div key={c.id} data-reveal-item>
              <CourseCard course={c} />
            </div>
          ))}
        </RevealStagger>
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

      <Section tone="dark" eyebrow="Inside the academy" title="Where the magic happens.">
        <div className="-mx-[var(--page-margin)]">
          <HorizontalScrollSection
            className="min-h-[70vh]"
            trackClassName="px-[var(--page-margin)] pb-0"
          >
            {GALLERY.slice(0, 8).map((g) => (
              <figure
                key={g.id}
                className="w-[min(85vw,420px)] shrink-0 overflow-hidden rounded-2xl border border-white/10"
              >
                <img
                  src={g.src}
                  alt={g.title}
                  loading="lazy"
                  className="aspect-[] h-full w-full object-cover"
                />
                <figcaption className="border-t border-white/10 px-4 py-3 text-sm text-[var(--grey-50)]/80">
                  {g.title}
                </figcaption>
              </figure>
            ))}
          </HorizontalScrollSection>
        </div>
      </Section>

      <Section eyebrow="Voices" title="100k+ happy learner journeys.">
        <RevealStagger className="grid gap-6 md:grid-cols-3" stagger={0.1}>
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              data-reveal-item
              className="rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-7"
            >
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
          ))}
        </RevealStagger>
      </Section>

      <Section>
        <Reveal y={32}>
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
