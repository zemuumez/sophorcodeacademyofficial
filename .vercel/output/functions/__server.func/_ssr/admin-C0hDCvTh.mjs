import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { C as Container, g as getCmsData, a as getPhotos, s as saveCmsData, b as uploadPhoto, d as deletePhoto } from "./router-JNb6id3g.mjs";
import { R as Reveal } from "./Reveal-DEDWqFdN.mjs";
import "../_libs/seroval.mjs";
import { f as Lock, S as Settings, B as BookOpen, I as Image, G as Globe, F as FolderOpen, g as Save, h as Plus, i as SquarePen, T as Trash2, X, U as Upload, E as Eye } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/gsap.mjs";
import "./server-pv48Vp7X.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = reactExports.useState(false);
  const [password, setPassword] = reactExports.useState("");
  const [activeTab, setActiveTab] = reactExports.useState("site");
  const [loading, setLoading] = reactExports.useState(true);
  const [siteData, setSiteData] = reactExports.useState(null);
  const [coursesData, setCoursesData] = reactExports.useState(null);
  const [galleryData, setGalleryData] = reactExports.useState(null);
  const [translationsData, setTranslationsData] = reactExports.useState(null);
  const [photosData, setPhotosData] = reactExports.useState({});
  const [selectedPhotoCategory, setSelectedPhotoCategory] = reactExports.useState("graduation");
  const [uploadingPhoto, setUploadingPhoto] = reactExports.useState(false);
  const [editingCourseId, setEditingCourseId] = reactExports.useState(null);
  const [courseForm, setCourseForm] = reactExports.useState(null);
  const [testimonialForm, setTestimonialForm] = reactExports.useState({
    name: "",
    role_en: "",
    role_am: "",
    quote_en: "",
    quote_am: ""
  });
  const [galleryForm, setGalleryForm] = reactExports.useState({
    title_en: "",
    title_am: "",
    category: "Graduation",
    src: ""
  });
  const fetchData = async () => {
    try {
      setLoading(true);
      const cmsData = await getCmsData();
      setSiteData(cmsData.site);
      setCoursesData(cmsData.courses);
      setGalleryData(cmsData.gallery);
      setTranslationsData(cmsData.translations);
      const photos = await getPhotos();
      setPhotosData(photos);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load CMS data");
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    const auth = sessionStorage.getItem("sophor_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);
  reactExports.useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
      sessionStorage.setItem("sophor_admin_auth", "true");
      toast.success("Successfully logged into Sophor CMS Console");
    } else {
      toast.error("Invalid passcode. Please try again.");
    }
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("sophor_admin_auth");
    toast.success("Logged out successfully");
  };
  const handleSaveData = async (type, data) => {
    try {
      await saveCmsData({
        data: {
          type,
          data
        }
      });
      toast.success(`Saved ${type} content successfully`);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error(`Failed to save ${type} content`);
    }
  };
  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingPhoto(true);
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result;
        const result = await uploadPhoto({
          data: {
            category: selectedPhotoCategory,
            filename: file.name,
            base64Data
          }
        });
        if (result.success) {
          toast.success("Uploaded photo successfully");
          const photos = await getPhotos();
          setPhotosData(photos);
        } else {
          toast.error("Failed to upload photo");
        }
        setUploadingPhoto(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload photo");
      setUploadingPhoto(false);
    }
  };
  const handlePhotoDelete = async (photoUrl) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;
    try {
      const result = await deletePhoto({
        data: {
          photoUrl
        }
      });
      if (result.success) {
        toast.success("Deleted photo successfully");
        const photos = await getPhotos();
        setPhotosData(photos);
      } else {
        toast.error("Failed to delete photo");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete photo");
    }
  };
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hero-dark flex min-h-[85vh] items-center justify-center py-20 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 24 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 text-2xl font-bold tracking-tight text-white", children: "Sophor Console Gate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-[var(--grey-50)]/70", children: "Enter passcode to unlock admin CMS control center." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "mt-8 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Passcode (Default: admin123)", className: "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/20 focus:outline-none" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[var(--grey-1200)] transition hover:bg-[var(--grey-50)] cursor-pointer", children: "Unlock Console" })
      ] })
    ] }) });
  }
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[70vh] items-center justify-center bg-[var(--grey-10)] text-[var(--grey-1200)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-solid border-[var(--grey-1200)] border-t-transparent mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm font-medium", children: "Loading Sophor CMS Panel..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-[var(--grey-15)] py-12 text-[var(--grey-1200)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Container, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-[var(--border)] pb-6 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-medium tracking-tight", children: "Sophor Admin CMS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[var(--grey-800)] mt-1", children: "Live edit your site details, courses, galleries, photos, and translations." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleLogout, className: "agy-btn border border-[var(--border)] bg-[var(--grey-0)] hover:bg-[var(--grey-15)] px-4 py-2 text-[13px] self-start", children: "Lock Console" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-[250px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "space-y-1.5", children: [{
        id: "site",
        label: "Site Config",
        icon: Settings
      }, {
        id: "courses",
        label: "Courses & Skills",
        icon: BookOpen
      }, {
        id: "gallery",
        label: "Gallery & Quotes",
        icon: Image
      }, {
        id: "translations",
        label: "Translations Grid",
        icon: Globe
      }, {
        id: "photos",
        label: "Photo Files Manager",
        icon: FolderOpen
      }].map((tab) => {
        const Icon = tab.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab(tab.id), className: cn("flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition cursor-pointer text-left", activeTab === tab.id ? "bg-[var(--grey-1200)] text-[var(--grey-10)] shadow" : "text-[var(--grey-800)] hover:bg-[var(--grey-20)] hover:text-[var(--grey-1200)]"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16 }),
          tab.label
        ] }, tab.id);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-6 sm:p-8 shadow-sm", children: [
        activeTab === "site" && siteData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-medium", children: "Site Configuration" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Edit general metadata, location info, and contact properties." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase", children: "Academy Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: siteData.name, onChange: (e) => setSiteData({
                ...siteData,
                name: e.target.value
              }), className: "w-full rounded-xl border border-border px-4 py-2.5 text-sm" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase", children: "Short Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: siteData.short, onChange: (e) => setSiteData({
                ...siteData,
                short: e.target.value
              }), className: "w-full rounded-xl border border-border px-4 py-2.5 text-sm" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 rounded-xl border border-border bg-[var(--grey-15)] p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-[var(--grey-1200)]", children: "Localized Tagline" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "English" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: siteData.tagline.en, onChange: (e) => setSiteData({
                  ...siteData,
                  tagline: {
                    ...siteData.tagline,
                    en: e.target.value
                  }
                }), className: "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Amharic" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: siteData.tagline.am, onChange: (e) => setSiteData({
                  ...siteData,
                  tagline: {
                    ...siteData.tagline,
                    am: e.target.value
                  }
                }), className: "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 rounded-xl border border-border bg-[var(--grey-15)] p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-[var(--grey-1200)]", children: "Localized Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "English" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: siteData.description.en, onChange: (e) => setSiteData({
                  ...siteData,
                  description: {
                    ...siteData.description,
                    en: e.target.value
                  }
                }), rows: 3, className: "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Amharic" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: siteData.description.am, onChange: (e) => setSiteData({
                  ...siteData,
                  description: {
                    ...siteData.description,
                    am: e.target.value
                  }
                }), rows: 3, className: "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase", children: "Phone Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: siteData.phone, onChange: (e) => setSiteData({
                ...siteData,
                phone: e.target.value
              }), className: "w-full rounded-xl border border-border px-4 py-2.5 text-sm" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-semibold text-muted-foreground uppercase", children: "Email Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: siteData.email, onChange: (e) => setSiteData({
                ...siteData,
                email: e.target.value
              }), className: "w-full rounded-xl border border-border px-4 py-2.5 text-sm" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 rounded-xl border border-border bg-[var(--grey-15)] p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-[var(--grey-1200)]", children: "Localized Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "English" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: siteData.address.en, onChange: (e) => setSiteData({
                  ...siteData,
                  address: {
                    ...siteData.address,
                    en: e.target.value
                  }
                }), className: "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Amharic" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: siteData.address.am, onChange: (e) => setSiteData({
                  ...siteData,
                  address: {
                    ...siteData.address,
                    am: e.target.value
                  }
                }), className: "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 rounded-xl border border-border bg-[var(--grey-15)] p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-[var(--grey-1200)]", children: "Localized Hours" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "English" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: siteData.hours.en, onChange: (e) => setSiteData({
                  ...siteData,
                  hours: {
                    ...siteData.hours,
                    en: e.target.value
                  }
                }), className: "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Amharic" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: siteData.hours.am, onChange: (e) => setSiteData({
                  ...siteData,
                  hours: {
                    ...siteData.hours,
                    am: e.target.value
                  }
                }), className: "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 rounded-xl border border-border bg-[var(--grey-15)] p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-[var(--grey-1200)]", children: "Social Channels" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Telegram" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: siteData.social.telegram, onChange: (e) => setSiteData({
                  ...siteData,
                  social: {
                    ...siteData.social,
                    telegram: e.target.value
                  }
                }), className: "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Instagram" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: siteData.social.instagram, onChange: (e) => setSiteData({
                  ...siteData,
                  social: {
                    ...siteData.social,
                    instagram: e.target.value
                  }
                }), className: "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "YouTube" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: siteData.social.youtube, onChange: (e) => setSiteData({
                  ...siteData,
                  social: {
                    ...siteData.social,
                    youtube: e.target.value
                  }
                }), className: "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleSaveData("site", siteData), className: "agy-btn agy-btn-primary flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 16 }),
            " Save Changes"
          ] })
        ] }),
        activeTab === "courses" && coursesData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border pb-4 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-medium", children: "Bootcamp Courses" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Configure Sophor summer course list, ages, tools, outcomes, and badges." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                const newCourse = {
                  id: `course-${Date.now()}`,
                  title: {
                    en: "New Course",
                    am: "አዲስ ቡትካምፕ"
                  },
                  ageGroup: "Kids",
                  track: "Fundamentals",
                  ageRange: {
                    en: "Ages 8-12",
                    am: "ከ 8-12 ዓመት"
                  },
                  duration: {
                    en: "4 weeks · 3 days/week",
                    am: "4 ሳምንታት · በሳምንት 3 ቀናት"
                  },
                  tools: ["Vite", "React"],
                  outcomes: {
                    en: ["Demo MVP"],
                    am: ["ማሳያ መተግበሪያ"]
                  },
                  badge: {
                    en: "Tech Wizard",
                    am: "የቴክ ጠቢብ"
                  },
                  accent: "green"
                };
                const updated = [...coursesData.courses, newCourse];
                setCoursesData({
                  ...coursesData,
                  courses: updated
                });
                handleSaveData("courses", {
                  ...coursesData,
                  courses: updated
                });
              }, className: "agy-btn bg-[var(--grey-1200)] text-[var(--grey-10)] hover:bg-[var(--grey-900)] text-xs flex items-center gap-1.5 px-3 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
                " Add Course"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2", children: coursesData.courses.map((course, courseIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-[var(--grey-15)] p-5 relative flex flex-col justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-block rounded-full bg-white/80 border border-border px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground uppercase", children: [
                    course.ageGroup,
                    " · ",
                    course.track
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 text-lg font-medium", children: course.title.en }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: course.title.am })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                    setEditingCourseId(course.id);
                    setCourseForm({
                      ...course
                    });
                  }, className: "rounded-lg p-1.5 bg-white text-[var(--grey-800)] hover:text-black border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { size: 14 }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                    if (!confirm(`Delete ${course.title.en}?`)) return;
                    const updated = coursesData.courses.filter((c) => c.id !== course.id);
                    setCoursesData({
                      ...coursesData,
                      courses: updated
                    });
                    handleSaveData("courses", {
                      ...coursesData,
                      courses: updated
                    });
                  }, className: "rounded-lg p-1.5 bg-white text-destructive hover:bg-destructive/10 border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-2 gap-2 text-xs border-t border-border/60 pt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-muted-foreground", children: "Age Range:" }),
                  " ",
                  course.ageRange.en
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-muted-foreground", children: "Duration:" }),
                  " ",
                  course.duration.en
                ] })
              ] })
            ] }) }, course.id)) })
          ] }),
          editingCourseId && courseForm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-2xl rounded-2xl bg-white border border-border p-6 shadow-2xl text-sm text-[var(--grey-1200)] relative max-h-[90vh] overflow-y-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditingCourseId(null), className: "absolute right-4 top-4 rounded-full p-1.5 hover:bg-secondary text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold border-b border-border pb-3 mb-5", children: "Edit Bootcamp Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Title (English)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: courseForm.title.en, onChange: (e) => setCourseForm({
                    ...courseForm,
                    title: {
                      ...courseForm.title,
                      en: e.target.value
                    }
                  }), className: "w-full rounded-lg border border-border px-3 py-2" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Title (Amharic)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: courseForm.title.am, onChange: (e) => setCourseForm({
                    ...courseForm,
                    title: {
                      ...courseForm.title,
                      am: e.target.value
                    }
                  }), className: "w-full rounded-lg border border-border px-3 py-2" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Age Group" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: courseForm.ageGroup, onChange: (e) => setCourseForm({
                    ...courseForm,
                    ageGroup: e.target.value
                  }), className: "w-full rounded-lg border border-border px-3 py-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Kids", children: "Kids" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Teens", children: "Teens" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Youth", children: "Youth" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Track" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: courseForm.track, onChange: (e) => setCourseForm({
                    ...courseForm,
                    track: e.target.value
                  }), className: "w-full rounded-lg border border-border px-3 py-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Fundamentals", children: "Fundamentals" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Web", children: "Web" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "AI", children: "AI" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Mobile", children: "Mobile" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Robotics", children: "Robotics" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Age Range (English)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: courseForm.ageRange.en, onChange: (e) => setCourseForm({
                    ...courseForm,
                    ageRange: {
                      ...courseForm.ageRange,
                      en: e.target.value
                    }
                  }), className: "w-full rounded-lg border border-border px-3 py-2" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Age Range (Amharic)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: courseForm.ageRange.am, onChange: (e) => setCourseForm({
                    ...courseForm,
                    ageRange: {
                      ...courseForm.ageRange,
                      am: e.target.value
                    }
                  }), className: "w-full rounded-lg border border-border px-3 py-2" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Duration (English)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: courseForm.duration.en, onChange: (e) => setCourseForm({
                    ...courseForm,
                    duration: {
                      ...courseForm.duration,
                      en: e.target.value
                    }
                  }), className: "w-full rounded-lg border border-border px-3 py-2" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Duration (Amharic)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: courseForm.duration.am, onChange: (e) => setCourseForm({
                    ...courseForm,
                    duration: {
                      ...courseForm.duration,
                      am: e.target.value
                    }
                  }), className: "w-full rounded-lg border border-border px-3 py-2" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Badge Earned (English)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: courseForm.badge.en, onChange: (e) => setCourseForm({
                    ...courseForm,
                    badge: {
                      ...courseForm.badge,
                      en: e.target.value
                    }
                  }), className: "w-full rounded-lg border border-border px-3 py-2" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Badge Earned (Amharic)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: courseForm.badge.am, onChange: (e) => setCourseForm({
                    ...courseForm,
                    badge: {
                      ...courseForm.badge,
                      am: e.target.value
                    }
                  }), className: "w-full rounded-lg border border-border px-3 py-2" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Accent Accent Color" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: courseForm.accent, onChange: (e) => setCourseForm({
                    ...courseForm,
                    accent: e.target.value
                  }), className: "w-full rounded-lg border border-border px-3 py-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "green", children: "Green" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "gold", children: "Gold" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "red", children: "Red" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-bold text-muted-foreground", children: "Tools Used (comma separated)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: courseForm.tools.join(", "), onChange: (e) => setCourseForm({
                    ...courseForm,
                    tools: e.target.value.split(",").map((t) => t.trim())
                  }), className: "w-full rounded-lg border border-border px-3 py-2" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 rounded-xl border border-border bg-[var(--grey-15)] p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold", children: "Outcomes list" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Outcomes (EN, comma sep)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: courseForm.outcomes.en.join(", "), onChange: (e) => setCourseForm({
                      ...courseForm,
                      outcomes: {
                        ...courseForm.outcomes,
                        en: e.target.value.split(",").map((t) => t.trim())
                      }
                    }), className: "w-full rounded-lg border border-border bg-white px-3 py-2" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Outcomes (AM, comma sep)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: courseForm.outcomes.am.join(", "), onChange: (e) => setCourseForm({
                      ...courseForm,
                      outcomes: {
                        ...courseForm.outcomes,
                        am: e.target.value.split(",").map((t) => t.trim())
                      }
                    }), className: "w-full rounded-lg border border-border bg-white px-3 py-2" })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-end gap-3 border-t border-border pt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditingCourseId(null), className: "agy-btn border border-border hover:bg-secondary px-4 py-2", children: "Cancel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                const updated = coursesData.courses.map((c) => c.id === courseForm.id ? courseForm : c);
                setCoursesData({
                  ...coursesData,
                  courses: updated
                });
                handleSaveData("courses", {
                  ...coursesData,
                  courses: updated
                });
                setEditingCourseId(null);
              }, className: "agy-btn agy-btn-primary px-4 py-2", children: "Save Course" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/80 pt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium mb-4", children: "Core Life Skills" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: coursesData.life_skills.map((skill, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-4 bg-[var(--grey-15)] space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-muted-foreground", children: "Icon Symbol:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: skill.icon, onChange: (e) => {
                  const updated = [...coursesData.life_skills];
                  updated[idx].icon = e.target.value;
                  setCoursesData({
                    ...coursesData,
                    life_skills: updated
                  });
                }, className: "rounded-lg border border-border bg-white px-2 py-1 text-xs w-28" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Title & Description (EN)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: skill.title.en, onChange: (e) => {
                    const updated = [...coursesData.life_skills];
                    updated[idx].title.en = e.target.value;
                    setCoursesData({
                      ...coursesData,
                      life_skills: updated
                    });
                  }, className: "w-full rounded-lg border border-border bg-white px-3 py-1.5 text-xs" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: skill.desc.en, onChange: (e) => {
                    const updated = [...coursesData.life_skills];
                    updated[idx].desc.en = e.target.value;
                    setCoursesData({
                      ...coursesData,
                      life_skills: updated
                    });
                  }, rows: 2, className: "w-full rounded-lg border border-border bg-white px-3 py-1.5 text-xs mt-1" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[10px] font-bold text-muted-foreground", children: "Title & Description (AM)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: skill.title.am, onChange: (e) => {
                    const updated = [...coursesData.life_skills];
                    updated[idx].title.am = e.target.value;
                    setCoursesData({
                      ...coursesData,
                      life_skills: updated
                    });
                  }, className: "w-full rounded-lg border border-border bg-white px-3 py-1.5 text-xs" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: skill.desc.am, onChange: (e) => {
                    const updated = [...coursesData.life_skills];
                    updated[idx].desc.am = e.target.value;
                    setCoursesData({
                      ...coursesData,
                      life_skills: updated
                    });
                  }, rows: 2, className: "w-full rounded-lg border border-border bg-white px-3 py-1.5 text-xs mt-1" })
                ] })
              ] })
            ] }, idx)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleSaveData("courses", coursesData), className: "agy-btn agy-btn-primary flex items-center gap-2 mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 16 }),
              " Save Core Skills"
            ] })
          ] })
        ] }),
        activeTab === "gallery" && galleryData && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between pb-3 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium", children: "Testimonials" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 rounded-xl border border-border p-4 bg-[var(--grey-15)] mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: "Add New Testimonial" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-bold text-muted-foreground", children: "Author Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Sara T.", value: testimonialForm.name, onChange: (e) => setTestimonialForm({
                    ...testimonialForm,
                    name: e.target.value
                  }), className: "w-full rounded-lg border border-border bg-white px-3 py-2" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-bold text-muted-foreground", children: "Author Role (English)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Parent, Bole", value: testimonialForm.role_en, onChange: (e) => setTestimonialForm({
                    ...testimonialForm,
                    role_en: e.target.value
                  }), className: "w-full rounded-lg border border-border bg-white px-3 py-2" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-bold text-muted-foreground", children: "Author Role (Amharic)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "ወላጅ፣ ቦሌ", value: testimonialForm.role_am, onChange: (e) => setTestimonialForm({
                    ...testimonialForm,
                    role_am: e.target.value
                  }), className: "w-full rounded-lg border border-border bg-white px-3 py-2" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-bold text-muted-foreground", children: "Quote (English)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: testimonialForm.quote_en, onChange: (e) => setTestimonialForm({
                    ...testimonialForm,
                    quote_en: e.target.value
                  }), rows: 2, className: "w-full rounded-lg border border-border bg-white px-3 py-2" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-bold text-muted-foreground", children: "Quote (Amharic)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: testimonialForm.quote_am, onChange: (e) => setTestimonialForm({
                    ...testimonialForm,
                    quote_am: e.target.value
                  }), rows: 2, className: "w-full rounded-lg border border-border bg-white px-3 py-2" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                if (!testimonialForm.name || !testimonialForm.quote_en) {
                  toast.error("Author name and quote are required");
                  return;
                }
                const newQuote = {
                  name: testimonialForm.name,
                  role: {
                    en: testimonialForm.role_en,
                    am: testimonialForm.role_am || testimonialForm.role_en
                  },
                  quote: {
                    en: testimonialForm.quote_en,
                    am: testimonialForm.quote_am || testimonialForm.quote_en
                  }
                };
                const updated = [...galleryData.testimonials, newQuote];
                setGalleryData({
                  ...galleryData,
                  testimonials: updated
                });
                handleSaveData("gallery", {
                  ...galleryData,
                  testimonials: updated
                });
                setTestimonialForm({
                  name: "",
                  role_en: "",
                  role_am: "",
                  quote_en: "",
                  quote_am: ""
                });
              }, className: "agy-btn agy-btn-primary flex items-center gap-1.5 text-xs px-3 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
                " Add Testimonial"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: galleryData.testimonials.map((testimonial, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-[var(--grey-15)] p-4 flex justify-between items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold", children: [
                testimonial.name,
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-normal", children: [
                  "(",
                  testimonial.role.en,
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground italic mt-1 font-medium", children: [
                '"',
                testimonial.quote.en,
                '"'
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground italic mt-0.5", children: [
                '"',
                testimonial.quote.am,
                '"'
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              const updated = galleryData.testimonials.filter((_, i) => i !== idx);
              setGalleryData({
                ...galleryData,
                testimonials: updated
              });
              handleSaveData("gallery", {
                ...galleryData,
                testimonials: updated
              });
            }, className: "p-1.5 rounded-lg bg-white border border-border text-destructive hover:bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 }) })
          ] }, idx)) })
        ] }) }),
        activeTab === "translations" && translationsData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-medium", children: "Static UI Translations Grid" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Edit all layout headers, labels, placeholders, and dynamic UI elements." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 max-h-[500px] overflow-y-auto border border-border rounded-xl p-4", children: Object.keys(translationsData.en).map((key) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border-b border-border last:border-b-0 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs font-bold text-[var(--grey-800)]", children: key }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-muted-foreground", children: "English:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: translationsData.en[key], onChange: (e) => {
                  const updated = {
                    ...translationsData
                  };
                  updated.en[key] = e.target.value;
                  setTranslationsData(updated);
                }, rows: 1, className: "w-full rounded border border-border bg-white px-2 py-1" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-muted-foreground", children: "Amharic:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: translationsData.am[key], onChange: (e) => {
                  const updated = {
                    ...translationsData
                  };
                  updated.am[key] = e.target.value;
                  setTranslationsData(updated);
                }, rows: 1, className: "w-full rounded border border-border bg-white px-2 py-1" })
              ] })
            ] })
          ] }, key)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleSaveData("translations", translationsData), className: "agy-btn agy-btn-primary flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 16 }),
            " Save Translations"
          ] })
        ] }),
        activeTab === "photos" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-medium", children: "Photo Files Manager" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Upload photos directly into separate folders based on categories like classroom, graduation, projects." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ["graduation", "classroom", "life_skills", "projects", "avatars", "hero", "general", "slideshow", "teachers", "persons"].map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelectedPhotoCategory(cat), className: cn("rounded-full px-3.5 py-1.5 text-xs font-semibold border transition cursor-pointer", selectedPhotoCategory === cat ? "bg-[var(--grey-1200)] text-[var(--grey-10)] border-[var(--grey-1200)]" : "bg-white text-[var(--grey-800)] border-[var(--border)] hover:bg-[var(--grey-15)]"), children: cat.replace("_", " ") }, cat)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-2 border-dashed border-border rounded-xl p-8 text-center bg-[var(--grey-15)] flex flex-col items-center justify-center relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 32, className: "text-muted-foreground mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: "Upload New Photo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1 max-w-xs", children: [
              "Choose a local photo. It will save directly into ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                "public/content/photos/",
                selectedPhotoCategory,
                "/"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", id: "photo-uploader", className: "absolute inset-0 opacity-0 cursor-pointer", onChange: handlePhotoUpload, disabled: uploadingPhoto }),
            uploadingPhoto && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-white/80 flex items-center justify-center rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold animate-pulse text-[var(--grey-1200)]", children: "Uploading to filesystem..." }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-bold text-muted-foreground uppercase tracking-wide mb-3", children: [
              "Photos in this folder (",
              photosData[selectedPhotoCategory]?.length || 0,
              ")"
            ] }),
            !photosData[selectedPhotoCategory] || photosData[selectedPhotoCategory].length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground py-6 text-center border border-border rounded-lg bg-[var(--grey-15)]", children: "No photos in this folder. Upload one above!" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-[500px] overflow-y-auto p-2 border border-border rounded-xl bg-[var(--grey-15)]", children: photosData[selectedPhotoCategory].map((src) => {
              const filename = src.split("/").pop() || "";
              const titleObj = galleryData?.photo_titles?.[src] || {
                en: "",
                am: ""
              };
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-xl border border-border bg-white p-3 shadow-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-[var(--grey-15)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: "", className: "h-full w-full object-cover" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-1 w-full", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-mono text-[var(--grey-800)] truncate", title: src, children: filename }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[9px] font-bold uppercase text-muted-foreground block mb-0.5", children: "Title (EN)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: titleObj.en || "", onChange: (e) => {
                        const updatedTitles = {
                          ...galleryData?.photo_titles || {},
                          [src]: {
                            ...titleObj,
                            en: e.target.value
                          }
                        };
                        setGalleryData({
                          ...galleryData,
                          photo_titles: updatedTitles
                        });
                      }, placeholder: "e.g. Cohort 03 Graduation", className: "w-full rounded border border-border px-2 py-1 text-xs" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[9px] font-bold uppercase text-muted-foreground block mb-0.5", children: "Title (AM)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: titleObj.am || "", onChange: (e) => {
                        const updatedTitles = {
                          ...galleryData?.photo_titles || {},
                          [src]: {
                            ...titleObj,
                            am: e.target.value
                          }
                        };
                        setGalleryData({
                          ...galleryData,
                          photo_titles: updatedTitles
                        });
                      }, placeholder: "e.g. የኮሆርት 03 ምረቃ", className: "w-full rounded border border-border px-2 py-1 text-xs" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5 self-end sm:self-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                    navigator.clipboard.writeText(src);
                    toast.success("Copied image URL to clipboard!");
                  }, className: "p-2 rounded-lg bg-[var(--grey-15)] hover:bg-[var(--grey-25)] text-xs border border-border flex items-center justify-center cursor-pointer", title: "Copy relative path", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 13 }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handlePhotoDelete(src), className: "p-2 rounded-lg bg-[var(--grey-15)] hover:bg-destructive/10 border border-border text-destructive flex items-center justify-center cursor-pointer", title: "Delete photo", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 }) })
                ] })
              ] }, src);
            }) }),
            photosData[selectedPhotoCategory]?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleSaveData("gallery", galleryData), className: "agy-btn agy-btn-primary flex items-center gap-2 mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 16 }),
              " Save Custom Titles"
            ] })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  AdminPage as component
};
