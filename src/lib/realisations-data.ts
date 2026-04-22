export type RealisationCategory = "web" | "ecommerce" | "seo" | "ads";

export type RealisationMetric = {
  value: string;
  label: string;
};

export type Realisation = {
  slug: string;
  title: string;
  client: string;
  category: RealisationCategory;
  year: number;
  summary: string;
  tags: string[];
  image: { src: string; alt: string };
  metrics: RealisationMetric[];
  url?: string;
  featured?: boolean;
};

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const REALISATIONS: Realisation[] = [
  {
    slug: "luxe-timeless",
    title: "Luxe Timeless",
    client: "Maison horlogère — Paris",
    category: "ecommerce",
    year: 2025,
    summary:
      "Refonte complète d'une boutique Shopify haut de gamme avec parcours d'achat sur-mesure, checkout express et intégration CRM.",
    tags: ["Shopify", "Branding", "CRO"],
    image: {
      src: u("photo-1523275335684-37898b6baf30"),
      alt: "Montre de luxe sur fond noir",
    },
    metrics: [
      { value: "+187%", label: "Ventes 6 mois" },
      { value: "3.2x", label: "Panier moyen" },
      { value: "98", label: "Lighthouse" },
    ],
    featured: true,
  },
  {
    slug: "atelier-bois",
    title: "Atelier Bois",
    client: "Menuiserie artisanale — Lyon",
    category: "web",
    year: 2025,
    summary:
      "Site vitrine élégant avec galerie de réalisations, formulaire de devis intelligent et Google My Business optimisé.",
    tags: ["WordPress", "Local SEO"],
    image: {
      src: u("photo-1533090161767-e6ffed986c88"),
      alt: "Atelier de menuiserie avec bois naturel",
    },
    metrics: [
      { value: "+240%", label: "Demandes devis" },
      { value: "#1", label: "Mots-clés locaux" },
    ],
  },
  {
    slug: "nova-fitness",
    title: "Nova Fitness",
    client: "Équipement sportif — DTC",
    category: "ecommerce",
    year: 2024,
    summary:
      "Lancement d'une marque DTC de matériel de fitness, boutique Shopify connectée à TikTok Shop et influenceurs.",
    tags: ["Shopify", "DTC", "TikTok Shop"],
    image: {
      src: u("photo-1534438327276-14e5300c3a48"),
      alt: "Homme soulevant des haltères en salle de sport",
    },
    metrics: [
      { value: "450K€", label: "CA année 1" },
      { value: "2.8%", label: "Taux conv." },
    ],
  },
  {
    slug: "maison-eva",
    title: "Maison Eva",
    client: "Mode féminine durable",
    category: "ecommerce",
    year: 2024,
    summary:
      "Boutique Shopify dédiée à une créatrice indépendante, design éditorial, drops mensuels et fidélisation.",
    tags: ["Shopify", "Editorial", "Email"],
    image: {
      src: u("photo-1558769132-cb1aea458c5e"),
      alt: "Mannequin portant une robe moderne minimaliste",
    },
    metrics: [
      { value: "+312%", label: "Trafic mensuel" },
      { value: "28%", label: "Newsletter" },
    ],
  },
  {
    slug: "studio-lumen",
    title: "Studio Lumen",
    client: "Agence photo — Bordeaux",
    category: "web",
    year: 2025,
    summary:
      "Portfolio immersif full-screen, animations fluides, pages projets scrollables et prise de contact par créneau.",
    tags: ["Next.js", "Motion", "Cal.com"],
    image: {
      src: u("photo-1606983340126-99ab4feaa64a"),
      alt: "Appareil photo reflex posé sur un bureau minimaliste",
    },
    metrics: [
      { value: "x4", label: "Demandes clients" },
      { value: "100", label: "Performance" },
    ],
  },
  {
    slug: "visionx-saas",
    title: "VisionX",
    client: "SaaS B2B — Analytics",
    category: "seo",
    year: 2024,
    summary:
      "Stratégie SEO programmatique sur 380 pages de comparaison, netlinking éditorial et refonte technique.",
    tags: ["SEO", "Content", "Netlinking"],
    image: {
      src: u("photo-1551288049-bebda4e38f71"),
      alt: "Tableau de bord analytics avec graphiques",
    },
    metrics: [
      { value: "+540%", label: "Trafic organique" },
      { value: "340", label: "Mots-clés top 3" },
    ],
  },
  {
    slug: "greeneats",
    title: "GreenEats",
    client: "Livraison repas bio",
    category: "ads",
    year: 2025,
    summary:
      "Campagnes Google Ads + Meta pour le lancement d'un service de livraison urbain. Tracking complet et A/B créa.",
    tags: ["Google Ads", "Meta Ads", "Tracking"],
    image: {
      src: u("photo-1490645935967-10de6ba17061"),
      alt: "Bol de salade healthy avec ingrédients frais",
    },
    metrics: [
      { value: "3.8€", label: "CAC" },
      { value: "5.2x", label: "ROAS" },
    ],
  },
  {
    slug: "tekno-lab",
    title: "Tekno Lab",
    client: "Blog tech & tutoriels",
    category: "seo",
    year: 2025,
    summary:
      "Migration d'un blog legacy vers Next.js, schéma structuré, maillage interne et stratégie editoriale tech.",
    tags: ["SEO technique", "Next.js", "Schema"],
    image: {
      src: u("photo-1542831371-29b0f74f9713"),
      alt: "Écran d'ordinateur avec du code colorisé",
    },
    metrics: [
      { value: "+780%", label: "Impressions" },
      { value: "62", label: "Backlinks DA70+" },
    ],
  },
  {
    slug: "cora-clinic",
    title: "Cora Clinic",
    client: "Centre esthétique — Nice",
    category: "ads",
    year: 2024,
    summary:
      "Acquisition locale Google Ads ciblée, landing pages dédiées par soin, et suivi des rendez-vous téléphoniques.",
    tags: ["Google Ads", "Landing", "Call tracking"],
    image: {
      src: u("photo-1570172619644-dfd03ed5d881"),
      alt: "Salle de clinique moderne avec équipement esthétique",
    },
    metrics: [
      { value: "+84", label: "RDV / mois" },
      { value: "2.1€", label: "Coût par lead" },
    ],
  },
];

export const CATEGORY_LABELS: Record<RealisationCategory, string> = {
  web: "Sites internet",
  ecommerce: "E-commerce",
  seo: "SEO",
  ads: "Google Ads",
};

export const CATEGORY_ACCENT: Record<RealisationCategory, string> = {
  web: "from-pink-500/20 to-purple-500/20",
  ecommerce: "from-amber-500/20 to-pink-500/20",
  seo: "from-blue-500/20 to-cyan-500/20",
  ads: "from-emerald-500/20 to-teal-500/20",
};
