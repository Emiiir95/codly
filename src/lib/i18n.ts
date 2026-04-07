import { createContext, useContext } from "react";
import { getLocale, type Locale } from "./site";

export type Translations = Record<string, unknown>;

export type I18nContextValue = {
  locale: Locale;
  t: (key: string) => string;
  raw: <T = unknown>(key: string) => T;
};

export const I18nContext = createContext<I18nContextValue | null>(null);

export const useI18n = (): I18nContextValue => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
};

export const useT = () => useI18n().t;

const resolve = (obj: Translations, dotted: string): unknown => {
  return dotted
    .split(".")
    .reduce<unknown>(
      (acc, key) =>
        acc && typeof acc === "object" && key in (acc as Record<string, unknown>)
          ? (acc as Record<string, unknown>)[key]
          : undefined,
      obj,
    );
};

export const buildI18n = (
  locale: string | undefined,
  translations: Translations,
): I18nContextValue => {
  const loc = getLocale(locale);
  return {
    locale: loc,
    t: (key) => {
      const value = resolve(translations, key);
      return typeof value === "string" ? value : key;
    },
    raw: <T = unknown,>(key: string) => resolve(translations, key) as T,
  };
};
