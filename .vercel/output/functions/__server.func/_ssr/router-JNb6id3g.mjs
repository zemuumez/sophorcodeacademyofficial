import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useRouterState, e as useLoaderData, f as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { S as ScrollTrigger, g as gsapWithCSS } from "../_libs/gsap.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-pv48Vp7X.mjs";
import { A as ArrowUpRight, X, M as Menu } from "../_libs/lucide-react.mjs";
import { o as object, b as any, _ as _enum, s as string, l as literal, n as number } from "../_libs/zod.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const appCss = "/assets/styles-pypepAh9.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const SITE = {
  name: "Sophor Code Academy"
};
const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Bootcamps", to: "/bootcamps" },
  { label: "Gallery", to: "/gallery" },
  { label: "Register", to: "/register" },
  { label: "Contact", to: "/contact" }
];
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Container({
  children,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("agy-container", className), children });
}
const logo = "/assets/logo-CzvUYRv0.jpg";
const imageModules = /* @__PURE__ */ Object.assign({});
const allImages = Object.entries(imageModules).sort(([a], [b]) => a.localeCompare(b)).map(([, src]) => src);
allImages.slice(0, 3);
allImages[3] ?? allImages[0];
allImages[4] ?? allImages[0];
allImages.slice(5, 17);
function SiteLogo({
  className,
  imageClassName,
  showName = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("flex items-center gap-2.5", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: logo,
        alt: SITE.name,
        className: cn("h-10 w-10 shrink-0 rounded-lg object-contain sm:h-11 sm:w-11", imageClassName)
      }
    ),
    showName && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[15px] font-medium tracking-tight", children: SITE.name })
  ] });
}
function useNavbarScroll(threshold = 48) {
  const [scrolled, setScrolled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}
const en = { "nav_home": "Home", "nav_bootcamps": "Bootcamps", "nav_gallery": "Gallery", "nav_register": "Register", "nav_contact": "Contact", "filter_track_all": "All", "filter_track_bootcamp package": "Bootcamp Package", "filter_track_1-on-1 mentorship": "1-on-1 Mentorship", "filter_age_all": "All", "filter_age_kids": "Kids", "filter_age_juniors": "Juniors", "filter_age_seniors": "Seniors", "filter_age_private": "Private Students", "filter_cat_all": "All", "filter_cat_graduation": "Graduation", "filter_cat_classroom": "Classroom", "filter_cat_life_skills": "Life Skills", "filter_cat_projects": "Projects", "footer_description": "Empowering kids and youth in Ethiopia with coding, AI, and essential life skills.", "footer_contact": "Contact info", "footer_rights": "All rights reserved.", "hero_enrollment": "Summer 2026 enrollment is open", "hero_headline": "Shaping minds, building futures through smarter learning", "hero_headline_2": "Master Web Programming, Python, and AI", "hero_headline_3": "Learn Ge'ez, life skills, and indigenous knowledge", "hero_headline_4": "Ready for seniors, juniors, kids, and private squads", "hero_description": "Join a new-era education where innovation meets knowledge. Discover expert-led bootcamps, practical skills, and real-world projects to launch your goals.", "hero_btn_explore": "Explore bootcamps", "hero_btn_register": "Register now", "hero_students_count": "300+ students already learning across Addis Ababa", "hero_next_cohort": "Next cohort", "hero_next_date": "July 24, 2026", "stat_paths_n": "1,000+", "stat_paths_t": "Knowledge Paths", "stat_paths_d": "From first lines of code to shipping AI-powered apps.", "stat_learning_n": "Empowered", "stat_learning_t": "Learning", "stat_learning_d": "Live mentors, small cohorts, and real classroom energy.", "stat_community_n": "Thriving", "stat_community_t": "Community", "stat_community_d": "Alumni circles, hackathons, and lifelong builder friendships.", "home_values_eyebrow": "Sophor core values", "home_values_title": "Shaping the future of learning with Sophor Code Academy", "home_values_subtitle": "At Sophor Code Academy, we combine innovation, technology, and personalized pathways to create a smarter learning experience — empowering learners to know more, grow faster, and build with greater impact.", "home_tracks_eyebrow": "Popular Tracks", "home_tracks_title": "Pick your bootcamp.", "home_tracks_subtitle": "From first-time coders to AI tinkerers — there's a squad for every age.", "home_tracks_see_all": "See all bootcamps", "home_gallery_eyebrow": "Inside the academy", "home_gallery_title": "Where the magic happens.", "home_gallery_subtitle": "Graduation ceremonies, classrooms in motion, life-skill workshops, and real-world group projects.", "home_testimonials_eyebrow": "Voices", "home_testimonials_title": "100k+ happy learner journeys.", "home_teachers_eyebrow": "Mentors", "home_teachers_title": "Learn from active builders.", "home_teachers_subtitle": "Our instructors are experienced engineers and educators dedicated to coding, AI, and heritage.", "cta_title": "Summer is short.\nSkills are forever.", "cta_subtitle": "Limited seats per cohort. Reserve yours before the squad fills up.", "cta_btn": "Start enrollment", "bootcamps_eyebrow": "Summer 2026", "bootcamps_title": "Choose your bootcamp.", "bootcamps_subtitle": "Filter by age group or topic. Every track ends in a Demo Day and a badge.", "bootcamps_filter_age": "Age", "bootcamps_filter_track": "Track", "bootcamps_filter_all": "All", "bootcamps_no_results": "No bootcamps match those filters yet — try a different combo.", "bootcamps_life_skills_eyebrow": "Common core", "bootcamps_life_skills_title": "Common core, taught alongside code.", "bootcamps_life_skills_subtitle": "Every Sophor bootcamp program includes our mandatory common core: Ge'ez heritage, life skills, and indigenous knowledge.", "bootcamps_badges_eyebrow": "Gamified", "bootcamps_badges_title": "Collect your Skill Badges.", "gallery_eyebrow": "Gallery", "gallery_title": "Inside the academy.", "gallery_subtitle": "Graduation ceremonies, classrooms in motion, life-skill workshops, and real-world group projects.", "gallery_campus_eyebrow": "Campus", "gallery_campus_title": "Find us in Addis.", "gallery_campus_subtitle_1": "A space built for builders.", "gallery_campus_subtitle_2": "Bright classrooms, fast Wi-Fi, makers' lab, quiet study corners, and a mini auditorium for Demo Day. Snacks on us.", "gallery_visit_us": "Visit us", "gallery_call": "Call", "gallery_email": "Email", "gallery_hours": "Hours", "contact_eyebrow": "Contact", "contact_title": "Let's talk.", "contact_subtitle": "Questions, partnerships, or press — we'd love to hear from you.", "contact_form_name": "Your name", "contact_form_email": "Email", "contact_form_subject": "Subject", "contact_form_message": "Message", "contact_form_submit": "Send message", "contact_form_sending": "Sending…", "contact_success_title": "Message sent.", "contact_success_desc": "We typically reply within one business day.", "contact_success_btn": "Send another", "contact_rate_error": "Please wait a moment before sending another message.", "register_eyebrow": "Enroll", "register_title": "Reserve your seat.", "register_subtitle": "It takes 2 minutes. We'll follow up with payment options and the welcome pack.", "register_form_student_name": "Student name", "register_form_age": "Age", "register_form_grade": "Grade / School (optional)", "register_form_parent_name": "Parent / Guardian name", "register_form_parent_phone": "Parent phone", "register_form_parent_email": "Parent email", "register_form_bootcamp": "Bootcamp track", "register_form_bootcamp_placeholder": "Select a bootcamp…", "register_form_dietary": "Dietary or special requirements (optional)", "register_form_dietary_hint": "Allergies, accessibility needs, anything we should know.", "register_form_consent": "I am the parent/guardian and consent to enrollment.", "register_form_submit": "Reserve seat", "register_form_submitting": "Submitting…", "register_form_disclaimer": "Your information is validated and never shared. We use it only to contact you about enrollment.", "register_success_title": "You're in the squad.", "register_success_desc": "We've received the registration. Our team will reach out within 2 business days with payment and onboarding details.", "register_success_btn": "Register another student" };
const am = { "nav_home": "መነሻ", "nav_bootcamps": "ቡትካምፖች", "nav_gallery": "ማዕከለ-ስዕላት", "nav_register": "ይመዝገቡ", "nav_contact": "ግንኙነት", "filter_track_all": "အားလုံး", "filter_track_bootcamp package": "የቡትካምፕ ጥቅል", "filter_track_1-on-1 mentorship": "የ 1-ለ-1 ማስተማር", "filter_age_all": "အားလုံး", "filter_age_kids": "ልጆች", "filter_age_juniors": "ታዳጊዎች", "filter_age_seniors": "ወጣቶች", "filter_age_private": "የግል ተማሪዎች", "filter_cat_all": "အားလုံး", "filter_cat_graduation": "ምረቃ", "filter_cat_classroom": "ክፍል ውስጥ", "filter_cat_life_skills": "የህይወት ክህሎት", "filter_cat_projects": "ፕሮጀክቶች", "footer_description": "በኢትዮጵያ ውስጥ ያሉ ህጻናትን እና ወጣቶችን በኮዲንግ፣ በ AI እና በህይወት ክህሎት ማብቃት።", "footer_contact": "የመገናኛ መረጃ", "footer_rights": "መብቱ በህግ የተጠበቀ ነው።", "hero_enrollment": "የበጋ 2026 ምዝገባ ተጀምሯል", "hero_headline": "በተሻለ ትምህርት አእምሮን መቅረጽ፣ የወደፊቱን መገንባት", "hero_headline_2": "የዌብ ፕሮግራሚንግ፣ ፓይተን እና የኤአይ ክህሎት ማዳበር", "hero_headline_3": "ግዕዝን፣ የህይወት ክህሎትን እና ሀገር በቀል እውቀትን ይማሩ", "hero_headline_4": "ለታዳጊዎች፣ ለወጣቶች፣ ለህፃናት እና ለግል ተማሪዎች የተዘጋጀ", "hero_description": "ፈጠራ ከእውቀት ጋር የሚገናኝበትን አዲስ የትምህርት ዘመን ይቀላቀሉ። ግቦችዎን ለማሳካት በባለሙያዎች የሚመሩ ቡትካምፖችን፣ ተግባራዊ ክህሎቶችን እና እውነተኛ ፕሮጀክቶችን ያግኙ።", "hero_btn_explore": "ቡትካምፖችን ያስሱ", "hero_btn_register": "አሁን ይመዝገቡ", "hero_students_count": "300+ ተማሪዎች በአዲስ አበባ እየተማሩ ይገኛሉ", "hero_next_cohort": "የሚቀጥለው ዙር", "hero_next_date": "ሐምሌ 17፣ 2018 (July 24, 2026)", "stat_paths_n": "1,000+", "stat_paths_t": "የእውቀት ጎዳናዎች", "stat_paths_d": "ከመጀመሪያው የኮድ መስመር ጀምሮ በኤአይ የሚሰሩ መተግበሪያዎችን እስከ መስራት።", "stat_learning_n": "የነቃ", "stat_learning_t": "ትምህርት", "stat_learning_d": "የቀጥታ አማካሪዎች፣ አነስተኛ ተማሪዎች እና እውነተኛ የክፍል ጉልበት።", "stat_community_n": "የበለጸገ", "stat_community_t": "ማህበረሰብ", "stat_community_d": "የቀድሞ ተማሪዎች ክበብ፣ ሃካቶኖች እና የዕድሜ ልክ ግንኙነቶች።", "home_values_eyebrow": "የሶፎር እሴቶች", "home_values_title": "የመማርን የወደፊት ጊዜ በሶፎር ኮድ አካዳሚ መቅረጽ", "home_values_subtitle": "በሶፎር ኮድ አካዳሚ፣ ፈጠራን፣ ቴክኖሎጂን እና ብጁ የመማሪያ መንገዶችን በማጣመር የተሻለ የመማር ልምድ እንፈጥራለን - ተማሪዎች የበለጠ እንዲያውቁ፣ ፈጣን እንዲያድጉ እና በትልቅ ተጽእኖ እንዲገነቡ እናበቃለን።", "home_tracks_eyebrow": "ታዋቂ ትራኮች", "home_tracks_title": "ቡትካምፕዎን ይምረጡ።", "home_tracks_subtitle": "ከጀማሪ ኮደሮች እስከ ኤአይ ሰሪዎች — ለእያንዳንዱ ዕድሜ የሚሆን ቡድን አለ።", "home_tracks_see_all": "ሁሉንም ቡትካምፖች ይመልከቱ", "home_gallery_eyebrow": "በአካዳሚው ውስጥ", "home_gallery_title": "ተአምራቱ የሚፈጠርበት ቦታ።", "home_gallery_subtitle": "የምረቃ ስነ-ስርዓቶች፣ ተንቀሳቃሽ ክፍሎች፣ የህይወት ክህሎት ወርክሾፖች እና እውነተኛ የቡድን ፕሮጀክቶች።", "home_testimonials_eyebrow": "ምስክርነቶች", "home_testimonials_title": "100k+ ደስተኛ ተማሪዎች።", "home_teachers_eyebrow": "አማካሪዎች", "home_teachers_title": "ከተግባራዊ ገንቢዎች ይማሩ።", "home_teachers_subtitle": "መምህሮቻችን በኮዲንግ፣ በኤአይ እና በቅርስ ትምህርት ላይ የተሰማሩ ልምድ ያላቸው መሐንዲሶች እና አስተማሪዎች ናቸው።", "cta_title": "ክረምት አጭር ነው\nክህሎት ግን ዘላቂ ነው።", "cta_subtitle": "ለእያንዳንዱ ዙር መቀመጫዎች የተገደቡ ናቸው። ሳይሞላ የእርስዎን ያስይዙ።", "cta_btn": "ምዝገባ ይጀምሩ", "bootcamps_eyebrow": "በጋ 2026", "bootcamps_title": "ቡትካምፕዎን ይምረጡ።", "bootcamps_subtitle": "በእድሜ ክልል ወይም በርዕስ ያጣሩ። እያንዳንዱ ትራክ በማሳያ ቀን እና በባጅ ይጠናቀቃል።", "bootcamps_filter_age": "ዕድሜ", "bootcamps_filter_track": "ትራክ", "bootcamps_filter_all": "အားလုံး", "bootcamps_no_results": "በእነዚህ ማጣሪያዎች የሚስማማ ቡትካምፕ እስካሁን የለም — ሌላ ማጣሪያ ይሞክሩ።", "bootcamps_life_skills_eyebrow": "የጋራ እውቀት", "bootcamps_life_skills_title": "የጋራ እውቀት ከኮድ ጎን ለጎን።", "bootcamps_life_skills_subtitle": "እያንዳንዱ የሶፎር ቡትካምፕ ፕሮግራም አስገዳጅ የሆነውን የጋራ እውቀት ያካትታል፡ የግዕዝ ቅርስ፣ የህይወት ክህሎት እና ሀገር በቀል እውቀት።", "bootcamps_badges_eyebrow": "የጨዋታ መልክ የተሰጠው", "bootcamps_badges_title": "የክህሎት ባጆችን ይሰብስቡ።", "gallery_eyebrow": "ማዕከለ-ስዕላት", "gallery_title": "በአካዳሚው ውስጥ።", "gallery_subtitle": "የምረቃ ስነ-ስርዓቶች፣ ተንቀሳቃሽ ክፍሎች፣ የህይወት ክህሎት ወርክሾፖች እና እውነተኛ የቡድን ፕሮጀክቶች።", "gallery_campus_eyebrow": "ግቢ", "gallery_campus_title": "አዲስ አበባ ውስጥ ያግኙን።", "gallery_campus_subtitle_1": "ለገንቢዎች የተሰራ ቦታ።", "gallery_campus_subtitle_2": "ብሩህ የመማሪያ ክፍሎች፣ ፈጣን ዋይፋይ፣ የሰሪዎች ቤተ-ሙከራ፣ ጸጥተኛ የጥናት ማዕዘኖች እና ለማሳያ ቀን አነስተኛ አዳራሽ። መክሰስ በእኛ።", "gallery_visit_us": "ይጎብኙን", "gallery_call": "ይደውሉ", "gallery_email": "ኢሜይል", "gallery_hours": "ሰዓታት", "contact_eyebrow": "ግንኙነት", "contact_title": "እንነጋገር።", "contact_subtitle": "ጥያቄዎች፣ አጋርነቶች ወይም ፕሬስ — ከእርስዎ መስማት እንፈልጋለን።", "contact_form_name": "ስምዎ", "contact_form_email": "ኢሜይል", "contact_form_subject": "ርዕሰ ጉዳይ", "contact_form_message": "መልዕክት", "contact_form_submit": "መልዕክት ላክ", "contact_form_sending": "በመላክ ላይ…", "contact_success_title": "መልዕክቱ ተልኳል።", "contact_success_desc": "ብዙውን ጊዜ በአንድ የስራ ቀን ውስጥ ምላሽ እንሰጣለን።", "contact_success_btn": "ሌላ ላክ", "contact_rate_error": "እባክዎን ሌላ መልዕክት ከመላክዎ በፊት ትንሽ ይጠብቁ።", "register_eyebrow": "ይመዝገቡ", "register_title": "ቦታዎን ያስይዙ።", "register_subtitle": "2 ደቂቃ ይወስዳል። የክፍያ አማራጮችን እና የእንኳን ደህና መጡ ጥቅል ይዘን እናገኝዎታለን።", "register_form_student_name": "የተማሪው ስም", "register_form_age": "ዕድሜ", "register_form_grade": "ክፍል / ትምህርት ቤት (አማራጭ)", "register_form_parent_name": "የወላጅ / አሳዳጊ ስም", "register_form_parent_phone": "የወላጅ ስልክ", "register_form_parent_email": "የወላጅ ኢሜይል", "register_form_bootcamp": "የቡትካምፕ ትራክ", "register_form_bootcamp_placeholder": "ቡትካምፕ ይምረጡ…", "register_form_dietary": "የአመጋገብ ወይም ልዩ ፍላጎቶች (አማራጭ)", "register_form_dietary_hint": "አለርጂዎች፣ የተደራሽነት ፍላጎቶች ወይም እኛ ማወቅ ያለብን ማንኛውም ነገር።", "register_form_consent": "እኔ ወላጅ/አሳዳጊ ነኝ እና ምዝገባውን እስማማለሁ።", "register_form_submit": "ቦታ ያስይዙ", "register_form_submitting": "በማስገባት ላይ…", "register_form_disclaimer": "የእርስዎ መረጃ የተረጋገጠ እና መቼም ለማንም የማይጋራ ነው። ለእርስዎ ምዝገባ ለመገናኘት ብቻ እንጠቀምበታለን።", "register_success_title": "ቡድኑን ተቀላቅለዋል።", "register_success_desc": "ምዝገባውን ተቀብለናል። ቡድናችን የክፍያ እና የመግቢያ ዝርዝሮችን ይዞ በ 2 የስራ ቀናት ውስጥ ያገኝዎታል።", "register_success_btn": "ሌላ ተማሪ ይመዝግቡ" };
const translationsRaw = {
  en,
  am
};
const translations = translationsRaw;
function useTranslation() {
  const state = useRouterState();
  const search = state.location.search;
  const locale = search.lang === "am" ? "am" : "en";
  const navigate = useNavigate();
  const t = (key, defaultText) => {
    const translationGroup = translations[locale];
    if (translationGroup && translationGroup[key] !== void 0) {
      return translationGroup[key];
    }
    const defaultGroup = translations["en"];
    if (defaultGroup && defaultGroup[key] !== void 0) {
      return defaultGroup[key];
    }
    return defaultText ?? key;
  };
  const changeLanguage = (lang) => {
    navigate({
      search: (prev) => ({ ...prev, lang })
    });
  };
  return { t, locale, changeLanguage };
}
function Navbar() {
  const [open, setOpen] = reactExports.useState(false);
  const { location } = useRouterState();
  const scrolled = useNavbarScroll();
  const { t, locale, changeLanguage } = useTranslation();
  const getLocalizedLabel = (label) => {
    switch (label) {
      case "Home":
        return t("nav_home", "Home");
      case "Bootcamps":
        return t("nav_bootcamps", "Bootcamps");
      case "Gallery":
        return t("nav_gallery", "Gallery");
      case "Register":
        return t("nav_register", "Register");
      case "Contact":
        return t("nav_contact", "Contact");
      default:
        return label;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "header",
    {
      className: cn(
        "sticky top-0 z-50 border-b backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-300",
        scrolled ? "border-[var(--border)] bg-[var(--grey-0)]/98 shadow-[0_8px_30px_rgba(18,19,23,0.06)]" : "border-transparent bg-[var(--grey-0)]/80"
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Container, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between gap-4",
            style: { minHeight: "var(--nav-height)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/",
                  search: (prev) => prev,
                  className: "text-[var(--grey-1200)]",
                  onClick: () => setOpen(false),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SiteLogo, { showName: true })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-1 md:flex", children: NAV_LINKS.filter((l) => l.to !== "/register").map((link) => {
                const active = location.pathname === link.to;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: link.to,
                    search: (prev) => prev,
                    className: cn(
                      "rounded-full px-4 py-2 text-[13px] font-medium transition",
                      active ? "bg-[var(--grey-20)] text-[var(--grey-1200)]" : "text-[var(--grey-800)] hover:bg-[var(--grey-15)] hover:text-[var(--grey-1200)]"
                    ),
                    children: getLocalizedLabel(link.label)
                  },
                  link.to
                );
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 rounded-full border border-[var(--border)] p-[2px] bg-[var(--grey-15)]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => changeLanguage("en"),
                      className: cn(
                        "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase transition cursor-pointer select-none",
                        locale === "en" ? "bg-[var(--grey-0)] text-[var(--grey-1200)] shadow-[0_1px_3px_rgba(0,0,0,0.1)] font-semibold" : "text-[var(--grey-800)] hover:text-[var(--grey-1200)]"
                      ),
                      children: "EN"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => changeLanguage("am"),
                      className: cn(
                        "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase transition cursor-pointer select-none",
                        locale === "am" ? "bg-[var(--grey-0)] text-[var(--grey-1200)] shadow-[0_1px_3px_rgba(0,0,0,0.1)] font-semibold" : "text-[var(--grey-800)] hover:text-[var(--grey-1200)]"
                      ),
                      children: "አማ"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/register",
                    search: (prev) => prev,
                    className: "agy-btn agy-btn-primary text-[12.5px]",
                    children: [
                      t("nav_register", "Register Now"),
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 13 })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    "aria-label": "Toggle menu",
                    className: "rounded-lg p-2 text-[var(--grey-1200)] md:hidden",
                    onClick: () => setOpen((v) => !v),
                    children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 20 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 20 })
                  }
                )
              ] })
            ]
          }
        ),
        open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-[var(--border)] py-2 md:hidden", children: [
          NAV_LINKS.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: link.to,
              search: (prev) => prev,
              onClick: () => setOpen(false),
              className: "block rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--grey-1200)] hover:bg-[var(--grey-15)]",
              children: getLocalizedLabel(link.label)
            },
            link.to
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 px-3 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/register",
              search: (prev) => prev,
              onClick: () => setOpen(false),
              className: "agy-btn agy-btn-primary w-full text-[12.5px] justify-center",
              children: [
                t("nav_register", "Register Now"),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 13 })
              ]
            }
          ) })
        ] })
      ] })
    }
  );
}
function Footer() {
  const { site } = useLoaderData({ from: "__root__" });
  const { t, locale } = useTranslation();
  const getLocalizedLabel = (label) => {
    switch (label) {
      case "Home":
        return t("nav_home", "Home");
      case "Bootcamps":
        return t("nav_bootcamps", "Bootcamps");
      case "Gallery":
        return t("nav_gallery", "Gallery");
      case "Register":
        return t("nav_register", "Register");
      case "Contact":
        return t("nav_contact", "Contact");
      default:
        return label;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "mt-24 border-t border-[var(--border)] bg-[var(--grey-1200)] text-[var(--grey-10)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Container, { className: "py-16 text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-12 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SiteLogo, { className: "text-[var(--grey-10)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-sm leading-relaxed text-[var(--grey-50)]/80", children: site.description[locale] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium uppercase tracking-wider text-[var(--grey-50)]/60", children: t("nav_bootcamps", "Explore") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2.5 text-[var(--grey-50)]/90", children: NAV_LINKS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: l.to,
            search: (prev) => prev,
            className: "transition hover:text-white hover:underline",
            children: getLocalizedLabel(l.label)
          }
        ) }, l.to)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium uppercase tracking-wider text-[var(--grey-50)]/60", children: t("footer_contact", "Contact Info") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-2.5 text-[var(--grey-50)]/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: site.address[locale] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: site.phone }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: site.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: site.hours[locale] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 border-t border-white/10 pt-6 text-xs text-[var(--grey-50)]/50", children: [
      "Copyright © ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " ",
      site.name,
      ". ",
      t("footer_rights", "All rights reserved.")
    ] })
  ] }) });
}
let registered = false;
function initGsap() {
  if (typeof window === "undefined" || registered) return;
  gsapWithCSS.registerPlugin(ScrollTrigger);
  registered = true;
}
const gsap = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ScrollTrigger,
  gsap: gsapWithCSS,
  initGsap
}, Symbol.toStringTag, { value: "Module" }));
function GsapInit() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  reactExports.useEffect(() => {
    initGsap();
    const t = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(t);
  }, []);
  reactExports.useEffect(() => {
    initGsap();
    const t = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(t);
  }, [pathname]);
  return null;
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getCmsData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("2f68df1bc7912dea48e0f740a088bd6a875a7ff877472e38cc86d7f242ed2040"));
const saveCmsData = createServerFn({
  method: "POST"
}).inputValidator(object({
  type: _enum(["site", "courses", "gallery", "translations"]),
  data: any()
})).handler(createSsrRpc("ae4aa1d182f3b742d709ad431a103caf7a5fca666eb602d03a2014e6507ee36d"));
const getPhotos = createServerFn({
  method: "GET"
}).handler(createSsrRpc("4210455d25da4e34dbbe8f6b131f0db9e214f680b0ae6e7193d90337c4d3e8e5"));
const uploadPhoto = createServerFn({
  method: "POST"
}).inputValidator(object({
  category: string().min(1),
  filename: string().min(1),
  base64Data: string().min(1)
})).handler(createSsrRpc("bbb049adf08856dfa55ee79ba8b53db588c9843fa30d91e4e108177c9d59599e"));
const deletePhoto = createServerFn({
  method: "POST"
}).inputValidator(object({
  photoUrl: string().min(1)
})).handler(createSsrRpc("972560a032c8f579c8d635233af58d4c41596548ac543b5e8ea84b33f0e7dfc2"));
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "agy-display text-[var(--grey-1200)]", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "That route is off the map. Let's get you back." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "agy-btn agy-btn-primary",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong. Try again or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "rounded-full border border-border bg-background/50 px-5 py-2.5 text-sm font-semibold hover:bg-secondary",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$6 = createRootRouteWithContext()({
  loader: async () => {
    return await getCmsData();
  },
  head: ({ loaderData }) => {
    const site = loaderData?.site || {
      name: "Sophor Code Academy",
      description: { en: "Sophor Code Academy: summer bootcamps in Addis Ababa teaching kids and youth coding, AI, and life skills." }
    };
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: `${site.name} — Ethiopia's Summer Tech Bootcamp` },
        {
          name: "description",
          content: site.description.en
        },
        { name: "author", content: site.name },
        { property: "og:title", content: site.name },
        {
          property: "og:description",
          content: site.description.en
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" }
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,slnt,wdth,wght,ROND@8..144,-10..0,25..150,400..500,0..100&display=swap"
        }
      ]
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$6.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(GsapInit, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "smooth-scroll-wrapper flex min-h-screen flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] })
  ] });
}
const $$splitComponentImporter$5 = () => import("./register-Cl4PmdCf.mjs");
const Route$5 = createFileRoute("/register")({
  loader: async () => {
    return await getCmsData();
  },
  head: ({
    loaderData
  }) => {
    const site = loaderData?.site || {
      name: "Sophor Code Academy"
    };
    return {
      meta: [{
        title: `Register — ${site.name}`
      }, {
        name: "description",
        content: "Reserve your seat in Sophor's summer bootcamps. Quick, secure registration form."
      }, {
        property: "og:title",
        content: `Register — ${site.name}`
      }, {
        property: "og:description",
        content: "Reserve your seat for Sophor's summer bootcamp."
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
object({
  studentName: string().trim().min(2, "Name must be at least 2 characters").max(80).regex(/^[A-Za-zÀ-ÿ' \-]+$/, "Letters, spaces, hyphens only"),
  age: number().int().min(7, "Min age 7").max(25, "Max age 25"),
  grade: string().trim().max(40).optional().or(literal("")),
  parentName: string().trim().min(2).max(80),
  parentPhone: string().trim().min(7, "Enter a valid phone").max(20).regex(/^[0-9+\-\s()]+$/, "Digits and + - ( ) only"),
  parentEmail: string().trim().email("Enter a valid email").max(120),
  bootcamp: string().min(1, "Pick a bootcamp"),
  dietary: string().trim().max(300).optional().or(literal("")),
  consent: literal(true, {
    message: "Parental consent required"
  })
});
const $$splitComponentImporter$4 = () => import("./gallery-BnDfnOD2.mjs");
const Route$4 = createFileRoute("/gallery")({
  loader: async () => {
    const data = await getCmsData();
    const photos = await getPhotos();
    return {
      ...data,
      photos
    };
  },
  head: ({
    loaderData
  }) => {
    const site = loaderData?.site || {
      name: "Sophor Code Academy"
    };
    return {
      meta: [{
        title: `Gallery — ${site.name}`
      }, {
        name: "description",
        content: "Graduation moments, coding classrooms, life-skill sessions, and real-world group projects from Sophor in Addis Ababa."
      }, {
        property: "og:title",
        content: `Gallery — ${site.name}`
      }, {
        property: "og:description",
        content: "A look inside Sophor's bootcamps and graduations."
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./contact-DU_1Hy1g.mjs");
const Route$3 = createFileRoute("/contact")({
  loader: async () => {
    return await getCmsData();
  },
  head: ({
    loaderData
  }) => {
    const site = loaderData?.site || {
      name: "Sophor Code Academy",
      location: {
        en: ""
      }
    };
    return {
      meta: [{
        title: `Contact — ${site.name}`
      }, {
        name: "description",
        content: `Reach Sophor Code Academy in ${site.location.en}. Phone, email, and contact form.`
      }, {
        property: "og:title",
        content: `Contact — ${site.name}`
      }, {
        property: "og:description",
        content: "Get in touch with Sophor Code Academy."
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
object({
  name: string().trim().min(2).max(80).regex(/^[A-Za-zÀ-ÿ' \-]+$/, "Letters, spaces, hyphens only"),
  email: string().trim().email().max(120),
  subject: string().trim().min(2).max(120),
  message: string().trim().min(10, "Tell us a bit more").max(1500)
});
const $$splitComponentImporter$2 = () => import("./bootcamps-CSpYmoi2.mjs");
const Route$2 = createFileRoute("/bootcamps")({
  loader: async () => {
    return await getCmsData();
  },
  head: ({
    loaderData
  }) => {
    const site = loaderData?.site || {
      name: "Sophor Code Academy"
    };
    return {
      meta: [{
        title: `Bootcamps — ${site.name}`
      }, {
        name: "description",
        content: "Explore Sophor's summer bootcamps: Scratch, Web, Python & AI, Mobile, Robotics, and Generative AI tracks for kids and youth."
      }, {
        property: "og:title",
        content: `Bootcamps — ${site.name}`
      }, {
        property: "og:description",
        content: "Filterable list of all Sophor summer bootcamp tracks."
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin-C0hDCvTh.mjs");
const Route$1 = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Admin CMS Control Center — Sophor Code Academy"
    }, {
      name: "description",
      content: "Site content management dashboard."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-wkud_lME.mjs");
const Route = createFileRoute("/")({
  loader: async () => {
    const data = await getCmsData();
    const photos = await getPhotos();
    return {
      ...data,
      photos
    };
  },
  head: ({
    loaderData
  }) => {
    const site = loaderData?.site || {
      name: "Sophor Code Academy",
      description: {
        en: ""
      }
    };
    return {
      meta: [{
        title: `${site.name} — Shaping Minds, Building Futures`
      }, {
        name: "description",
        content: site.description.en
      }, {
        property: "og:title",
        content: site.name
      }, {
        property: "og:description",
        content: site.description.en
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const RegisterRoute = Route$5.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => Route$6
});
const GalleryRoute = Route$4.update({
  id: "/gallery",
  path: "/gallery",
  getParentRoute: () => Route$6
});
const ContactRoute = Route$3.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$6
});
const BootcampsRoute = Route$2.update({
  id: "/bootcamps",
  path: "/bootcamps",
  getParentRoute: () => Route$6
});
const AdminRoute = Route$1.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$6
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$6
});
const rootRouteChildren = {
  IndexRoute,
  AdminRoute,
  BootcampsRoute,
  ContactRoute,
  GalleryRoute,
  RegisterRoute
};
const routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Container as C,
  getPhotos as a,
  uploadPhoto as b,
  cn as c,
  deletePhoto as d,
  gsap as e,
  getCmsData as g,
  initGsap as i,
  router as r,
  saveCmsData as s,
  useTranslation as u
};
