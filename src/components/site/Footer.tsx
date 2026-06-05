import { Link, useLoaderData } from "@tanstack/react-router";
import { useTranslation } from "@/hooks/useTranslation";
import { NAV_LINKS } from "@/constants/site";
import { Container } from "./Container";
import { SiteLogo } from "./SiteLogo";

export function Footer() {
  const { site } = useLoaderData({ from: "__root__" }) as any;
  const { t, locale } = useTranslation();

  const getLocalizedLabel = (label: string) => {
    switch (label) {
      case "Home":
        return t("nav_home", "Home");
      case "Bootcamps":
        return t("nav_bootcamps", "Bootcamps");
      case "Gallery":
        return t("nav_gallery", "Gallery");
      case "Register":
        return t("nav_register", "Register");
      case "Contact":
        return t("nav_contact", "Contact");
      default:
        return label;
    }
  };

  return (
    <footer className="mt-24 border-t border-[var(--border)] bg-[var(--grey-1200)] text-[var(--grey-10)]">
      <Container className="py-16 text-sm">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <SiteLogo className="text-[var(--grey-10)]" />
            <p className="mt-4 max-w-sm leading-relaxed text-[var(--grey-50)]/80">
              {site.description[locale]}
            </p>
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-[var(--grey-50)]/60">
              {t("nav_bootcamps", "Explore")}
            </div>
            <ul className="mt-4 space-y-2.5 text-[var(--grey-50)]/90">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    search={(prev) => prev}
                    className="transition hover:text-white hover:underline"
                  >
                    {getLocalizedLabel(l.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-[var(--grey-50)]/60">
              {t("footer_contact", "Contact Info")}
            </div>
            <ul className="mt-4 space-y-2.5 text-[var(--grey-50)]/90">
              <li>{site.address[locale]}</li>
              <li>{site.phone}</li>
              <li>{site.email}</li>
              <li>{site.hours[locale]}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-[var(--grey-50)]/50">
          Copyright © {new Date().getFullYear()} {site.name}. {t("footer_rights", "All rights reserved.")}
        </div>
      </Container>
    </footer>
  );
}

