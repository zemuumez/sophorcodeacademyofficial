import { Link } from "@tanstack/react-router";
import { NAV_LINKS, SITE } from "@/constants/site";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border brand-wash">
      <Container className="py-14 text-sm text-muted-foreground">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-[var(--brand)] text-[10px] font-bold text-white">
                S
              </span>
              <span className="font-display text-[15px] font-bold tracking-tight text-foreground">
                {SITE.name}
              </span>
            </div>
            <p className="mt-3 max-w-sm leading-relaxed">{SITE.description}</p>
          </div>
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-wider text-foreground">
              Explore
            </div>
            <ul className="mt-3 space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-foreground hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-wider text-foreground">
              Visit
            </div>
            <ul className="mt-3 space-y-2">
              <li>{SITE.address}</li>
              <li>{SITE.phone}</li>
              <li>{SITE.email}</li>
              <li>{SITE.hours}</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-5 text-[12px]">
          Copyright © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
