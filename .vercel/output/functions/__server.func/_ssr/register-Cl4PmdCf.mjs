import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useLoaderData } from "../_libs/tanstack__react-router.mjs";
import { u as useForm } from "../_libs/react-hook-form.mjs";
import { u } from "../_libs/hookform__resolvers.mjs";
import { S as Section } from "./Section-BigB185K.mjs";
import { R as Reveal } from "./Reveal-DEDWqFdN.mjs";
import { T as TextField, S as SelectField, a as TextAreaField } from "./Field-CluHtyOO.mjs";
import { u as useTranslation } from "./router-JNb6id3g.mjs";
import "../_libs/seroval.mjs";
import { C as CircleCheck } from "../_libs/lucide-react.mjs";
import { o as object, l as literal, s as string, n as number } from "../_libs/zod.mjs";
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
import "../_libs/gsap.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./server-pv48Vp7X.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const schema = object({
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
function RegisterPage() {
  const {
    courses
  } = useLoaderData({
    from: "/register"
  });
  const {
    t,
    locale
  } = useTranslation();
  const [submitted, setSubmitted] = reactExports.useState(false);
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    },
    reset
  } = useForm({
    resolver: u(schema),
    defaultValues: {
      bootcamp: ""
    }
  });
  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 600));
    console.log("Registration:", data);
    setSubmitted(true);
    reset();
  };
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "mx-auto max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto text-[var(--grey-1200)]", size: 48 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-5 text-3xl font-medium tracking-tight", children: t("register_success_title", "You're in the squad.") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: t("register_success_desc", "We've received the registration. Our team will reach out within 2 business days with payment and onboarding details.") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSubmitted(false), className: "agy-btn agy-btn-primary mt-7 cursor-pointer", children: t("register_success_btn", "Register another student") })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { centered: true, eyebrow: t("register_eyebrow", "Enroll"), title: t("register_title", "Reserve your seat."), subtitle: t("register_subtitle", "It takes 2 minutes. We'll follow up with payment options and the welcome pack."), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit(onSubmit), noValidate: true, className: "mx-auto max-w-2xl space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-8 sm:p-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextField, { label: t("register_form_student_name", "Student name"), placeholder: "Liya Bekele", autoComplete: "off", maxLength: 80, error: errors.studentName?.message, ...register("studentName") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextField, { label: t("register_form_age", "Age"), type: "number", min: 7, max: 25, error: errors.age?.message, ...register("age") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TextField, { label: t("register_form_grade", "Grade / School (optional)"), maxLength: 40, error: errors.grade?.message, ...register("grade") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextField, { label: t("register_form_parent_name", "Parent / Guardian name"), maxLength: 80, error: errors.parentName?.message, ...register("parentName") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextField, { label: t("register_form_parent_phone", "Parent phone"), placeholder: "+251 ...", maxLength: 20, error: errors.parentPhone?.message, ...register("parentPhone") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TextField, { label: t("register_form_parent_email", "Parent email"), type: "email", maxLength: 120, error: errors.parentEmail?.message, ...register("parentEmail") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectField, { label: t("register_form_bootcamp", "Bootcamp track"), error: errors.bootcamp?.message, ...register("bootcamp"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: t("register_form_bootcamp_placeholder", "Select a bootcamp…") }),
      courses.courses.map((c) => {
        const cTitle = c.title[locale];
        const cAgeRange = c.ageRange[locale];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: c.id, children: [
          cTitle,
          " — ",
          cAgeRange
        ] }, c.id);
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TextAreaField, { label: t("register_form_dietary", "Dietary or special requirements (optional)"), hint: t("register_form_dietary_hint", "Allergies, accessibility needs, anything we should know."), maxLength: 300, error: errors.dietary?.message, ...register("dietary") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-3 rounded-xl border border-border bg-[var(--surface)] p-4 select-none cursor-pointer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "mt-0.5 h-4 w-4 accent-[var(--accent)]", ...register("consent") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-foreground/90", children: [
        t("register_form_consent", "I am the parent/guardian and consent to enrollment."),
        " ",
        errors.consent && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-destructive", children: errors.consent.message })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isSubmitting, className: "agy-btn agy-btn-primary w-full disabled:opacity-60 cursor-pointer", children: isSubmitting ? t("register_form_submitting", "Submitting…") : t("register_form_submit", "Reserve seat") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground", children: t("register_form_disclaimer", "Your information is validated and never shared. We use it only to contact you about enrollment.") })
  ] }) }) });
}
export {
  RegisterPage as component
};
