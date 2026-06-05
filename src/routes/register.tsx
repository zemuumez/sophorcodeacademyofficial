import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { TextField, TextAreaField, SelectField } from "@/components/site/Field";
import { useTranslation } from "@/hooks/useTranslation";
import { getCmsData } from "@/lib/api/cms.functions";

export const Route = createFileRoute("/register")({
  loader: async () => {
    return await getCmsData();
  },
  head: ({ loaderData }) => {
    const site = loaderData?.site || { name: "Sophor Code Academy" };
    return {
      meta: [
        { title: `Register — ${site.name}` },
        {
          name: "description",
          content: "Reserve your seat in Sophor's summer bootcamps. Quick, secure registration form.",
        },
        { property: "og:title", content: `Register — ${site.name}` },
        { property: "og:description", content: "Reserve your seat for Sophor's summer bootcamp." },
      ],
    };
  },
  component: RegisterPage,
});

// Strict schema — prevents XSS-prone characters in name fields and bounds all input.
const schema = z.object({
  studentName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80)
    .regex(/^[A-Za-zÀ-ÿ' \-]+$/, "Letters, spaces, hyphens only"),
  age: z.coerce.number().int().min(7, "Min age 7").max(25, "Max age 25"),
  grade: z.string().trim().max(40).optional().or(z.literal("")),
  parentName: z.string().trim().min(2).max(80),
  parentPhone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Digits and + - ( ) only"),
  parentEmail: z.string().trim().email("Enter a valid email").max(120),
  bootcamp: z.string().min(1, "Pick a bootcamp"),
  dietary: z.string().trim().max(300).optional().or(z.literal("")),
  consent: z.literal(true, { message: "Parental consent required" }),
});

type FormIn = z.input<typeof schema>;
type FormOut = z.output<typeof schema>;

function RegisterPage() {
  const { courses } = useLoaderData({ from: "/register" }) as any;
  const { t, locale } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormIn, unknown, FormOut>({
    resolver: zodResolver(schema),
    defaultValues: { bootcamp: "" },
  });

  const onSubmit = async (data: FormOut) => {
    // In-memory submission stub — replace with server function when backend is added.
    await new Promise((r) => setTimeout(r, 600));
    console.log("Registration:", data);
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <Section>
        <Reveal className="mx-auto max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-12 text-center">
          <CheckCircle2 className="mx-auto text-[var(--grey-1200)]" size={48} />
          <h2 className="mt-5 text-3xl font-medium tracking-tight">
            {t("register_success_title", "You're in the squad.")}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t("register_success_desc", "We've received the registration. Our team will reach out within 2 business days with payment and onboarding details.")}
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="agy-btn agy-btn-primary mt-7 cursor-pointer"
          >
            {t("register_success_btn", "Register another student")}
          </button>
        </Reveal>
      </Section>
    );
  }

  return (
    <Section
      centered
      eyebrow={t("register_eyebrow", "Enroll")}
      title={t("register_title", "Reserve your seat.")}
      subtitle={t("register_subtitle", "It takes 2 minutes. We'll follow up with payment options and the welcome pack.")}
    >
      <Reveal>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mx-auto max-w-2xl space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-8 sm:p-10"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label={t("register_form_student_name", "Student name")}
              placeholder="Liya Bekele"
              autoComplete="off"
              maxLength={80}
              error={errors.studentName?.message}
              {...register("studentName")}
            />
            <TextField
              label={t("register_form_age", "Age")}
              type="number"
              min={7}
              max={25}
              error={errors.age?.message}
              {...register("age")}
            />
          </div>

          <TextField
            label={t("register_form_grade", "Grade / School (optional)")}
            maxLength={40}
            error={errors.grade?.message}
            {...register("grade")}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label={t("register_form_parent_name", "Parent / Guardian name")}
              maxLength={80}
              error={errors.parentName?.message}
              {...register("parentName")}
            />
            <TextField
              label={t("register_form_parent_phone", "Parent phone")}
              placeholder="+251 ..."
              maxLength={20}
              error={errors.parentPhone?.message}
              {...register("parentPhone")}
            />
          </div>

          <TextField
            label={t("register_form_parent_email", "Parent email")}
            type="email"
            maxLength={120}
            error={errors.parentEmail?.message}
            {...register("parentEmail")}
          />

          <SelectField
            label={t("register_form_bootcamp", "Bootcamp track")}
            error={errors.bootcamp?.message}
            {...register("bootcamp")}
          >
            <option value="">{t("register_form_bootcamp_placeholder", "Select a bootcamp…")}</option>
            {courses.courses.map((c: any) => {
              const cTitle = c.title[locale];
              const cAgeRange = c.ageRange[locale];
              return (
                <option key={c.id} value={c.id}>
                  {cTitle} — {cAgeRange}
                </option>
              );
            })}
          </SelectField>

          <TextAreaField
            label={t("register_form_dietary", "Dietary or special requirements (optional)")}
            hint={t("register_form_dietary_hint", "Allergies, accessibility needs, anything we should know.")}
            maxLength={300}
            error={errors.dietary?.message}
            {...register("dietary")}
          />

          <label className="flex items-start gap-3 rounded-xl border border-border bg-[var(--surface)] p-4 select-none cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 accent-[var(--accent)]"
              {...register("consent")}
            />
            <span className="text-sm text-foreground/90">
              {t("register_form_consent", "I am the parent/guardian and consent to enrollment.")}{" "}
              {errors.consent && (
                <span className="block text-xs text-destructive">{errors.consent.message}</span>
              )}
            </span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="agy-btn agy-btn-primary w-full disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? t("register_form_submitting", "Submitting…") : t("register_form_submit", "Reserve seat")}
          </button>

          <p className="text-center text-xs text-muted-foreground">
            {t("register_form_disclaimer", "Your information is validated and never shared. We use it only to contact you about enrollment.")}
          </p>
        </form>
      </Reveal>
    </Section>
  );
}

