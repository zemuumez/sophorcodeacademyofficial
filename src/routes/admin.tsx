import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Lock,
  Unlock,
  Settings,
  BookOpen,
  Image as ImageIcon,
  MessageSquare,
  Globe,
  Plus,
  Trash2,
  Edit,
  Save,
  Upload,
  X,
  ChevronRight,
  FolderOpen,
  Eye,
} from "lucide-react";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import {
  getCmsData,
  saveCmsData,
  getPhotos,
  uploadPhoto,
  deletePhoto,
} from "@/lib/api/cms.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin CMS Control Center — Sophor Code Academy" },
      { name: "description", content: "Site content management dashboard." },
    ],
  }),
  component: AdminPage,
});

type Tab = "site" | "courses" | "gallery" | "translations" | "photos";

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("site");
  const [loading, setLoading] = useState(true);

  // Content states
  const [siteData, setSiteData] = useState<any>(null);
  const [coursesData, setCoursesData] = useState<any>(null);
  const [galleryData, setGalleryData] = useState<any>(null);
  const [translationsData, setTranslationsData] = useState<any>(null);

  // Photos state
  const [photosData, setPhotosData] = useState<Record<string, string[]>>({});
  const [selectedPhotoCategory, setSelectedPhotoCategory] = useState("graduation");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // Course editing states
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [courseForm, setCourseForm] = useState<any>(null);

  // Testimonial editing states
  const [testimonialForm, setTestimonialForm] = useState<any>({ name: "", role_en: "", role_am: "", quote_en: "", quote_am: "" });

  // Gallery item editing state
  const [galleryForm, setGalleryForm] = useState<any>({ title_en: "", title_am: "", category: "Graduation", src: "" });

  // Fetch all CMS data
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

  useEffect(() => {
    // Check if previously logged in (simple session storage)
    const auth = sessionStorage.getItem("sophor_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
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

  // Generic Save JSON Data
  const handleSaveData = async (type: Tab, data: any) => {
    try {
      await saveCmsData({ data: { type, data } });
      toast.success(`Saved ${type} content successfully`);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error(`Failed to save ${type} content`);
    }
  };

  // Photo Upload Handler
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingPhoto(true);
      const reader = new FileReader();
      
      reader.onload = async () => {
        const base64Data = reader.result as string;
        const result = await uploadPhoto({
          data: {
            category: selectedPhotoCategory,
            filename: file.name,
            base64Data,
          },
        });
        
        if (result.success) {
          toast.success("Uploaded photo successfully");
          // Refresh photos
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

  // Photo Delete Handler
  const handlePhotoDelete = async (photoUrl: string) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;

    try {
      const result = await deletePhoto({ data: { photoUrl } });
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

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="hero-dark flex min-h-[85vh] items-center justify-center py-20 px-4">
        <Reveal className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white">
              <Lock size={24} />
            </div>
            <h1 className="mt-5 text-2xl font-bold tracking-tight text-white">Sophor Console Gate</h1>
            <p className="mt-2 text-sm text-[var(--grey-50)]/70">
              Enter passcode to unlock admin CMS control center.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Passcode (Default: admin123)"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/20 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[var(--grey-1200)] transition hover:bg-[var(--grey-50)] cursor-pointer"
            >
              Unlock Console
            </button>
          </form>
        </Reveal>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[var(--grey-10)] text-[var(--grey-1200)]">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-[var(--grey-1200)] border-t-transparent mx-auto"></div>
          <p className="mt-4 text-sm font-medium">Loading Sophor CMS Panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--grey-15)] py-12 text-[var(--grey-1200)]">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-[var(--border)] pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-medium tracking-tight">Sophor Admin CMS</h1>
            <p className="text-sm text-[var(--grey-800)] mt-1">
              Live edit your site details, courses, galleries, photos, and translations.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="agy-btn border border-[var(--border)] bg-[var(--grey-0)] hover:bg-[var(--grey-15)] px-4 py-2 text-[13px] self-start"
          >
            Lock Console
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
          {/* SIDE NAVIGATION */}
          <aside className="space-y-1.5">
            {[
              { id: "site", label: "Site Config", icon: Settings },
              { id: "courses", label: "Courses & Skills", icon: BookOpen },
              { id: "gallery", label: "Gallery & Quotes", icon: ImageIcon },
              { id: "translations", label: "Translations Grid", icon: Globe },
              { id: "photos", label: "Photo Files Manager", icon: FolderOpen },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition cursor-pointer text-left",
                    activeTab === tab.id
                      ? "bg-[var(--grey-1200)] text-[var(--grey-10)] shadow"
                      : "text-[var(--grey-800)] hover:bg-[var(--grey-20)] hover:text-[var(--grey-1200)]"
                  )}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </aside>

          {/* MAIN CMS CONTENT EDITOR */}
          <main className="rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-6 sm:p-8 shadow-sm">
            {/* SITE CONFIG EDIT */}
            {activeTab === "site" && siteData && (
              <div className="space-y-6">
                <div className="border-b border-border pb-4">
                  <h2 className="text-xl font-medium">Site Configuration</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Edit general metadata, location info, and contact properties.</p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Academy Name</label>
                    <input
                      type="text"
                      value={siteData.name}
                      onChange={(e) => setSiteData({ ...siteData, name: e.target.value })}
                      className="w-full rounded-xl border border-border px-4 py-2.5 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Short Name</label>
                    <input
                      type="text"
                      value={siteData.short}
                      onChange={(e) => setSiteData({ ...siteData, short: e.target.value })}
                      className="w-full rounded-xl border border-border px-4 py-2.5 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-4 rounded-xl border border-border bg-[var(--grey-15)] p-4">
                  <h3 className="text-sm font-medium text-[var(--grey-1200)]">Localized Tagline</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground">English</label>
                      <input
                        type="text"
                        value={siteData.tagline.en}
                        onChange={(e) => setSiteData({ ...siteData, tagline: { ...siteData.tagline, en: e.target.value } })}
                        className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground">Amharic</label>
                      <input
                        type="text"
                        value={siteData.tagline.am}
                        onChange={(e) => setSiteData({ ...siteData, tagline: { ...siteData.tagline, am: e.target.value } })}
                        className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 rounded-xl border border-border bg-[var(--grey-15)] p-4">
                  <h3 className="text-sm font-medium text-[var(--grey-1200)]">Localized Description</h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground">English</label>
                      <textarea
                        value={siteData.description.en}
                        onChange={(e) => setSiteData({ ...siteData, description: { ...siteData.description, en: e.target.value } })}
                        rows={3}
                        className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground">Amharic</label>
                      <textarea
                        value={siteData.description.am}
                        onChange={(e) => setSiteData({ ...siteData, description: { ...siteData.description, am: e.target.value } })}
                        rows={3}
                        className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Phone Number</label>
                    <input
                      type="text"
                      value={siteData.phone}
                      onChange={(e) => setSiteData({ ...siteData, phone: e.target.value })}
                      className="w-full rounded-xl border border-border px-4 py-2.5 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase">Email Address</label>
                    <input
                      type="email"
                      value={siteData.email}
                      onChange={(e) => setSiteData({ ...siteData, email: e.target.value })}
                      className="w-full rounded-xl border border-border px-4 py-2.5 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-4 rounded-xl border border-border bg-[var(--grey-15)] p-4">
                  <h3 className="text-sm font-medium text-[var(--grey-1200)]">Localized Address</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground">English</label>
                      <input
                        type="text"
                        value={siteData.address.en}
                        onChange={(e) => setSiteData({ ...siteData, address: { ...siteData.address, en: e.target.value } })}
                        className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground">Amharic</label>
                      <input
                        type="text"
                        value={siteData.address.am}
                        onChange={(e) => setSiteData({ ...siteData, address: { ...siteData.address, am: e.target.value } })}
                        className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 rounded-xl border border-border bg-[var(--grey-15)] p-4">
                  <h3 className="text-sm font-medium text-[var(--grey-1200)]">Localized Hours</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground">English</label>
                      <input
                        type="text"
                        value={siteData.hours.en}
                        onChange={(e) => setSiteData({ ...siteData, hours: { ...siteData.hours, en: e.target.value } })}
                        className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground">Amharic</label>
                      <input
                        type="text"
                        value={siteData.hours.am}
                        onChange={(e) => setSiteData({ ...siteData, hours: { ...siteData.hours, am: e.target.value } })}
                        className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 rounded-xl border border-border bg-[var(--grey-15)] p-4">
                  <h3 className="text-sm font-medium text-[var(--grey-1200)]">Social Channels</h3>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground">Telegram</label>
                      <input
                        type="text"
                        value={siteData.social.telegram}
                        onChange={(e) => setSiteData({ ...siteData, social: { ...siteData.social, telegram: e.target.value } })}
                        className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground">Instagram</label>
                      <input
                        type="text"
                        value={siteData.social.instagram}
                        onChange={(e) => setSiteData({ ...siteData, social: { ...siteData.social, instagram: e.target.value } })}
                        className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground">YouTube</label>
                      <input
                        type="text"
                        value={siteData.social.youtube}
                        onChange={(e) => setSiteData({ ...siteData, social: { ...siteData.social, youtube: e.target.value } })}
                        className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleSaveData("site", siteData)}
                  className="agy-btn agy-btn-primary flex items-center gap-2"
                >
                  <Save size={16} /> Save Changes
                </button>
              </div>
            )}

            {/* COURSES & SKILLS EDIT */}
            {activeTab === "courses" && coursesData && (
              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
                    <div>
                      <h2 className="text-xl font-medium">Bootcamp Courses</h2>
                      <p className="text-xs text-muted-foreground mt-0.5">Configure Sophor summer course list, ages, tools, outcomes, and badges.</p>
                    </div>
                    <button
                      onClick={() => {
                        const newCourse = {
                          id: `course-${Date.now()}`,
                          title: { en: "New Course", am: "አዲስ ቡትካምፕ" },
                          ageGroup: "Kids",
                          track: "Fundamentals",
                          ageRange: { en: "Ages 8-12", am: "ከ 8-12 ዓመት" },
                          duration: { en: "4 weeks · 3 days/week", am: "4 ሳምንታት · በሳምንት 3 ቀናት" },
                          tools: ["Vite", "React"],
                          outcomes: { en: ["Demo MVP"], am: ["ማሳያ መተግበሪያ"] },
                          badge: { en: "Tech Wizard", am: "የቴክ ጠቢብ" },
                          accent: "green",
                        };
                        const updated = [...coursesData.courses, newCourse];
                        setCoursesData({ ...coursesData, courses: updated });
                        handleSaveData("courses", { ...coursesData, courses: updated });
                      }}
                      className="agy-btn bg-[var(--grey-1200)] text-[var(--grey-10)] hover:bg-[var(--grey-900)] text-xs flex items-center gap-1.5 px-3 py-2"
                    >
                      <Plus size={14} /> Add Course
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {coursesData.courses.map((course: any, courseIdx: number) => (
                      <div
                        key={course.id}
                        className="rounded-xl border border-border bg-[var(--grey-15)] p-5 relative flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="inline-block rounded-full bg-white/80 border border-border px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground uppercase">
                                {course.ageGroup} · {course.track}
                              </span>
                              <h3 className="mt-2 text-lg font-medium">{course.title.en}</h3>
                              <p className="text-xs text-muted-foreground">{course.title.am}</p>
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => {
                                  setEditingCourseId(course.id);
                                  setCourseForm({ ...course });
                                }}
                                className="rounded-lg p-1.5 bg-white text-[var(--grey-800)] hover:text-black border border-border"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={() => {
                                  if (!confirm(`Delete ${course.title.en}?`)) return;
                                  const updated = coursesData.courses.filter((c: any) => c.id !== course.id);
                                  setCoursesData({ ...coursesData, courses: updated });
                                  handleSaveData("courses", { ...coursesData, courses: updated });
                                }}
                                className="rounded-lg p-1.5 bg-white text-destructive hover:bg-destructive/10 border border-border"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                          <div className="mt-4 grid grid-cols-2 gap-2 text-xs border-t border-border/60 pt-3">
                            <div>
                              <span className="font-semibold text-muted-foreground">Age Range:</span> {course.ageRange.en}
                            </div>
                            <div>
                              <span className="font-semibold text-muted-foreground">Duration:</span> {course.duration.en}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Edit Course Form modal (overlay style) */}
                {editingCourseId && courseForm && (
                  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 overflow-y-auto">
                    <div className="w-full max-w-2xl rounded-2xl bg-white border border-border p-6 shadow-2xl text-sm text-[var(--grey-1200)] relative max-h-[90vh] overflow-y-auto">
                      <button
                        onClick={() => setEditingCourseId(null)}
                        className="absolute right-4 top-4 rounded-full p-1.5 hover:bg-secondary text-muted-foreground"
                      >
                        <X size={18} />
                      </button>
                      <h3 className="text-lg font-bold border-b border-border pb-3 mb-5">Edit Bootcamp Details</h3>

                      <div className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-muted-foreground">Title (English)</label>
                            <input
                              type="text"
                              value={courseForm.title.en}
                              onChange={(e) => setCourseForm({ ...courseForm, title: { ...courseForm.title, en: e.target.value } })}
                              className="w-full rounded-lg border border-border px-3 py-2"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-muted-foreground">Title (Amharic)</label>
                            <input
                              type="text"
                              value={courseForm.title.am}
                              onChange={(e) => setCourseForm({ ...courseForm, title: { ...courseForm.title, am: e.target.value } })}
                              className="w-full rounded-lg border border-border px-3 py-2"
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-muted-foreground">Age Group</label>
                            <select
                              value={courseForm.ageGroup}
                              onChange={(e) => setCourseForm({ ...courseForm, ageGroup: e.target.value })}
                              className="w-full rounded-lg border border-border px-3 py-2"
                            >
                              <option value="Kids">Kids</option>
                              <option value="Teens">Teens</option>
                              <option value="Youth">Youth</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-muted-foreground">Track</label>
                            <select
                              value={courseForm.track}
                              onChange={(e) => setCourseForm({ ...courseForm, track: e.target.value })}
                              className="w-full rounded-lg border border-border px-3 py-2"
                            >
                              <option value="Fundamentals">Fundamentals</option>
                              <option value="Web">Web</option>
                              <option value="AI">AI</option>
                              <option value="Mobile">Mobile</option>
                              <option value="Robotics">Robotics</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-muted-foreground">Age Range (English)</label>
                            <input
                              type="text"
                              value={courseForm.ageRange.en}
                              onChange={(e) => setCourseForm({ ...courseForm, ageRange: { ...courseForm.ageRange, en: e.target.value } })}
                              className="w-full rounded-lg border border-border px-3 py-2"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-muted-foreground">Age Range (Amharic)</label>
                            <input
                              type="text"
                              value={courseForm.ageRange.am}
                              onChange={(e) => setCourseForm({ ...courseForm, ageRange: { ...courseForm.ageRange, am: e.target.value } })}
                              className="w-full rounded-lg border border-border px-3 py-2"
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-muted-foreground">Duration (English)</label>
                            <input
                              type="text"
                              value={courseForm.duration.en}
                              onChange={(e) => setCourseForm({ ...courseForm, duration: { ...courseForm.duration, en: e.target.value } })}
                              className="w-full rounded-lg border border-border px-3 py-2"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-muted-foreground">Duration (Amharic)</label>
                            <input
                              type="text"
                              value={courseForm.duration.am}
                              onChange={(e) => setCourseForm({ ...courseForm, duration: { ...courseForm.duration, am: e.target.value } })}
                              className="w-full rounded-lg border border-border px-3 py-2"
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-muted-foreground">Badge Earned (English)</label>
                            <input
                              type="text"
                              value={courseForm.badge.en}
                              onChange={(e) => setCourseForm({ ...courseForm, badge: { ...courseForm.badge, en: e.target.value } })}
                              className="w-full rounded-lg border border-border px-3 py-2"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-muted-foreground">Badge Earned (Amharic)</label>
                            <input
                              type="text"
                              value={courseForm.badge.am}
                              onChange={(e) => setCourseForm({ ...courseForm, badge: { ...courseForm.badge, am: e.target.value } })}
                              className="w-full rounded-lg border border-border px-3 py-2"
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-muted-foreground">Accent Accent Color</label>
                            <select
                              value={courseForm.accent}
                              onChange={(e) => setCourseForm({ ...courseForm, accent: e.target.value })}
                              className="w-full rounded-lg border border-border px-3 py-2"
                            >
                              <option value="green">Green</option>
                              <option value="gold">Gold</option>
                              <option value="red">Red</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-muted-foreground">Tools Used (comma separated)</label>
                            <input
                              type="text"
                              value={courseForm.tools.join(", ")}
                              onChange={(e) => setCourseForm({ ...courseForm, tools: e.target.value.split(",").map(t => t.trim()) })}
                              className="w-full rounded-lg border border-border px-3 py-2"
                            />
                          </div>
                        </div>

                        <div className="space-y-2 rounded-xl border border-border bg-[var(--grey-15)] p-4">
                          <h4 className="font-semibold">Outcomes list</h4>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-muted-foreground">Outcomes (EN, comma sep)</label>
                              <input
                                type="text"
                                value={courseForm.outcomes.en.join(", ")}
                                onChange={(e) => setCourseForm({ ...courseForm, outcomes: { ...courseForm.outcomes, en: e.target.value.split(",").map(t => t.trim()) } })}
                                className="w-full rounded-lg border border-border bg-white px-3 py-2"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-muted-foreground">Outcomes (AM, comma sep)</label>
                              <input
                                type="text"
                                value={courseForm.outcomes.am.join(", ")}
                                onChange={(e) => setCourseForm({ ...courseForm, outcomes: { ...courseForm.outcomes, am: e.target.value.split(",").map(t => t.trim()) } })}
                                className="w-full rounded-lg border border-border bg-white px-3 py-2"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end gap-3 border-t border-border pt-4">
                        <button
                          onClick={() => setEditingCourseId(null)}
                          className="agy-btn border border-border hover:bg-secondary px-4 py-2"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            const updated = coursesData.courses.map((c: any) => c.id === courseForm.id ? courseForm : c);
                            setCoursesData({ ...coursesData, courses: updated });
                            handleSaveData("courses", { ...coursesData, courses: updated });
                            setEditingCourseId(null);
                          }}
                          className="agy-btn agy-btn-primary px-4 py-2"
                        >
                          Save Course
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* LIFE SKILLS SECTION */}
                <div className="border-t border-border/80 pt-6">
                  <h3 className="text-lg font-medium mb-4">Core Life Skills</h3>
                  <div className="space-y-4">
                    {coursesData.life_skills.map((skill: any, idx: number) => (
                      <div key={idx} className="rounded-xl border border-border p-4 bg-[var(--grey-15)] space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-muted-foreground">Icon Symbol:</span>
                          <input
                            type="text"
                            value={skill.icon}
                            onChange={(e) => {
                              const updated = [...coursesData.life_skills];
                              updated[idx].icon = e.target.value;
                              setCoursesData({ ...coursesData, life_skills: updated });
                            }}
                            className="rounded-lg border border-border bg-white px-2 py-1 text-xs w-28"
                          />
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-muted-foreground">Title & Description (EN)</label>
                            <input
                              type="text"
                              value={skill.title.en}
                              onChange={(e) => {
                                const updated = [...coursesData.life_skills];
                                updated[idx].title.en = e.target.value;
                                setCoursesData({ ...coursesData, life_skills: updated });
                              }}
                              className="w-full rounded-lg border border-border bg-white px-3 py-1.5 text-xs"
                            />
                            <textarea
                              value={skill.desc.en}
                              onChange={(e) => {
                                const updated = [...coursesData.life_skills];
                                updated[idx].desc.en = e.target.value;
                                setCoursesData({ ...coursesData, life_skills: updated });
                              }}
                              rows={2}
                              className="w-full rounded-lg border border-border bg-white px-3 py-1.5 text-xs mt-1"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-muted-foreground">Title & Description (AM)</label>
                            <input
                              type="text"
                              value={skill.title.am}
                              onChange={(e) => {
                                const updated = [...coursesData.life_skills];
                                updated[idx].title.am = e.target.value;
                                setCoursesData({ ...coursesData, life_skills: updated });
                              }}
                              className="w-full rounded-lg border border-border bg-white px-3 py-1.5 text-xs"
                            />
                            <textarea
                              value={skill.desc.am}
                              onChange={(e) => {
                                const updated = [...coursesData.life_skills];
                                updated[idx].desc.am = e.target.value;
                                setCoursesData({ ...coursesData, life_skills: updated });
                              }}
                              rows={2}
                              className="w-full rounded-lg border border-border bg-white px-3 py-1.5 text-xs mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleSaveData("courses", coursesData)}
                    className="agy-btn agy-btn-primary flex items-center gap-2 mt-4"
                  >
                    <Save size={16} /> Save Core Skills
                  </button>
                </div>
              </div>
            )}

            {/* GALLERY & QUOTES EDIT */}
            {activeTab === "gallery" && galleryData && (
              <div className="space-y-8">
                {/* TESTIMONIALS */}
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4">
                    <h3 className="text-lg font-medium">Testimonials</h3>
                  </div>

                  <div className="space-y-4 rounded-xl border border-border p-4 bg-[var(--grey-15)] mb-6">
                    <h3 className="text-sm font-semibold">Add New Testimonial</h3>
                    <div className="space-y-3">
                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="space-y-1 text-xs">
                          <label className="font-bold text-muted-foreground">Author Name</label>
                          <input
                            type="text"
                            placeholder="Sara T."
                            value={testimonialForm.name}
                            onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                            className="w-full rounded-lg border border-border bg-white px-3 py-2"
                          />
                        </div>
                        <div className="space-y-1 text-xs">
                          <label className="font-bold text-muted-foreground">Author Role (English)</label>
                          <input
                            type="text"
                            placeholder="Parent, Bole"
                            value={testimonialForm.role_en}
                            onChange={(e) => setTestimonialForm({ ...testimonialForm, role_en: e.target.value })}
                            className="w-full rounded-lg border border-border bg-white px-3 py-2"
                          />
                        </div>
                        <div className="space-y-1 text-xs">
                          <label className="font-bold text-muted-foreground">Author Role (Amharic)</label>
                          <input
                            type="text"
                            placeholder="ወላጅ፣ ቦሌ"
                            value={testimonialForm.role_am}
                            onChange={(e) => setTestimonialForm({ ...testimonialForm, role_am: e.target.value })}
                            className="w-full rounded-lg border border-border bg-white px-3 py-2"
                          />
                        </div>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2 text-xs">
                        <div className="space-y-1">
                          <label className="font-bold text-muted-foreground">Quote (English)</label>
                          <textarea
                            value={testimonialForm.quote_en}
                            onChange={(e) => setTestimonialForm({ ...testimonialForm, quote_en: e.target.value })}
                            rows={2}
                            className="w-full rounded-lg border border-border bg-white px-3 py-2"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-muted-foreground">Quote (Amharic)</label>
                          <textarea
                            value={testimonialForm.quote_am}
                            onChange={(e) => setTestimonialForm({ ...testimonialForm, quote_am: e.target.value })}
                            rows={2}
                            className="w-full rounded-lg border border-border bg-white px-3 py-2"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (!testimonialForm.name || !testimonialForm.quote_en) {
                            toast.error("Author name and quote are required");
                            return;
                          }
                          const newQuote = {
                            name: testimonialForm.name,
                            role: { en: testimonialForm.role_en, am: testimonialForm.role_am || testimonialForm.role_en },
                            quote: { en: testimonialForm.quote_en, am: testimonialForm.quote_am || testimonialForm.quote_en },
                          };
                          const updated = [...galleryData.testimonials, newQuote];
                          setGalleryData({ ...galleryData, testimonials: updated });
                          handleSaveData("gallery", { ...galleryData, testimonials: updated });
                          setTestimonialForm({ name: "", role_en: "", role_am: "", quote_en: "", quote_am: "" });
                        }}
                        className="agy-btn agy-btn-primary flex items-center gap-1.5 text-xs px-3 py-2"
                      >
                        <Plus size={14} /> Add Testimonial
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {galleryData.testimonials.map((testimonial: any, idx: number) => (
                      <div key={idx} className="rounded-xl border border-border bg-[var(--grey-15)] p-4 flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="font-bold">{testimonial.name} <span className="text-xs text-muted-foreground font-normal">({testimonial.role.en})</span></div>
                          <p className="text-xs text-muted-foreground italic mt-1 font-medium">"{testimonial.quote.en}"</p>
                          <p className="text-xs text-muted-foreground italic mt-0.5">"{testimonial.quote.am}"</p>
                        </div>
                        <button
                          onClick={() => {
                            const updated = galleryData.testimonials.filter((_: any, i: number) => i !== idx);
                            setGalleryData({ ...galleryData, testimonials: updated });
                            handleSaveData("gallery", { ...galleryData, testimonials: updated });
                          }}
                          className="p-1.5 rounded-lg bg-white border border-border text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TRANSLATIONS EDIT */}
            {activeTab === "translations" && translationsData && (
              <div className="space-y-6">
                <div className="border-b border-border pb-4">
                  <h2 className="text-xl font-medium">Static UI Translations Grid</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Edit all layout headers, labels, placeholders, and dynamic UI elements.</p>
                </div>

                <div className="space-y-4 max-h-[500px] overflow-y-auto border border-border rounded-xl p-4">
                  {Object.keys(translationsData.en).map((key) => (
                    <div key={key} className="p-3 border-b border-border last:border-b-0 space-y-2">
                      <div className="font-mono text-xs font-bold text-[var(--grey-800)]">{key}</div>
                      <div className="grid gap-3 sm:grid-cols-2 text-xs">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-muted-foreground">English:</span>
                          <textarea
                            value={translationsData.en[key]}
                            onChange={(e) => {
                              const updated = { ...translationsData };
                              updated.en[key] = e.target.value;
                              setTranslationsData(updated);
                            }}
                            rows={1}
                            className="w-full rounded border border-border bg-white px-2 py-1"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-muted-foreground">Amharic:</span>
                          <textarea
                            value={translationsData.am[key]}
                            onChange={(e) => {
                              const updated = { ...translationsData };
                              updated.am[key] = e.target.value;
                              setTranslationsData(updated);
                            }}
                            rows={1}
                            className="w-full rounded border border-border bg-white px-2 py-1"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleSaveData("translations", translationsData)}
                  className="agy-btn agy-btn-primary flex items-center gap-2"
                >
                  <Save size={16} /> Save Translations
                </button>
              </div>
            )}

            {/* PHOTO FILE MANAGER */}
            {activeTab === "photos" && (
              <div className="space-y-6">
                <div className="border-b border-border pb-4">
                  <h2 className="text-xl font-medium">Photo Files Manager</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Upload photos directly into separate folders based on categories like classroom, graduation, projects.</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {["graduation", "classroom", "life_skills", "projects", "avatars", "hero", "general"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedPhotoCategory(cat)}
                      className={cn(
                        "rounded-full px-3.5 py-1.5 text-xs font-semibold border transition cursor-pointer",
                        selectedPhotoCategory === cat
                          ? "bg-[var(--grey-1200)] text-[var(--grey-10)] border-[var(--grey-1200)]"
                          : "bg-white text-[var(--grey-800)] border-[var(--border)] hover:bg-[var(--grey-15)]"
                      )}
                    >
                      {cat.replace("_", " ")}
                    </button>
                  ))}
                </div>

                {/* UPLOADER */}
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-[var(--grey-15)] flex flex-col items-center justify-center relative">
                  <Upload size={32} className="text-muted-foreground mb-3" />
                  <div className="text-sm font-semibold">Upload New Photo</div>
                  <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                    Choose a local photo. It will save directly into <strong>public/content/photos/{selectedPhotoCategory}/</strong>
                  </p>
                  
                  <input
                    type="file"
                    accept="image/*"
                    id="photo-uploader"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handlePhotoUpload}
                    disabled={uploadingPhoto}
                  />

                  {uploadingPhoto && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-xl">
                      <div className="text-xs font-bold animate-pulse text-[var(--grey-1200)]">Uploading to filesystem...</div>
                    </div>
                  )}
                </div>

                {/* IMAGES GRID */}
                <div>
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wide mb-3">Photos in this folder ({photosData[selectedPhotoCategory]?.length || 0})</h3>
                  {(!photosData[selectedPhotoCategory] || photosData[selectedPhotoCategory].length === 0) ? (
                    <div className="text-xs text-muted-foreground py-6 text-center border border-border rounded-lg bg-[var(--grey-15)]">No photos in this folder. Upload one above!</div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 max-h-[350px] overflow-y-auto p-2 border border-border rounded-xl">
                      {photosData[selectedPhotoCategory].map((src) => (
                        <div key={src} className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-[var(--grey-15)]">
                          <img
                            src={src}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-2 gap-1.5">
                            <div className="text-[10px] text-white font-mono break-all line-clamp-2 bg-black/40 px-1 py-0.5 rounded leading-tight">
                              {src.split("/").pop()}
                            </div>
                            <div className="flex gap-1 justify-end">
                              <button
                                onClick={() => {
                                  // Prompt or copy path
                                  navigator.clipboard.writeText(src);
                                  toast.success("Copied image URL to clipboard!");
                                }}
                                className="p-1 rounded bg-white text-xs border hover:bg-secondary flex items-center justify-center cursor-pointer"
                                title="Copy relative path"
                              >
                                <Eye size={12} />
                              </button>
                              <button
                                onClick={() => handlePhotoDelete(src)}
                                className="p-1 rounded bg-white border border-border hover:bg-destructive/10 text-destructive flex items-center justify-center cursor-pointer"
                                title="Delete image"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </Container>
    </div>
  );
}
