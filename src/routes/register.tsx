import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Section } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { TextField, TextAreaField, SelectField } from "@/components/site/Field";
import { COURSES } from "@/constants/courses";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register — Sophor Code Academy" },
      {
        name: "description",
        content: "Reserve your seat in Sophor's summer bootcamps. Quick, secure registration form.",
      },
      { property: "og:title", content: "Register — Sophor Code Academy" },
      { property: "og:description", content: "Reserve your seat for Sophor's summer bootcamp." },
    ],
  }),
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
          <h2 className="mt-5 text-3xl font-medium tracking-tight">You're in the squad.</h2>
          <p className="mt-3 text-muted-foreground">
            We've received the registration. Our team will reach out within 2 business days with payment and onboarding details.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="agy-btn agy-btn-primary mt-7"
          >
            Register another student
          </button>
        </Reveal>
      </Section>
    );
  }

  return (
    <Section
      centered
      eyebrow="Enroll"
      title="Reserve your seat."
      subtitle="It takes 2 minutes. We'll follow up with payment options and the welcome pack."
    >
      <Reveal>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mx-auto max-w-2xl space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--grey-0)] p-8 sm:p-10"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Student name"
            placeholder="Liya Bekele"
            autoComplete="off"
            maxLength={80}
            error={errors.studentName?.message}
            {...register("studentName")}
          />
          <TextField
            label="Age"
            type="number"
            min={7}
            max={25}
            error={errors.age?.message}
            {...register("age")}
          />
        </div>

        <TextField
          label="Grade / School (optional)"
          maxLength={40}
          error={errors.grade?.message}
          {...register("grade")}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Parent / Guardian name"
            maxLength={80}
            error={errors.parentName?.message}
            {...register("parentName")}
          />
          <TextField
            label="Parent phone"
            placeholder="+251 ..."
            maxLength={20}
            error={errors.parentPhone?.message}
            {...register("parentPhone")}
          />
        </div>

        <TextField
          label="Parent email"
          type="email"
          maxLength={120}
          error={errors.parentEmail?.message}
          {...register("parentEmail")}
        />

        <SelectField
          label="Bootcamp track"
          error={errors.bootcamp?.message}
          {...register("bootcamp")}
        >
          <option value="">Select a bootcamp…</option>
          {COURSES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title} — {c.ageRange}
            </option>
          ))}
        </SelectField>

        <TextAreaField
          label="Dietary or special requirements (optional)"
          hint="Allergies, accessibility needs, anything we should know."
          maxLength={300}
          error={errors.dietary?.message}
          {...register("dietary")}
        />

        <label className="flex items-start gap-3 rounded-xl border border-border bg-[var(--surface)] p-4">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 accent-[var(--accent)]"
            {...register("consent")}
          />
          <span className="text-sm text-foreground/90">
            I am the parent/guardian and consent to enrollment.{" "}
            {errors.consent && (
              <span className="block text-xs text-destructive">{errors.consent.message}</span>
            )}
          </span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="agy-btn agy-btn-primary w-full disabled:opacity-60"
        >
          {isSubmitting ? "Submitting…" : "Reserve seat"}
        </button>

        <p className="text-center text-xs text-muted-foreground">
          Your information is validated and never shared. We use it only to contact you about enrollment.
        </p>
      </form>
      </Reveal>
    </Section>
  );
}
