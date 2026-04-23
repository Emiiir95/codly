export const SITE = {
  name: "Agency",
  domain: "https://agency.example.com",
  email: "contact@agency.example.com",
  phone: "+33 6 03 00 44 95",
  phones: ["+33 6 03 00 44 95", "+33 7 83 70 46 19"],
  address: {
    street: "60 rue François 1er",
    city: "Paris",
    postalCode: "75008",
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
