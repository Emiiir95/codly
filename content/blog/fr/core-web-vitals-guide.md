---
title: "Core Web Vitals : le guide complet pour optimiser votre site"
description: "LCP, INP, CLS : comprendre et optimiser les Core Web Vitals de Google étape par étape, sans jargon inutile."
date: "2026-02-15"
author: "Agency"
cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80"
coverAlt: "Graphiques de performance web sur un écran"
tags: ["Performance", "SEO", "Web Vitals"]
---

Les Core Web Vitals sont un signal de ranking Google depuis 2021. Un site lent est **systématiquement** désavantagé. Voici comment les maîtriser.

## Les 3 métriques de 2026

- **LCP (Largest Contentful Paint)** : temps pour afficher le plus gros élément visible. Objectif : **< 2,5 s**
- **INP (Interaction to Next Paint)** : réactivité aux interactions utilisateur. Objectif : **< 200 ms**
- **CLS (Cumulative Layout Shift)** : stabilité visuelle. Objectif : **< 0,1**

(INP a remplacé FID depuis mars 2024.)

## Optimiser le LCP

Le LCP est presque toujours une image ou un titre. Les leviers :

1. **Servir l'image du hero en WebP/AVIF** (70 % plus léger que JPEG)
2. **Preload** l'image hero dans le `<head>` : `<link rel="preload" as="image">`
3. **CDN** (Cloudflare, Bunny) pour servir les assets près de l'utilisateur
4. **Compression Brotli** des HTML/CSS/JS
5. **HTTP/2 ou HTTP/3** pour le multiplexing
6. **Hébergement** en PHP 8.3+ avec OPcache activé

## Optimiser l'INP

Le INP mesure le délai entre un clic/tap et le prochain rendu. Les leviers :

1. **Réduire le JavaScript côté client** (tree-shaking, code splitting)
2. **Différer les scripts tiers** (Google Analytics, chat, etc.) avec `defer` ou `async`
3. **Utiliser `requestIdleCallback`** pour les traitements non critiques
4. **Éviter les longs event listeners** bloquants dans le main thread
5. **Passer en SSR/SSG** plutôt qu'en SPA pure quand possible

![Rapport Lighthouse avec scores de performance](https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1400&q=80)

## Optimiser le CLS

Le CLS mesure les sauts de mise en page pendant le chargement. Les leviers :

1. **Toujours déclarer width/height** sur les images et iframes
2. **Réserver l'espace** pour les bannières de pub et widgets
3. **Utiliser `font-display: optional`** ou `swap` avec une font de fallback proche
4. **Éviter les insertions de contenu dynamique** au-dessus du contenu existant
5. **Précharger les fonts** critiques

## Les outils pour mesurer

- **PageSpeed Insights** (Lighthouse) : rapport synthétique public
- **Chrome DevTools > Performance** : analyse détaillée en dev
- **Search Console > Web Vitals** : données réelles de vos utilisateurs
- **WebPageTest** : pour des tests depuis différentes localisations
- **Chrome User Experience Report (CrUX)** : la source officielle de Google

## Les quick wins (1 journée)

- Convertir les images en WebP
- Ajouter `loading="lazy"` sur les images sous la ligne de flottaison
- Compresser/minifier le CSS et JS
- Mettre en cache les assets statiques (1 an)
- Préciser les dimensions de toutes les images

Ces 5 actions suffisent souvent à faire passer un site de **55 → 85** sur PageSpeed mobile.

## En conclusion

Les Core Web Vitals sont **simples à mesurer mais demandent de la rigueur** pour être maintenus dans le temps. Un site qui passe de 60 à 95 voit typiquement son trafic SEO augmenter de 15-25 % en 6 mois.

Besoin d'un audit performance ? [Contactez-nous](/contact).
