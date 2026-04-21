---
title: "Accessibilité web : le guide pragmatique pour être conforme"
description: "RGAA, WCAG 2.2, European Accessibility Act. Ce qu'il faut faire concrètement pour rendre votre site accessible en 2026."
date: "2026-01-05"
author: "Agency"
cover: "https://images.unsplash.com/photo-1573496546038-82f9c39f6365?auto=format&fit=crop&w=1600&q=80"
coverAlt: "Personne utilisant un lecteur d'écran sur un ordinateur"
tags: ["Accessibilité", "RGAA", "Conformité"]
---

Depuis le **28 juin 2025**, l'European Accessibility Act rend l'accessibilité obligatoire pour de nombreux sites commerciaux européens. En 2026, la conformité n'est plus optionnelle.

## Qui est concerné ?

- Les sites e-commerce
- Les services bancaires en ligne
- Les plateformes de transport et billetterie
- Les services publics (déjà couverts par le RGAA en France)

Les **TPE** (< 10 salariés et < 2 M€ de CA) sont exemptées, mais rien ne leur interdit d'être accessibles.

## Les référentiels

- **WCAG 2.2** : standard international (3 niveaux : A, AA, AAA). Cible = **AA**.
- **RGAA 4.1** : déclinaison française du WCAG. Obligatoire pour le secteur public FR.
- **EN 301 549** : standard européen harmonisé.

## Les 10 règles qui couvrent 80 % des cas

1. **Tous les images ont un `alt` pertinent** (ou `alt=""` si décoratives)
2. **Les couleurs respectent un ratio de contraste** de 4,5:1 minimum (AA)
3. **Tout le site est navigable au clavier** (Tab, Enter, Espace, flèches)
4. **Les focus sont visibles** (outline clair sur les éléments interactifs)
5. **Les formulaires ont des labels explicites** et des erreurs descriptives
6. **La hiérarchie des titres est propre** (un seul H1, puis H2, H3…)
7. **Les liens et boutons ont un libellé clair** (pas de "cliquez ici")
8. **Les vidéos ont sous-titres et/ou transcription**
9. **Le site fonctionne sans JavaScript** pour les contenus critiques
10. **Les animations peuvent être désactivées** (`prefers-reduced-motion`)

![Mains tapant sur un clavier d'ordinateur, navigation accessible](https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80)

## Les outils pour auditer

- **axe DevTools** (extension Chrome/Firefox) : scan rapide et précis
- **WAVE** (WebAIM) : rapport visuel sur la page
- **Lighthouse** onglet Accessibility : inclus dans Chrome DevTools
- **VoiceOver** (Mac) / **NVDA** (Windows) : tester réellement avec un lecteur d'écran

## Les bonnes pratiques côté développement

- Utiliser les bonnes balises sémantiques (`<nav>`, `<main>`, `<article>`, `<button>` plutôt que `<div>`)
- Respecter l'ordre du DOM (pas de tricheries avec `order` CSS cassant la logique)
- Tester au clavier régulièrement, pas juste avant le passage
- Écrire des **tests d'accessibilité automatisés** (jest-axe, Playwright)

## Les sanctions encourues

En France, un site non conforme peut risquer :

- Sanction administrative de **25 000 €** par la DGCCRF
- Action en référé pour obligation de mise en conformité
- Atteinte à la réputation (rapport public)

## La déclaration d'accessibilité

Obligatoire pour tous les sites concernés : un document public (page dédiée) qui indique :

- Le niveau de conformité atteint
- Les contenus non conformes et dérogations
- Un contact pour signaler un problème d'accessibilité
- Un recours auprès du Défenseur des droits

## En conclusion

L'accessibilité n'est pas un luxe, c'est un standard de **qualité et de droit**. Un site accessible est aussi un site qui ranke mieux (Google favorise les sites accessibles) et qui convertit davantage (UX améliorée pour tout le monde).

Besoin d'un audit d'accessibilité ? [Contactez-nous](/contact).
