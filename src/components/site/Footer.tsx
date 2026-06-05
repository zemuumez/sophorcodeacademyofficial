import { Link } from "@tanstack/react-router";
import { NAV_LINKS, SITE } from "@/constants/site";
import { Container } from "./Container";
import { SiteLogo } from "./SiteLogo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--border)] bg-[var(--grey-1200)] text-[var(--grey-10)]">
      <Container className="py-16 text-sm">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <SiteLogo className="text-[var(--grey-10)]" />
            <p className="mt-4 max-w-sm leading-relaxed text-[var(--grey-50)]/80">
              {SITE.description}
            </p>
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-[var(--grey-50)]/60">
              Explore
            </div>
            <ul className="mt-4 space-y-2.5 text-[var(--grey-50)]/90">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition hover:text-white hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-[var(--grey-50)]/60">
              Visit
            </div>
            <ul className="mt-4 space-y-2.5 text-[var(--grey-50)]/90">
              <li>{SITE.address}</li>
              <li>{SITE.phone}</li>
              <li>{SITE.email}</li>
              <li>{SITE.hours}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-[var(--grey-50)]/50">
          Copyright © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
