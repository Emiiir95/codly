---
title: "Web accessibility: the pragmatic guide to compliance"
description: "WCAG 2.2, European Accessibility Act. What you need to do concretely to make your site accessible in 2026."
date: "2026-01-05"
author: "Agency"
cover: "https://images.unsplash.com/photo-1573496546038-82f9c39f6365?auto=format&fit=crop&w=1600&q=80"
coverAlt: "Person using a screen reader on a computer"
tags: ["Accessibility", "WCAG", "Compliance"]
---

Since **June 28, 2025**, the European Accessibility Act makes accessibility mandatory for many commercial European sites. In 2026, compliance is no longer optional.

## Who's concerned?

- E-commerce sites
- Online banking services
- Transport and ticketing platforms
- Public services (already covered by RGAA in France)

**Small businesses** (< 10 employees and < €2M revenue) are exempt, but nothing stops them from being accessible.

## The standards

- **WCAG 2.2**: international standard (3 levels: A, AA, AAA). Target = **AA**.
- **EN 301 549**: European harmonized standard.
- **RGAA 4.1**: French public-sector implementation.

## The 10 rules covering 80% of cases

1. **All images have a relevant `alt`** (or `alt=""` if decorative)
2. **Colors meet a contrast ratio** of 4.5:1 minimum (AA)
3. **The whole site is keyboard-navigable** (Tab, Enter, Space, arrows)
4. **Focus is visible** (clear outline on interactive elements)
5. **Forms have explicit labels** and descriptive errors
6. **Heading hierarchy is clean** (single H1, then H2, H3…)
7. **Links and buttons have clear labels** (no "click here")
8. **Videos have captions and/or transcription**
9. **The site works without JavaScript** for critical content
10. **Animations can be disabled** (`prefers-reduced-motion`)

![Hands typing on a computer keyboard, accessible navigation](https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80)

## Tools to audit

- **axe DevTools** (Chrome/Firefox extension): quick and precise scan
- **WAVE** (WebAIM): visual report on the page
- **Lighthouse** Accessibility tab: included in Chrome DevTools
- **VoiceOver** (Mac) / **NVDA** (Windows): real testing with a screen reader

## Dev best practices

- Use proper semantic tags (`<nav>`, `<main>`, `<article>`, `<button>` over `<div>`)
- Respect DOM order (no CSS `order` tricks breaking logic)
- Test with keyboard regularly, not just before launch
- Write **automated a11y tests** (jest-axe, Playwright)

## Legal sanctions

A non-compliant site may face:

- Administrative sanction up to **€25,000** (France, DGCCRF)
- Summary legal action to force compliance
- Reputation damage (public report)

## The accessibility statement

Mandatory for all sites concerned: a public document (dedicated page) stating:

- The compliance level achieved
- Non-compliant content and exemptions
- A contact to report an accessibility issue
- Recourse with the Defender of Rights

## Conclusion

Accessibility isn't a luxury — it's a **quality and legal standard**. An accessible site also ranks better (Google favors accessible sites) and converts more (improved UX for everyone).

Need an accessibility audit? [Contact us](/contact).
