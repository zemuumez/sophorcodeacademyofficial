import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Phone, Clock, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { TextField, TextAreaField } from "@/components/site/Field";
import { useTranslation } from "@/hooks/useTranslation";
import { getCmsData } from "@/lib/api/cms.functions";

export const Route = createFileRoute("/contact")({
  loader: async () => {
    return await getCmsData();
  },
  head: ({ loaderData }) => {
    const site = loaderData?.site || { name: "Sophor Code Academy", location: { en: "" } };
    return {
      meta: [
        { title: `Contact — ${site.name}` },
        { name: "description", content: `Reach Sophor Code Academy in ${site.location.en}. Phone, email, and contact form.` },
        { property: "og:title", content: `Contact — ${site.name}` },
        { property: "og:description", content: "Get in touch with Sophor Code Academy." },
      ],
    };
  },
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2).max(80).regex(/^[A-Za-zÀ-ÿ' \-]+$/, "Letters, spaces, hyphens only"),
  email: z.string().trim().email().max(120),
  subject: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10, "Tell us a bit more").max(1500),
});
type Data = z.infer<typeof schema>;

const RATE_MS = 30_000; // 30s between submits

function ContactPage() {
  const { site } = useLoaderData({ from: "/contact" }) as any;
  const { t, locale } = useTranslation();
  const [done, setDone] = useState(false);
  const [rateError, setRateError] = useState<string | null>(null);
  const lastSubmit = useRef<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Data>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Data) => {
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

  return (
    <Section centered eyebrow={t("contact_eyebrow", "Contact")} title={t("contact_title", "Let's talk.")} subtitle={t("contact_subtitle", "Questions, partnerships, or press — we'd love to hear from you.")}>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        {/* INFO */}
        <Reveal className="space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-8">
          <InfoRow icon={<MapPin size={18} />} label={t("gallery_visit_us", "Visit us")} value={site.address[locale]} />
          <InfoRow icon={<Phone size={18} />} label={t("gallery_call", "Call")} value={site.phone} />
          <InfoRow icon={<Mail size={18} />} label={t("gallery_email", "Email")} value={site.email} />
          <InfoRow icon={<Clock size={18} />} label={t("gallery_hours", "Hours")} value={site.hours[locale]} />

          <div className="mt-6 aspect-video overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Sophor Code Academy location"
              src="https://www.google.com/maps?q=Bole%2C+Addis+Ababa&output=embed"
              className="h-full w-full"
              loading="lazy"
            />
          </div>
        </Reveal>

        {/* FORM */}
        <Reveal delay={0.1} className="rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-8">
          {done ? (
            <div className="py-12 text-center">
              <CheckCircle2 className="mx-auto text-[var(--accent)]" size={48} />
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{t("contact_success_title", "Message sent.")}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("contact_success_desc", "We typically reply within one business day.")}
              </p>
              <button
                onClick={() => setDone(false)}
                className="mt-5 rounded-full border border-border px-5 py-2 text-sm hover:bg-secondary cursor-pointer"
              >
                {t("contact_success_btn", "Send another")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField label={t("contact_form_name", "Your name")} maxLength={80} error={errors.name?.message} {...register("name")} />
                <TextField label={t("contact_form_email", "Email")} type="email" maxLength={120} error={errors.email?.message} {...register("email")} />
              </div>
              <TextField label={t("contact_form_subject", "Subject")} maxLength={120} error={errors.subject?.message} {...register("subject")} />
              <TextAreaField
                label={t("contact_form_message", "Message")}
                maxLength={1500}
                error={errors.message?.message}
                {...register("message")}
              />
              {rateError && (
                <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                  {rateError}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="agy-btn agy-btn-primary w-full disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? t("contact_form_sending", "Sending…") : t("contact_form_submit", "Send message")}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </Section>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--grey-20)] text-[var(--grey-1200)]">
        {icon}
      </div>
      <div>
        <div className="text-xs tracking-wide text-[var(--grey-800)]">{label}</div>
        <div className="mt-0.5 font-medium text-[var(--grey-1200)]">{value}</div>
      </div>
    </div>
  );
}

