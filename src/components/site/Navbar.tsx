import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS } from "@/constants/site";
import { Container } from "./Container";
import { SiteLogo } from "./SiteLogo";
import { cn } from "@/lib/utils";
import { useNavbarScroll } from "@/hooks/use-navbar-scroll";
import { useTranslation } from "@/hooks/useTranslation";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();
  const scrolled = useNavbarScroll();
  const { t, locale, changeLanguage } = useTranslation();

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
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-[var(--border)] bg-[var(--grey-0)]/98 shadow-[0_8px_30px_rgba(18,19,23,0.06)]"
          : "border-transparent bg-[var(--grey-0)]/80",
      )}
    >
      <Container>
        <div
          className="flex items-center justify-between gap-4"
          style={{ minHeight: "var(--nav-height)" }}
        >
          <Link
            to="/"
            search={(prev) => prev}
            className="text-[var(--grey-1200)]"
            onClick={() => setOpen(false)}
          >
            <SiteLogo showName />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.filter((l) => l.to !== "/register").map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  search={(prev) => prev}
                  className={cn(
                    "rounded-full px-4 py-2 text-[13px] font-medium transition",
                    active
                      ? "bg-[var(--grey-20)] text-[var(--grey-1200)]"
                      : "text-[var(--grey-800)] hover:bg-[var(--grey-15)] hover:text-[var(--grey-1200)]",
                  )}
                >
                  {getLocalizedLabel(link.label)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {/* Premium Language Switcher */}
            <div className="flex items-center gap-1 rounded-full border border-[var(--border)] p-[2px] bg-[var(--grey-15)]">
              <button
                onClick={() => changeLanguage("en")}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase transition cursor-pointer select-none",
                  locale === "en"
                    ? "bg-[var(--grey-0)] text-[var(--grey-1200)] shadow-[0_1px_3px_rgba(0,0,0,0.1)] font-semibold"
                    : "text-[var(--grey-800)] hover:text-[var(--grey-1200)]"
                )}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage("am")}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase transition cursor-pointer select-none",
                  locale === "am"
                    ? "bg-[var(--grey-0)] text-[var(--grey-1200)] shadow-[0_1px_3px_rgba(0,0,0,0.1)] font-semibold"
                    : "text-[var(--grey-800)] hover:text-[var(--grey-1200)]"
                )}
              >
                አማ
              </button>
            </div>

            <div className="hidden md:block">
              <Link
                to="/register"
                search={(prev) => prev}
                className="agy-btn agy-btn-primary text-[12.5px]"
              >
                {t("nav_register", "Register Now")} <ArrowUpRight size={13} />
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
        </div>

        {open && (
          <div className="border-t border-[var(--border)] py-2 md:hidden">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                search={(prev) => prev}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--grey-1200)] hover:bg-[var(--grey-15)]"
              >
                {getLocalizedLabel(link.label)}
              </Link>
            ))}
            <div className="mt-2 px-3 pb-2">
              <Link
                to="/register"
                search={(prev) => prev}
                onClick={() => setOpen(false)}
                className="agy-btn agy-btn-primary w-full text-[12.5px] justify-center"
              >
                {t("nav_register", "Register Now")} <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

