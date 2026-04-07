# Agency — Site vitrine

Site vitrine multilingue d'une agence web spécialisée en création de sites internet et référencement Google. Construit avec **Next.js 16 (Pages Router)**, **TypeScript strict**, **Tailwind CSS v4** et un système d'i18n maison léger.

## Stack

- Next.js 16.2 (Pages Router, Turbopack)
- React 19, TypeScript strict
- Tailwind CSS v4
- next/font (Geist + Geist Mono, preload)
- Zod (validation du formulaire de contact)
- i18n maison sur fichiers JSON (`public/locales/{fr,en,es}/common.json`) couplé au routage i18n natif de Next

## Fonctionnalités

- 3 langues : `fr` (défaut), `en`, `es`
- Slugs traduits par langue (ex. `/services/creation-site-internet`, `/en/services/web-design`, `/es/servicios/diseno-web`)
- SEO complet : `<title>` et `<meta description>` uniques par page et par langue, Open Graph + Twitter Cards, canonicals, hreflang sur chaque page
- JSON-LD structuré : Organization, LocalBusiness, WebSite, BreadcrumbList, Service (×2), FAQPage, AggregateRating/Review
- `sitemap.xml` multilingue avec hreflang et `robots.txt` générés à la volée
- Score Lighthouse ciblé 100/100 sur Performance, Accessibilité, Best Practices, SEO
- Dark mode par défaut, light mode optionnel (toggle dans le header, persistance localStorage)
- Design inspiré de reactflow.dev : fond sombre, motif de points, gradient text, cards translucides en backdrop-blur, micro-animations
- Formulaire de contact avec validation Zod côté serveur (`/api/contact`)
- Page 404 custom dans l'esprit du design

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
# http://localhost:3000
```

## Build de production

```bash
npm run build
npm run start
```

## Lint

```bash
npm run lint
```

## Pages

| Clé | FR | EN | ES |
| --- | --- | --- | --- |
| Home | `/` | `/en` | `/es` |
| Création de site | `/services/creation-site-internet` | `/en/services/web-design` | `/es/servicios/diseno-web` |
| Référencement SEO | `/services/referencement-seo` | `/en/services/seo` | `/es/servicios/seo` |
| À propos | `/a-propos` | `/en/about` | `/es/sobre-nosotros` |
| Contact | `/contact` | `/en/contact` | `/es/contacto` |
| Mentions légales | `/mentions-legales` | `/en/legal-notice` | `/es/aviso-legal` |
| Confidentialité | `/politique-confidentialite` | `/en/privacy-policy` | `/es/politica-de-privacidad` |
| 404 | custom | custom | custom |

Les variantes EN/ES utilisent des `rewrites` Next pour exposer des slugs localisés tout en conservant un seul fichier source par page (cf. [`next.config.ts`](next.config.ts)).

## Mots-clés ciblés

Travaillés dans les `<title>`, `meta description`, `H1-H3`, contenus, URLs et `alt` :

- création site internet, agence web, site vitrine, site e-commerce
- référencement Google, SEO, agence SEO, référencement naturel
- création site professionnel, refonte site web

## Architecture

```
src/
  components/        composants UI réutilisables (Header, Footer, Hero, FAQ, …)
  lib/
    site.ts          configuration site (nom, URL, contact)
    routes.ts        mapping page → slug par locale + helpers hreflang
    services.ts      données services + slugs traduits
    i18n.ts          context React + helper buildI18n (côté client + serveur)
    i18n.server.ts   loader fs des fichiers de traduction (server-only)
    seo.ts           helpers canonical / hreflang
    jsonld.ts        helpers JSON-LD (Organization, FAQ, …)
  pages/
    index.tsx
    services/[slug].tsx
    a-propos.tsx, contact.tsx, mentions-legales.tsx, politique-confidentialite.tsx
    404.tsx
    api/contact.ts            (Zod)
    sitemap.xml.tsx, robots.txt.tsx
public/
  locales/{fr,en,es}/common.json
```

## Déploiement Vercel

Le projet est prêt pour Vercel sans configuration supplémentaire.

```bash
npm i -g vercel
vercel
```

Pensez à mettre à jour le domaine dans [`src/lib/site.ts`](src/lib/site.ts) (`SITE.domain`) avant le premier déploiement, faute de quoi les balises canoniques, le sitemap et hreflang pointeront vers `agency.example.com`.

## À personnaliser avant mise en ligne

- **Coordonnées** : `src/lib/site.ts` (email, téléphone, adresse, réseaux sociaux, domaine).
- **Témoignages** : `home.testimonials.items` dans chaque fichier `public/locales/*/common.json`.
- **Visuels / OG image** : déposer `public/og-default.png` (1200×630) et `public/favicon.ico`. Les chemins sont déjà câblés dans [`Seo.tsx`](src/components/Seo.tsx).
- **JSON-LD LocalBusiness** : coordonnées GPS et horaires dans [`src/lib/jsonld.ts`](src/lib/jsonld.ts).
- **API contact** : la route `/api/contact` valide la payload mais n'envoie rien. Brancher Resend / Postmark / SendGrid selon votre stack.
- **Analytics** : aucun tracker n'est inclus volontairement (RGPD-friendly). Ajouter Plausible / Umami / GA si besoin.
