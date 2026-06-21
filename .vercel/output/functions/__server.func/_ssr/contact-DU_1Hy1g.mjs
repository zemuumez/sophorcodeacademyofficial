import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useLoaderData } from "../_libs/tanstack__react-router.mjs";
import { u as useForm } from "../_libs/react-hook-form.mjs";
import { u } from "../_libs/hookform__resolvers.mjs";
import { S as Section } from "./Section-BigB185K.mjs";
import { R as Reveal } from "./Reveal-DEDWqFdN.mjs";
import { T as TextField, a as TextAreaField } from "./Field-CluHtyOO.mjs";
import { u as useTranslation } from "./router-JNb6id3g.mjs";
import "../_libs/seroval.mjs";
import { a as MapPin, P as Phone, b as Mail, c as Clock, C as CircleCheck } from "../_libs/lucide-react.mjs";
import { o as object, s as string } from "../_libs/zod.mjs";
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
  name: string().trim().min(2).max(80).regex(/^[A-Za-zÀ-ÿ' \-]+$/, "Letters, spaces, hyphens only"),
  email: string().trim().email().max(120),
  subject: string().trim().min(2).max(120),
  message: string().trim().min(10, "Tell us a bit more").max(1500)
});
const RATE_MS = 3e4;
function ContactPage() {
  const {
    site
  } = useLoaderData({
    from: "/contact"
  });
  const {
    t,
    locale
  } = useTranslation();
  const [done, setDone] = reactExports.useState(false);
  const [rateError, setRateError] = reactExports.useState(null);
  const lastSubmit = reactExports.useRef(0);
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    },
    reset
  } = useForm({
    resolver: u(schema)
  });
  const onSubmit = async (data) => {
    const now = Date.now();
    if (now - lastSubmit.current < RATE_MS) {
      setRateError(t("contact_rate_error", "Please wait a moment before sending another message."));
      return;
    }
    lastSubmit.current = now;
    setRateError(null);
    await new Promise((r) => setTimeout(r, 500));
    console.log("Contact:", data);
    setDone(true);
    reset();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { centered: true, eyebrow: t("contact_eyebrow", "Contact"), title: t("contact_title", "Let's talk."), subtitle: t("contact_subtitle", "Questions, partnerships, or press — we'd love to hear from you."), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_1.3fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 18 }), label: t("gallery_visit_us", "Visit us"), value: site.address[locale] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 18 }), label: t("gallery_call", "Call"), value: site.phone }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 18 }), label: t("gallery_email", "Email"), value: site.email }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 18 }), label: t("gallery_hours", "Hours"), value: site.hours[locale] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 aspect-video overflow-hidden rounded-2xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { title: "Sophor Code Academy location", src: "https://www.google.com/maps?q=Bole%2C+Addis+Ababa&output=embed", className: "h-full w-full", loading: "lazy" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.1, className: "rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-8", children: done ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto text-[var(--accent)]", size: 48 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-2xl font-semibold tracking-tight", children: t("contact_success_title", "Message sent.") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: t("contact_success_desc", "We typically reply within one business day.") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setDone(false), className: "mt-5 rounded-full border border-border px-5 py-2 text-sm hover:bg-secondary cursor-pointer", children: t("contact_success_btn", "Send another") })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit(onSubmit), noValidate: true, className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TextField, { label: t("contact_form_name", "Your name"), maxLength: 80, error: errors.name?.message, ...register("name") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TextField, { label: t("contact_form_email", "Email"), type: "email", maxLength: 120, error: errors.email?.message, ...register("email") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextField, { label: t("contact_form_subject", "Subject"), maxLength: 120, error: errors.subject?.message, ...register("subject") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextAreaField, { label: t("contact_form_message", "Message"), maxLength: 1500, error: errors.message?.message, ...register("message") }),
      rateError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive", children: rateError }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isSubmitting, className: "agy-btn agy-btn-primary w-full disabled:opacity-60 cursor-pointer", children: isSubmitting ? t("contact_form_sending", "Sending…") : t("contact_form_submit", "Send message") })
    ] }) })
  ] }) });
}
function InfoRow({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--grey-20)] text-[var(--grey-1200)]", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs tracking-wide text-[var(--grey-800)]", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 font-medium text-[var(--grey-1200)]", children: value })
    ] })
  ] });
}
export {
  ContactPage as component
};
