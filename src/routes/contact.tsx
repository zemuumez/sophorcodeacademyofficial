import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Phone, Clock, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { TextField, TextAreaField } from "@/components/site/Field";
import { SITE } from "@/constants/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Sophor Code Academy" },
      { name: "description", content: `Reach Sophor Code Academy in ${SITE.location}. Phone, email, and contact form.` },
      { property: "og:title", content: "Contact — Sophor Code Academy" },
      { property: "og:description", content: "Get in touch with Sophor Code Academy." },
    ],
  }),
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
      setRateError("Please wait a moment before sending another message.");
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
    <Section centered eyebrow="Contact" title="Let's talk." subtitle="Questions, partnerships, or press — we'd love to hear from you.">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        {/* INFO */}
        <Reveal className="space-y-5 rounded-3xl border border-border bg-white p-8">
          <InfoRow icon={<MapPin size={18} />} label="Visit us" value={SITE.address} />
          <InfoRow icon={<Phone size={18} />} label="Call" value={SITE.phone} />
          <InfoRow icon={<Mail size={18} />} label="Email" value={SITE.email} />
          <InfoRow icon={<Clock size={18} />} label="Hours" value={SITE.hours} />

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
        <Reveal delay={0.1} className="rounded-3xl border border-border bg-white p-8">
          {done ? (
            <div className="py-12 text-center">
              <CheckCircle2 className="mx-auto text-[var(--accent)]" size={48} />
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">Message sent.</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We typically reply within one business day.
              </p>
              <button
                onClick={() => setDone(false)}
                className="mt-5 rounded-full border border-border px-5 py-2 text-sm hover:bg-secondary"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField label="Your name" maxLength={80} error={errors.name?.message} {...register("name")} />
                <TextField label="Email" type="email" maxLength={120} error={errors.email?.message} {...register("email")} />
              </div>
              <TextField label="Subject" maxLength={120} error={errors.subject?.message} {...register("subject")} />
              <TextAreaField
                label="Message"
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
                className="w-full rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {isSubmitting ? "Sending…" : "Send message"}
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
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--brand)]/10 text-[var(--brand)]">
        {icon}
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="mt-0.5 font-medium text-foreground">{value}</div>
      </div>
    </div>
  );
}
