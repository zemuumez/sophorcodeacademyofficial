import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLayoutEffect, useRef, useMemo } from "react";
import * as LucideIcons from "lucide-react";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { Reveal, RevealStagger } from "@/components/site/Reveal";
import { CourseCard } from "@/components/site/CourseCard";
import { useTranslation } from "@/hooks/useTranslation";
import { getCmsData, getPhotos } from "@/lib/api/cms.functions";

import { TypewriterHeadline } from "@/components/site/animations/TypewriterHeadline";
import { HeroParallaxSection } from "@/components/site/animations/HeroParallax";
import { HorizontalScrollSection } from "@/components/site/animations/HorizontalScrollSection";
import { PinnedSplitSection } from "@/components/site/animations/PinnedSplitSection";
import { gsap, initGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion-prefs";

export const Route = createFileRoute("/")({
  loader: async () => {
    const data = await getCmsData();
    const photos = await getPhotos();
    return { ...data, photos };
  },
  head: ({ loaderData }) => {
    const site = loaderData?.site || { name: "Sophor Code Academy", description: { en: "" } };
    return {
      meta: [
        { title: `${site.name} — Shaping Minds, Building Futures` },
        { name: "description", content: site.description.en },
        { property: "og:title", content: site.name },
        { property: "og:description", content: site.description.en },
      ],
    };
  },
  component: Home,
});

// Helper to format filenames (e.g. "cohort_03_graduation.jpeg" -> "Cohort 03 Graduation")
function formatFilenameToTitle(url: string) {
  const filename = url.split("/").pop() || "";
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  let formatted = nameWithoutExt.replace(/[_\-]/g, " ");
  formatted = formatted.replace(/\s+/g, " ");
  return formatted
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function Home() {
  const { site, courses, gallery, photos } = useLoaderData({ from: "/" }) as any;
  const { t, locale } = useTranslation();
  const heroIntroRef = useRef<HTMLDivElement>(null);
  
  const featured = courses.courses.slice(0, 3);
  const studentAvatars = [
    "/content/photos/avatars/avatar_1.jpeg",
    "/content/photos/avatars/avatar_2.jpeg",
    "/content/photos/avatars/avatar_3.jpeg",
  ];
  const heroImage = "/content/photos/hero/hero.jpeg";

  const homepagePhotos = useMemo(() => {
    const list: { id: string; src: string; title: string }[] = [];
    ["graduation", "classroom", "life_skills", "projects"].forEach((folder) => {
      const filePaths = photos[folder] || [];
      filePaths.forEach((src: string) => {
        list.push({
          id: src,
          src,
          title: formatFilenameToTitle(src),
        });
      });
    });
    return list.slice(0, 8);
  }, [photos]);

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

  const getIcon = (name: string) => {
    const Icon = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
    return Icon;
  };

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
                {t("hero_enrollment", "Summer 2026 enrollment is open")}
              </div>

              <TypewriterHeadline
                text={t("hero_headline", "Shaping minds, building futures through smarter learning")}
                className="mt-6 text-[var(--grey-10)]"
              />

              <p
                data-hero-intro
                className="mt-6 max-w-lg text-[17px] leading-relaxed text-[var(--grey-50)]/75"
              >
                {t("hero_description", "Join a new-era education where innovation meets knowledge. Discover expert-led bootcamps, practical skills, and real-world projects to launch your goals.")}
              </p>

              <div data-hero-intro className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/bootcamps"
                  search={(prev) => prev}
                  className="agy-btn bg-white text-[var(--grey-1200)] hover:bg-[var(--grey-50)]"
                >
                  {t("hero_btn_explore", "Explore bootcamps")} <ArrowRight size={14} />
                </Link>
                <Link
                  to="/register"
                  search={(prev) => prev}
                  className="agy-btn border border-white/20 bg-transparent text-[var(--grey-10)] hover:bg-white/10"
                >
                  {t("hero_btn_register", "Register now")} <ArrowUpRight size={14} />
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
                  <span className="font-medium text-[var(--grey-10)]">
                    {t("hero_students_count", "300+ students")}
                  </span>
                </span>
              </div>
            </div>

            <div data-hero-media className="relative">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
                <img
                  src={heroImage}
                  alt="Student coding at Sophor"
                  className="h-[380px] w-full object-cover sm:h-[480px]"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-white/10 bg-[var(--grey-1100)]/90 p-4 shadow-xl backdrop-blur sm:block">
                <div className="text-[10px] font-medium tracking-wide text-[var(--grey-50)]/60">
                  {t("hero_next_cohort", "Next cohort")}
                </div>
                <div className="mt-1 text-lg font-medium text-[var(--grey-10)]">
                  {t("hero_next_date", "July 7, 2026")}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </HeroParallaxSection>

      <Section>
        <RevealStagger className="grid gap-5 md:grid-cols-3" stagger={0.1}>
          {[
            {
              n: t("stat_paths_n", "1,000+"),
              t: t("stat_paths_t", "Knowledge Paths"),
              d: t("stat_paths_d", "From first lines of code to shipping AI-powered apps."),
            },
            {
              n: t("stat_learning_n", "Empowered"),
              t: t("stat_learning_t", "Learning"),
              d: t("stat_learning_d", "Live mentors, small cohorts, and real classroom energy."),
            },
            {
              n: t("stat_community_n", "Thriving"),
              t: t("stat_community_t", "Community"),
              d: t("stat_community_d", "Alumni circles, hackathons, and lifelong builder friendships."),
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
                {t("home_values_title", "Shaping the future of learning with Sophor Code Academy")}
              </h2>
              <p className="mt-6 text-[17px] leading-relaxed text-[var(--grey-800)] md:max-w-md">
                {t("home_values_subtitle", "At Sophor Code Academy, we combine innovation, technology, and personalized pathways to create a smarter learning experience — empowering learners to know more, grow faster, and build with greater impact.")}
              </p>
            </Reveal>
          }
        >
          {courses.values.map((v: any) => {
            const Icon = getIcon(v.icon);
            return (
              <div
                key={v.title.en}
                className="rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-6"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--grey-20)] text-[var(--grey-1200)]">
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 text-base font-medium text-[var(--grey-1200)]">{v.title[locale]}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--grey-800)]">{v.desc[locale]}</p>
              </div>
            );
          })}
        </PinnedSplitSection>
      </Section>

      <Section
        eyebrow={t("home_tracks_eyebrow", "Popular Tracks")}
        title={t("home_tracks_title", "Pick your bootcamp.")}
        subtitle={t("home_tracks_subtitle", "From first-time coders to AI tinkerers — there's a squad for every age.")}
      >
        <RevealStagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {featured.map((c: any) => (
            <div key={c.id} data-reveal-item>
              <CourseCard course={c} />
            </div>
          ))}
        </RevealStagger>
        <Reveal>
          <div className="mt-12 text-center">
            <Link
              to="/bootcamps"
              search={(prev) => prev}
              className="inline-flex items-center gap-1 text-[14px] font-medium text-[var(--grey-1200)] hover:gap-2 transition-all"
            >
              {t("home_tracks_see_all", "See all bootcamps")} <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </Section>

      <Section
        tone="dark"
        eyebrow={t("home_gallery_eyebrow", "Inside the academy")}
        title={t("home_gallery_title", "Where the magic happens.")}
      >
        <div className="-mx-[var(--page-margin)]">
          <HorizontalScrollSection
            className="min-h-[70vh]"
            trackClassName="px-[var(--page-margin)] pb-0"
          >
            {homepagePhotos.map((g: any) => (
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

      <Section eyebrow={t("home_testimonials_eyebrow", "Voices")} title={t("home_testimonials_title", "100k+ happy learner journeys.")}>
        <RevealStagger className="grid gap-6 md:grid-cols-3" stagger={0.1}>
          {gallery.testimonials.map((t: any) => (
            <figure
              key={t.name}
              data-reveal-item
              className="rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-7"
            >
              <blockquote className="text-[16px] leading-relaxed text-[var(--grey-1200)]">
                "{t.quote[locale]}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--grey-20)] font-medium text-[var(--grey-1200)]">
                  {t.name.charAt(0)}
                </div>
                <div className="text-[13px]">
                  <div className="font-medium text-[var(--grey-1200)]">{t.name}</div>
                  <div className="text-[var(--grey-800)]">{t.role[locale]}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </RevealStagger>
      </Section>

      <Section>
        <Reveal y={32}>
          <div className="hero-gradient relative overflow-hidden rounded-2xl p-12 text-center sm:p-20">
            <h2 className="agy-heading-2 text-[var(--grey-10)] whitespace-pre-line">
              {t("cta_title", "Summer is short.\nSkills are forever.")}
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[16px] text-[var(--grey-50)]/75">
              {t("cta_subtitle", "Limited seats per cohort. Reserve yours before the squad fills up.")}
            </p>
            <Link
              to="/register"
              search={(prev) => prev}
              className="agy-btn mt-9 inline-flex bg-white text-[var(--grey-1200)] hover:bg-[var(--grey-50)]"
            >
              {t("cta_btn", "Start enrollment")} <ArrowUpRight size={14} />
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
