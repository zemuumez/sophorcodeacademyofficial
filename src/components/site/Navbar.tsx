import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, SITE } from "@/constants/site";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  return (
    <header className="sticky top-0 z-50 pt-4">
      <Container>
        <div className="flex items-center justify-between gap-4 rounded-full border border-white/60 bg-white/70 px-4 py-2 shadow-[0_8px_30px_rgb(59,130,246,0.08)] backdrop-blur-xl">
          <Link to="/" className="flex items-center gap-2 pl-2" onClick={() => setOpen(false)}>
            <span className="grid h-7 w-7 place-items-center rounded-md bg-[var(--brand)] text-[10px] font-bold text-white">
              S
            </span>
            <span className="font-display text-[15px] font-bold tracking-tight">{SITE.name}</span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full bg-[var(--surface)] p-1 md:flex">
            {NAV_LINKS.filter((l) => l.to !== "/register").map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-[13px] font-medium transition",
                    active
                      ? "bg-[var(--brand)] text-white shadow-sm"
                      : "text-foreground/70 hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Link
              to="/register"
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-[12.5px] font-semibold text-background transition hover:opacity-90"
            >
              Register Now <ArrowUpRight size={13} />
            </Link>
          </div>

          <button
            aria-label="Toggle menu"
            className="rounded-md p-2 text-foreground md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {open && (
          <div className="mt-2 rounded-2xl border border-white/60 bg-white/90 p-2 backdrop-blur-xl md:hidden">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/90 hover:bg-[var(--surface)]"
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
