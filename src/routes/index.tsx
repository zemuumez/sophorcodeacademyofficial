import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLayoutEffect, useRef, useMemo, useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { Reveal, RevealStagger } from "@/components/site/Reveal";
import { CourseCard } from "@/components/site/CourseCard";
import { useTranslation } from "@/hooks/useTranslation";
import { getCmsData, getPhotos } from "@/lib/api/cms.functions";
import { TestimonialsCarousel } from "@/components/site/TestimonialsCarousel";

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

// Helper to check if a title is generic (e.g., camera default names or numbers)
function isGenericTitle(title: string) {
  const clean = title.toLowerCase().trim();
  if (/^\d+$/.test(clean)) return true;
  if (/^(img|dsc|screenshot|photo|image|avatar|untitled)\s*\d*$/i.test(clean)) return true;
  if (/^(img|dsc|screenshot|photo|image|avatar|untitled)[_\-\s]*\d+$/i.test(clean)) return true;
  return false;
}

function Home() {
  const { site, courses, gallery, photos } = useLoaderData({ from: "/" }) as any;
  const { t, locale } = useTranslation();
  const heroIntroRef = useRef<HTMLDivElement>(null);
  
  const featured = courses.courses;
  const studentAvatars = [
    "/content/photos/avatars/avatar_1.jpeg",
    "/content/photos/avatars/avatar_2.jpeg",
    "/content/photos/avatars/avatar_3.jpeg",
  ];
  const heroImage = "/content/photos/hero/hero.jpeg";

  const slideshowImages = useMemo(() => {
    const list = photos?.slideshow || [];
    return list.length > 0 ? list : [heroImage];
  }, [photos?.slideshow]);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    if (slideshowImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [slideshowImages]);

  const headlines = useMemo(() => [
    t("hero_headline", "Shaping minds, building futures through smarter learning"),
    t("hero_headline_2", "Master Web Programming, Python, and AI"),
    t("hero_headline_3", "Learn Ge'ez, life skills, and indigenous knowledge"),
    t("hero_headline_4", "Ready for seniors, juniors, kids, and private squads")
  ], [t]);

  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [headlines]);

  const getTeacherImage = (teacherName: string, fallbackImage: string) => {
    const teacherPhotosList = photos?.teachers || [];
    const normalizedTargetName = teacherName.toLowerCase().replace(/[^a-z0-9]/g, "_");
    
    const matchedPhoto = teacherPhotosList.find((url: string) => {
      const filename = url.split("/").pop() || "";
      const nameWithoutExt = filename.replace(/\.[^/.]+$/, "").toLowerCase().replace(/[^a-z0-9]/g, "_");
      return nameWithoutExt === normalizedTargetName;
    });

    return matchedPhoto || fallbackImage;
  };

  const homepagePhotos = useMemo(() => {
    const list: { id: string; src: string; title: string }[] = [];
    const photoTitles = gallery?.photo_titles || {};

    ["classroom"].forEach((folder) => {
    // ["graduation", "classroom", "life_skills", "projects"].forEach((folder) => {
      const filePaths = photos[folder] || [];
      filePaths.forEach((src: string) => {
        const customTitleObj = photoTitles[src];
        const customTitle = customTitleObj?.[locale];
        let title = customTitle || formatFilenameToTitle(src);

        // If it's a generic title and not customized, let's show the category name instead
        if (isGenericTitle(title) && !customTitle) {
          const categoryKeyMap: Record<string, string> = {
            "graduation": "Graduation",
            "classroom": "Classroom",
            "life_skills": "Life Skills",
            "projects": "Projects"
          };
          const displayName = categoryKeyMap[folder] || folder;
          title = t(`filter_cat_${folder}`, displayName);
        }

        list.push({
          id: src,
          src,
          title,
        });
      });
    });
    return list.slice(0, 8);
  }, [photos, gallery, locale, t]);

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
                text={headlines[currentHeadlineIndex]}
                className="mt-6 text-[var(--grey-10)] min-h-[96px] sm:min-h-[80px] md:min-h-[120px]"
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
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl h-[380px] sm:h-[480px]">
                {slideshowImages.map((src: string, index: number) => (
                  <img
                    key={src}
                    src={src}
                    alt="Sophor classroom slideshow"
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                      index === currentSlideIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  />
                ))}
                
                {/* Slideshow indicator dots */}
                {slideshowImages.length > 1 && (
                  <div className="absolute bottom-4 right-4 z-20 flex gap-1.5 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-sm">
                    {slideshowImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlideIndex(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          index === currentSlideIndex
                            ? "w-4 bg-white"
                            : "w-1.5 bg-white/50 hover:bg-white/80"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="absolute -bottom-4 -left-4 z-20 hidden rounded-2xl border border-white/10 bg-[var(--grey-1100)]/90 p-4 shadow-xl backdrop-blur sm:block">
                <div className="text-[10px] font-medium tracking-wide text-[var(--grey-50)]/60">
                  {t("hero_next_cohort", "Next cohort")}
                </div>
                <div className="mt-1 text-lg font-medium text-[var(--grey-10)]">
                  {t("hero_next_date", "July 24, 2026")}
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
        <RevealStagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4" stagger={0.08}>
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
                className="w-[min(85vw,420px)] h-[340px] shrink-0 overflow-hidden rounded-2xl border border-white/10 flex flex-col bg-white/5"
              >
                <img
                  src={g.src}
                  alt={g.title}
                  loading="lazy"
                  className="flex-1 w-full object-cover"
                />
                {/* <figcaption className="border-t border-white/10 px-4 py-3 text-sm text-[var(--grey-50)]/80 bg-[var(--grey-1200)]/80">
                  {g.title}
                </figcaption> */}
              </figure>
            ))}
          </HorizontalScrollSection>
        </div>
      </Section>

      {/* TEACHERS SECTION */}
      {/* <Section
        eyebrow={t("home_teachers_eyebrow", "Mentors")}
        title={t("home_teachers_title", "Learn from active builders.")}
        subtitle={t("home_teachers_subtitle", "Our instructors are experienced engineers and educators dedicated to coding, AI, and heritage.")}
      >
        <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {(courses.teachers || []).map((teacher: any) => (
            <div
              key={teacher.name}
              data-reveal-item
              className="group relative flex flex-col items-center text-center rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--grey-50)] hover:shadow-[0_24px_48px_-20px_rgba(18,19,23,0.1)]"
            >
              <div className="relative h-28 w-28 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--grey-15)]">
                <img
                  src={getTeacherImage(teacher.name, teacher.image)}
                  alt={teacher.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-[17px] font-semibold text-[var(--grey-1200)]">
                {teacher.name}
              </h3>
              <div className="mt-1 text-[12px] font-medium text-[var(--grey-1200)] bg-[var(--grey-20)] px-2.5 py-0.5 rounded-full inline-block">
                {teacher.degree}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[var(--grey-800)]">
                {teacher.role[locale] || teacher.role.en}
              </p>
            </div>
          ))}
        </RevealStagger>
      </Section>
      */}

      <Section eyebrow={t("home_testimonials_eyebrow", "Voices")} title={t("home_testimonials_title", "100+ happy clients.")}>
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

      <Section
        centered
        eyebrow={
          <span className="relative inline-flex items-center px-4 py-1.5 text-[11px] font-semibold tracking-wider text-[var(--grey-800)] uppercase">
            <span className="absolute left-0 bottom-0 w-2.5 h-2.5 border-l border-b border-orange-500" />
            {t("home_testimonials_eyebrow", "Testimonials")}
            <span className="absolute right-0 top-0 w-2.5 h-2.5 border-r border-t border-orange-500" />
          </span>
        }
        title={
          <>
            {t("home_testimonials_title", "Results that speaks volume")}
            <span className="block text-[var(--grey-800)] mt-2 font-normal">
              {t("home_testimonials_subtitle", "Read success stories")}
            </span>
          </>
        }
        subtitle={t("home_testimonials_desc", "Find out how our happy clients are raving about us.")}
      >
        <TestimonialsCarousel
          testimonials={gallery.testimonials}
          personsPhotos={photos?.persons}
        />
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
