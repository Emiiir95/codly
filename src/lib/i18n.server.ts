import fs from "node:fs";
import path from "node:path";
import { getLocale, type Locale } from "./site";
import type { Translations } from "./i18n";

const cache = new Map<Locale, Translations>();

export const loadTranslations = (locale: Locale): Translations => {
  const cached = cache.get(locale);
  if (cached) return cached;
  const file = path.join(
    process.cwd(),
    "public",
    "locales",
    locale,
    "common.json",
  );
  const raw = fs.readFileSync(file, "utf8");
  const parsed = JSON.parse(raw) as Translations;
  cache.set(locale, parsed);
  return parsed;
};

export const getI18nProps = (
  locale: string | undefined,
): { locale: Locale; translations: Translations } => {
  const loc = getLocale(locale);
  return { locale: loc, translations: loadTranslations(loc) };
};
