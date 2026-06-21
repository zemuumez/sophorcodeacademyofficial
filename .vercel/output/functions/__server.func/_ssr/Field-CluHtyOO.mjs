import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./router-JNb6id3g.mjs";
function Wrap({ label, error, children, hint }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1.5 block text-sm font-medium text-[var(--grey-1200)]", children: label }),
    children,
    hint && !error && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-xs text-[var(--grey-800)]", children: hint }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-xs text-destructive", children: error })
  ] });
}
const base = "w-full rounded-xl border border-[var(--input)] bg-[var(--grey-0)] px-3.5 py-2.5 text-[15px] text-[var(--grey-1200)] placeholder:text-[var(--grey-800)]/50 outline-none transition focus:border-[var(--grey-1200)] focus:ring-2 focus:ring-[var(--ring)]";
const TextField = reactExports.forwardRef(({ label, error, hint, className, ...rest }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Wrap, { label, error, hint, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref, className: cn(base, className), ...rest }) }));
TextField.displayName = "TextField";
const TextAreaField = reactExports.forwardRef(({ label, error, hint, className, ...rest }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Wrap, { label, error, hint, children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { ref, rows: 5, className: cn(base, "resize-y", className), ...rest }) }));
TextAreaField.displayName = "TextAreaField";
const SelectField = reactExports.forwardRef(({ label, error, hint, className, children, ...rest }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Wrap, { label, error, hint, children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { ref, className: cn(base, className), ...rest, children }) }));
SelectField.displayName = "SelectField";
export {
  SelectField as S,
  TextField as T,
  TextAreaField as a
};
