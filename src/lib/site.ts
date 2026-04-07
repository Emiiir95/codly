export const SITE = {
  name: "Agency",
  domain: "https://agency.example.com",
  email: "contact@agency.example.com",
  phone: "+33 1 23 45 67 89",
  address: {
    street: "12 rue de la République",
    city: "Paris",
    postalCode: "75001",
    country: "FR",
  },
  social: {
    twitter: "https://twitter.com/agency",
    linkedin: "https://www.linkedin.com/company/agency",
    github: "https://github.com/agency",
  },
  defaultLocale: "fr" as const,
  locales: ["fr", "en", "es"] as const,
  founded: "2018",
} as const;

export type Locale = (typeof SITE.locales)[number];

export const isLocale = (value: string | undefined): value is Locale =>
  !!value && (SITE.locales as readonly string[]).includes(value);

export const getLocale = (value: string | undefined): Locale =>
  isLocale(value) ? value : SITE.defaultLocale;
