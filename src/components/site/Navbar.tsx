import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, SITE } from "@/constants/site";
import { Container } from "./Container";
import { GradientMark } from "./GradientMark";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--grey-0)]/95 backdrop-blur-md">
      <Container>
        <div
          className="flex items-center justify-between gap-4"
          style={{ minHeight: "var(--nav-height)" }}
        >
          <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <GradientMark />
            <span className="text-[15px] font-medium tracking-tight text-[var(--grey-1200)]">
              {SITE.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.filter((l) => l.to !== "/register").map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "rounded-full px-4 py-2 text-[13px] font-medium transition",
                    active
                      ? "bg-[var(--grey-20)] text-[var(--grey-1200)]"
                      : "text-[var(--grey-800)] hover:bg-[var(--grey-15)] hover:text-[var(--grey-1200)]",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Link to="/register" className="agy-btn agy-btn-primary text-[12.5px]">
              Register Now <ArrowUpRight size={13} />
            </Link>
          </div>

          <button
            aria-label="Toggle menu"
            className="rounded-lg p-2 text-[var(--grey-1200)] md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="border-t border-[var(--border)] py-2 md:hidden">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--grey-1200)] hover:bg-[var(--grey-15)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </header>
  );
}
