import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useLoaderData, L as Link } from "../_libs/tanstack__react-router.mjs";
import { j as ArrowRight, A as ArrowUpRight, L as LucideIcons, e as CircleQuestionMark } from "../_libs/lucide-react.mjs";
import { u as useTranslation, i as initGsap, C as Container, c as cn } from "./router-JNb6id3g.mjs";
import { S as Section } from "./Section-BigB185K.mjs";
import { p as prefersReducedMotion, a as RevealStagger, R as Reveal } from "./Reveal-DEDWqFdN.mjs";
import { C as CourseCard } from "./CourseCard-DIRNvKPL.mjs";
import { g as gsapWithCSS, S as ScrollTrigger } from "../_libs/gsap.mjs";
import "../_libs/seroval.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./server-pv48Vp7X.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
function TestimonialsCarousel({
  testimonials,
  personsPhotos = []
}) {
  const { locale } = useTranslation();
  const repeatedList = reactExports.useMemo(() => {
    if (testimonials.length === 0) return [];
    const base = [...testimonials];
    if (base.length <= 3) {
      return [...base, ...base, ...base, ...base];
    }
    return [...base, ...base];
  }, [testimonials]);
  const getPersonImage = (name) => {
    const normalizedName = name.toLowerCase().replace(/[^a-z0-9]/g, "_");
    const matched = personsPhotos.find((url) => {
      const filename = url.split("/").pop() || "";
      const nameWithoutExt = filename.replace(/\.[^/.]+$/, "").toLowerCase().replace(/[^a-z0-9]/g, "_");
      return nameWithoutExt === normalizedName;
    });
    return matched || "/content/photos/persons/placeholder.png";
  };
  if (testimonials.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full overflow-hidden py-4 select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--grey-10)] to-transparent z-10 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--grey-10)] to-transparent z-10 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-max animate-marquee hover:[animation-play-state:paused] cursor-pointer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-6 pr-6 shrink-0", children: repeatedList.map((t, index) => {
        const imgSrc = getPersonImage(t.name);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "figure",
          {
            className: "w-[320px] sm:w-[380px] flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-6 transition-all duration-300 hover:border-[var(--grey-300)] hover:shadow-lg",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "text-[14.5px] leading-relaxed text-[var(--grey-1200)] flex-1", children: [
                '"',
                t.quote[locale] || t.quote.en,
                '"'
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "mt-6 flex items-center gap-3 border-t border-[var(--border)] pt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--grey-15)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: imgSrc,
                    alt: t.name,
                    loading: "lazy",
                    className: "h-full w-full object-cover"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[13px] min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-[var(--grey-1200)] truncate", children: t.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-[var(--grey-800)] truncate", children: t.role[locale] || t.role.en })
                ] })
              ] })
            ]
          },
          `${t.name}-${index}`
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-6 pr-6 shrink-0", "aria-hidden": "true", children: repeatedList.map((t, index) => {
        const imgSrc = getPersonImage(t.name);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "figure",
          {
            className: "w-[320px] sm:w-[380px] flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-6 transition-all duration-300 hover:border-[var(--grey-300)] hover:shadow-lg",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "text-[14.5px] leading-relaxed text-[var(--grey-1200)] flex-1", children: [
                '"',
                t.quote[locale] || t.quote.en,
                '"'
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "mt-6 flex items-center gap-3 border-t border-[var(--border)] pt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--grey-15)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: imgSrc,
                    alt: t.name,
                    loading: "lazy",
                    className: "h-full w-full object-cover"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[13px] min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-[var(--grey-1200)] truncate", children: t.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-[var(--grey-800)] truncate", children: t.role[locale] || t.role.en })
                ] })
              ] })
            ]
          },
          `${t.name}-dup-${index}`
        );
      }) })
    ] })
  ] });
}
function TypewriterHeadline({
  text,
  className,
  speed = 0.035
}) {
  const rootRef = reactExports.useRef(null);
  const textRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const root = rootRef.current;
    const span = textRef.current;
    if (!root || !span) return;
    if (prefersReducedMotion()) {
      span.textContent = text;
      return;
    }
    initGsap();
    span.textContent = "";
    const chars = [...text];
    let index = 0;
    let timer;
    const tick = () => {
      if (index >= chars.length) return;
      span.textContent += chars[index];
      index += 1;
      timer = setTimeout(tick, speed * 1e3);
    };
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [text, speed]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { ref: rootRef, className: cn("agy-display", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ref: textRef }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "typewriter-cursor", "aria-hidden": true, children: "|" })
  ] });
}
function HeroParallaxSection({
  children,
  className
}) {
  const sectionRef = reactExports.useRef(null);
  const innerRef = reactExports.useRef(null);
  reactExports.useLayoutEffect(() => {
    const section = sectionRef.current;
    const inner = innerRef.current;
    if (!section || !inner) return;
    if (prefersReducedMotion()) return;
    initGsap();
    const media = inner.querySelector("[data-hero-media]");
    const ctx = gsapWithCSS.context(() => {
      gsapWithCSS.to(inner, {
        y: -90,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.2
        }
      });
      if (media) {
        gsapWithCSS.fromTo(
          media,
          { scale: 1, y: 0 },
          {
            scale: 1.06,
            y: -28,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 1.2
            }
          }
        );
      }
    }, section);
    return () => ctx.revert();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref: sectionRef, className, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: innerRef, children }) });
}
function HorizontalScrollSection({
  children,
  className,
  trackClassName
}) {
  const wrapRef = reactExports.useRef(null);
  const trackRef = reactExports.useRef(null);
  reactExports.useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;
    if (prefersReducedMotion()) {
      track.style.overflowX = "auto";
      return;
    }
    initGsap();
    const parentSection = wrap.closest("section");
    const triggerElement = parentSection || wrap;
    const ctx = gsapWithCSS.context(() => {
      const getScroll = () => Math.max(0, track.scrollWidth - wrap.offsetWidth);
      gsapWithCSS.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: triggerElement,
          pin: triggerElement,
          scrub: 1,
          start: () => "top " + (document.querySelector("header")?.offsetHeight || 52),
          end: () => `+=${getScroll() + window.innerHeight * 0.25}`,
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      });
    }, triggerElement);
    const onResize = () => {
      import("./router-JNb6id3g.mjs").then((n) => n.e).then(({ ScrollTrigger: ST }) => {
        gsapWithCSS.delayedCall(0.15, () => ST.refresh());
      });
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: wrapRef, className: cn("horizontal-scroll-wrap overflow-hidden", className), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: trackRef,
      className: cn(
        "horizontal-scroll-track flex w-max gap-4 will-change-transform",
        trackClassName
      ),
      children
    }
  ) });
}
function PinnedSplitSection({
  aside,
  children,
  className
}) {
  const sectionRef = reactExports.useRef(null);
  const pinRef = reactExports.useRef(null);
  const listRef = reactExports.useRef(null);
  reactExports.useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const list = listRef.current;
    if (!section || !pin || !list) return;
    if (prefersReducedMotion()) return;
    initGsap();
    const mm = gsapWithCSS.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const ctx = gsapWithCSS.context(() => {
        ScrollTrigger.create({
          trigger: section,
          start: () => "top " + ((document.querySelector("header")?.offsetHeight || 52) + 32),
          end: () => `+=${Math.max(list.offsetHeight - pin.offsetHeight, 200)}`,
          pin,
          pinSpacing: true,
          anticipatePin: 1
        });
        gsapWithCSS.from(list.children, {
          opacity: 0,
          y: 40,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: list,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      }, section);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref: sectionRef, className: cn("pinned-split", className), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-14", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: pinRef, className: "md:self-start", children: aside }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: listRef, className: "space-y-4", children })
  ] }) });
}
function formatFilenameToTitle(url) {
  const filename = url.split("/").pop() || "";
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  let formatted = nameWithoutExt.replace(/[_\-]/g, " ");
  formatted = formatted.replace(/\s+/g, " ");
  return formatted.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
function isGenericTitle(title) {
  const clean = title.toLowerCase().trim();
  if (/^\d+$/.test(clean)) return true;
  if (/^(img|dsc|screenshot|photo|image|avatar|untitled)\s*\d*$/i.test(clean)) return true;
  if (/^(img|dsc|screenshot|photo|image|avatar|untitled)[_\-\s]*\d+$/i.test(clean)) return true;
  return false;
}
function Home() {
  const {
    site,
    courses,
    gallery,
    photos
  } = useLoaderData({
    from: "/"
  });
  const {
    t,
    locale
  } = useTranslation();
  const heroIntroRef = reactExports.useRef(null);
  const featured = courses.courses;
  const studentAvatars = ["/content/photos/avatars/avatar_1.jpeg", "/content/photos/avatars/avatar_2.jpeg", "/content/photos/avatars/avatar_3.jpeg"];
  const heroImage = "/content/photos/hero/hero.jpeg";
  const slideshowImages = reactExports.useMemo(() => {
    const list = photos?.slideshow || [];
    return list.length > 0 ? list : [heroImage];
  }, [photos?.slideshow]);
  const [currentSlideIndex, setCurrentSlideIndex] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (slideshowImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [slideshowImages]);
  const headlines = reactExports.useMemo(() => [t("hero_headline", "Shaping minds, building futures through smarter learning"), t("hero_headline_2", "Master Web Programming, Python, and AI"), t("hero_headline_3", "Learn Ge'ez, life skills, and indigenous knowledge"), t("hero_headline_4", "Ready for seniors, juniors, kids, and private squads")], [t]);
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [headlines]);
  const homepagePhotos = reactExports.useMemo(() => {
    const list = [];
    const photoTitles = gallery?.photo_titles || {};
    ["classroom"].forEach((folder) => {
      const filePaths = photos[folder] || [];
      filePaths.forEach((src) => {
        const customTitleObj = photoTitles[src];
        const customTitle = customTitleObj?.[locale];
        let title = customTitle || formatFilenameToTitle(src);
        if (isGenericTitle(title) && !customTitle) {
          const categoryKeyMap = {
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
          title
        });
      });
    });
    return list.slice(0, 8);
  }, [photos, gallery, locale, t]);
  reactExports.useLayoutEffect(() => {
    const intro = heroIntroRef.current;
    if (!intro || prefersReducedMotion()) return;
    initGsap();
    const items = intro.querySelectorAll("[data-hero-intro]");
    const ctx = gsapWithCSS.context(() => {
      gsapWithCSS.from(items, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15
      });
    }, intro);
    return () => ctx.revert();
  }, []);
  const getIcon = (name) => {
    const Icon = LucideIcons[name] || CircleQuestionMark;
    return Icon;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroParallaxSection, { className: "hero-dark min-h-[min(92vh,900px)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "relative flex min-h-[min(92vh,900px)] flex-col justify-center py-20 sm:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: heroIntroRef, className: "grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-hero-intro": true, className: "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-wide text-[var(--grey-50)]/80 backdrop-blur", children: t("hero_enrollment", "Summer 2026 enrollment is open") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TypewriterHeadline, { text: headlines[currentHeadlineIndex], className: "mt-6 text-[var(--grey-10)] min-h-[96px] sm:min-h-[80px] md:min-h-[120px]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { "data-hero-intro": true, className: "mt-6 max-w-lg text-[17px] leading-relaxed text-[var(--grey-50)]/75", children: t("hero_description", "Join a new-era education where innovation meets knowledge. Discover expert-led bootcamps, practical skills, and real-world projects to launch your goals.") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-hero-intro": true, className: "mt-8 flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bootcamps", search: (prev) => prev, className: "agy-btn bg-white text-[var(--grey-1200)] hover:bg-[var(--grey-50)]", children: [
            t("hero_btn_explore", "Explore bootcamps"),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/register", search: (prev) => prev, className: "agy-btn border border-white/20 bg-transparent text-[var(--grey-10)] hover:bg-white/10", children: [
            t("hero_btn_register", "Register now"),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 14 })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-hero-intro": true, className: "mt-6 flex items-center gap-3 text-[12px] text-[var(--grey-50)]/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex -space-x-2", children: studentAvatars.map((src) => /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: "", className: "h-7 w-7 rounded-full border-2 border-[var(--grey-1200)] object-cover" }, src)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-[var(--grey-10)]", children: t("hero_students_count", "300+ students") }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-hero-media": true, className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl h-[380px] sm:h-[480px]", children: [
          slideshowImages.map((src, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: "Sophor classroom slideshow", className: `absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentSlideIndex ? "opacity-100 z-10" : "opacity-0 z-0"}` }, src)),
          slideshowImages.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 right-4 z-20 flex gap-1.5 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-sm", children: slideshowImages.map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCurrentSlideIndex(index), className: `h-1.5 rounded-full transition-all duration-300 cursor-pointer ${index === currentSlideIndex ? "w-4 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"}`, "aria-label": `Go to slide ${index + 1}` }, index)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -bottom-4 -left-4 z-20 hidden rounded-2xl border border-white/10 bg-[var(--grey-1100)]/90 p-4 shadow-xl backdrop-blur sm:block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-medium tracking-wide text-[var(--grey-50)]/60", children: t("hero_next_cohort", "Next cohort") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-lg font-medium text-[var(--grey-10)]", children: t("hero_next_date", "July 24, 2026") })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(RevealStagger, { className: "grid gap-5 md:grid-cols-3", stagger: 0.1, children: [{
      n: t("stat_paths_n", "1,000+"),
      t: t("stat_paths_t", "Knowledge Paths"),
      d: t("stat_paths_d", "From first lines of code to shipping AI-powered apps.")
    }, {
      n: t("stat_learning_n", "Empowered"),
      t: t("stat_learning_t", "Learning"),
      d: t("stat_learning_d", "Live mentors, small cohorts, and real classroom energy.")
    }, {
      n: t("stat_community_n", "Thriving"),
      t: t("stat_community_t", "Community"),
      d: t("stat_community_d", "Alumni circles, hackathons, and lifelong builder friendships.")
    }].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-reveal-item": true, className: "group rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-8 transition hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-20px_rgba(18,19,23,0.1)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-medium tracking-wide text-[var(--grey-800)]", children: c.n }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-medium tracking-tight text-[var(--grey-1200)]", children: c.t }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-[var(--grey-800)]", children: c.d })
    ] }, c.t)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { tone: "muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PinnedSplitSection, { aside: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "agy-heading-2 text-[var(--grey-1200)]", children: t("home_values_title", "Shaping the future of learning with Sophor Code Academy") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-[17px] leading-relaxed text-[var(--grey-800)] md:max-w-md", children: t("home_values_subtitle", "At Sophor Code Academy, we combine innovation, technology, and personalized pathways to create a smarter learning experience — empowering learners to know more, grow faster, and build with greater impact.") })
    ] }), children: courses.values.map((v) => {
      const Icon = getIcon(v.icon);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-[var(--grey-20)] text-[var(--grey-1200)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-base font-medium text-[var(--grey-1200)]", children: v.title[locale] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm leading-relaxed text-[var(--grey-800)]", children: v.desc[locale] })
      ] }, v.title.en);
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { eyebrow: t("home_tracks_eyebrow", "Popular Tracks"), title: t("home_tracks_title", "Pick your bootcamp."), subtitle: t("home_tracks_subtitle", "From first-time coders to AI tinkerers — there's a squad for every age."), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RevealStagger, { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4", stagger: 0.08, children: featured.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-reveal-item": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CourseCard, { course: c }) }, c.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/bootcamps", search: (prev) => prev, className: "inline-flex items-center gap-1 text-[14px] font-medium text-[var(--grey-1200)] hover:gap-2 transition-all", children: [
        t("home_tracks_see_all", "See all bootcamps"),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { tone: "dark", eyebrow: t("home_gallery_eyebrow", "Inside the academy"), title: t("home_gallery_title", "Where the magic happens."), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "-mx-[var(--page-margin)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HorizontalScrollSection, { className: "min-h-[70vh]", trackClassName: "px-[var(--page-margin)] pb-0", children: homepagePhotos.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("figure", { className: "w-[min(85vw,420px)] h-[340px] shrink-0 overflow-hidden rounded-2xl border border-white/10 flex flex-col bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: g.src, alt: g.title, loading: "lazy", className: "flex-1 w-full object-cover" }) }, g.id)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { eyebrow: t("home_testimonials_eyebrow", "Voices"), title: t("home_testimonials_title", "100+ happy clients."), children: /* @__PURE__ */ jsxRuntimeExports.jsx(RevealStagger, { className: "grid gap-6 md:grid-cols-3", stagger: 0.1, children: gallery.testimonials.map((t2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { "data-reveal-item": true, className: "rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "text-[16px] leading-relaxed text-[var(--grey-1200)]", children: [
        '"',
        t2.quote[locale],
        '"'
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "mt-6 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-full bg-[var(--grey-20)] font-medium text-[var(--grey-1200)]", children: t2.name.charAt(0) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[13px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-[var(--grey-1200)]", children: t2.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[var(--grey-800)]", children: t2.role[locale] })
        ] })
      ] })
    ] }, t2.name)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { centered: true, eyebrow: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-flex items-center px-4 py-1.5 text-[11px] font-semibold tracking-wider text-[var(--grey-800)] uppercase", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-0 bottom-0 w-2.5 h-2.5 border-l border-b border-orange-500" }),
      t("home_testimonials_eyebrow", "Testimonials"),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-0 top-0 w-2.5 h-2.5 border-r border-t border-orange-500" })
    ] }), title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      t("home_testimonials_title", "Results that speaks volume"),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[var(--grey-800)] mt-2 font-normal", children: t("home_testimonials_subtitle", "Read success stories") })
    ] }), subtitle: t("home_testimonials_desc", "Find out how our happy clients are raving about us."), children: /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialsCarousel, { testimonials: gallery.testimonials, personsPhotos: photos?.persons }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { y: 32, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-gradient relative overflow-hidden rounded-2xl p-12 text-center sm:p-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "agy-heading-2 text-[var(--grey-10)] whitespace-pre-line", children: t("cta_title", "Summer is short.\nSkills are forever.") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-5 max-w-lg text-[16px] text-[var(--grey-50)]/75", children: t("cta_subtitle", "Limited seats per cohort. Reserve yours before the squad fills up.") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/register", search: (prev) => prev, className: "agy-btn mt-9 inline-flex bg-white text-[var(--grey-1200)] hover:bg-[var(--grey-50)]", children: [
        t("cta_btn", "Start enrollment"),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 14 })
      ] })
    ] }) }) })
  ] });
}
export {
  Home as component
};
