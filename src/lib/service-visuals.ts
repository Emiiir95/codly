import type { ServiceId } from "./services";

type ServiceVisual = {
  hero: { src: string; alt: string };
  showcase: Array<{ src: string; alt: string }>;
};

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const SERVICE_VISUALS: Record<ServiceId, ServiceVisual> = {
  web: {
    hero: {
      src: u("photo-1517180102446-f3ece451e9d8"),
      alt: "Maquette de site web moderne sur ordinateur portable",
    },
    showcase: [
      { src: u("photo-1498050108023-c5249f4df085", 800), alt: "Code éditeur" },
      { src: u("photo-1522542550221-31fd19575a2d", 800), alt: "Design web" },
      { src: u("photo-1559028012-481c04fa702d", 800), alt: "Wireframes UI" },
    ],
  },
  seo: {
    hero: {
      src: u("photo-1460925895917-afdab827c52f"),
      alt: "Tableau de bord analytics SEO",
    },
    showcase: [
      { src: u("photo-1551288049-bebda4e38f71", 800), alt: "Graphiques data" },
      { src: u("photo-1543286386-713bdd548da4", 800), alt: "Analytics" },
      { src: u("photo-1432888622747-4eb9a8efeb07", 800), alt: "Recherche Google" },
    ],
  },
  vitrine: {
    hero: {
      src: u("photo-1467232004584-a241de8bcf5d"),
      alt: "Site vitrine professionnel",
    },
    showcase: [
      { src: u("photo-1499951360447-b19be8fe80f5", 800), alt: "WordPress" },
      { src: u("photo-1551434678-e076c223a692", 800), alt: "Équipe digitale" },
      { src: u("photo-1460472178825-e5240623afd5", 800), alt: "Design propre" },
    ],
  },
  ecommerce: {
    hero: {
      src: u("photo-1556742049-0cfed4f6a45d"),
      alt: "E-commerce Shopify boutique",
    },
    showcase: [
      { src: u("photo-1472851294608-062f824d29cc", 800), alt: "Produits" },
      { src: u("photo-1607082348824-0a96f2a4b9da", 800), alt: "Panier en ligne" },
      { src: u("photo-1556742031-c6961e8560b0", 800), alt: "Boutique moderne" },
    ],
  },
  "sur-mesure": {
    hero: {
      src: u("photo-1555066931-4365d14bab8c"),
      alt: "Développement sur-mesure avec code",
    },
    showcase: [
      { src: u("photo-1517694712202-14dd9538aa97", 800), alt: "Code source" },
      { src: u("photo-1550439062-609e1531270e", 800), alt: "Architecture" },
      { src: u("photo-1461749280684-dccba630e2f6", 800), alt: "Développement" },
    ],
  },
  ads: {
    hero: {
      src: u("photo-1533750516457-a7f992034fec"),
      alt: "Campagne Google Ads et marketing digital",
    },
    showcase: [
      { src: u("photo-1563013544-824ae1b704d3", 800), alt: "Performance ads" },
      { src: u("photo-1611926653458-09294b3142bf", 800), alt: "Conversions" },
      { src: u("photo-1551836022-d5d88e9218df", 800), alt: "ROI marketing" },
    ],
  },
  social: {
    hero: {
      src: u("photo-1611162617213-7d7a39e9b1d7"),
      alt: "Réseaux sociaux et contenus sur mobile",
    },
    showcase: [
      { src: u("photo-1611162616475-46b635cb6868", 800), alt: "Feed Instagram" },
      { src: u("photo-1542744173-8e7e53415bb0", 800), alt: "Création contenu" },
      { src: u("photo-1611605698335-8b1569810432", 800), alt: "Engagement" },
    ],
  },
};
