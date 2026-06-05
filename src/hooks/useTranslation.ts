import { useRouterState, useNavigate } from "@tanstack/react-router";
import translationsRaw from "../content/translations.json";

const translations = translationsRaw as Record<string, Record<string, string>>;

export function useTranslation() {
  const state = useRouterState();
  const search = state.location.search as any;
  const locale = (search.lang === "am" ? "am" : "en") as "en" | "am";
  const navigate = useNavigate();

  const t = (key: string, defaultText?: string): string => {
    const translationGroup = translations[locale];
    if (translationGroup && translationGroup[key] !== undefined) {
      return translationGroup[key];
    }
    const defaultGroup = translations["en"];
    if (defaultGroup && defaultGroup[key] !== undefined) {
      return defaultGroup[key];
    }
    return defaultText ?? key;
  };

  const changeLanguage = (lang: "en" | "am") => {
    navigate({
      search: (prev: any) => ({ ...prev, lang }),
    });
  };

  return { t, locale, changeLanguage };
}
