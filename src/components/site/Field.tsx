import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

function Wrap({ label, error, children, hint }: { label: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground/90">{label}</span>
      {children}
      {hint && !error && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

const base =
  "w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-[15px] text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--ring)]";

export const TextField = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; hint?: string }
>(({ label, error, hint, className, ...rest }, ref) => (
  <Wrap label={label} error={error} hint={hint}>
    <input ref={ref} className={cn(base, className)} {...rest} />
  </Wrap>
));
TextField.displayName = "TextField";

export const TextAreaField = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string; hint?: string }
>(({ label, error, hint, className, ...rest }, ref) => (
  <Wrap label={label} error={error} hint={hint}>
    <textarea ref={ref} rows={5} className={cn(base, "resize-y", className)} {...rest} />
  </Wrap>
));
TextAreaField.displayName = "TextAreaField";

export const SelectField = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string; hint?: string; children: ReactNode }
>(({ label, error, hint, className, children, ...rest }, ref) => (
  <Wrap label={label} error={error} hint={hint}>
    <select ref={ref} className={cn(base, className)} {...rest}>
      {children}
    </select>
  </Wrap>
));
SelectField.displayName = "SelectField";
