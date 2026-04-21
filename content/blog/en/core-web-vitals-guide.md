---
title: "Core Web Vitals: the complete guide to optimize your site"
description: "LCP, INP, CLS: understand and optimize Google's Core Web Vitals step by step, without unnecessary jargon."
date: "2026-02-15"
author: "Agency"
cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80"
coverAlt: "Web performance graphs on a screen"
tags: ["Performance", "SEO", "Web Vitals"]
---

Core Web Vitals have been a Google ranking signal since 2021. A slow site is **systematically** disadvantaged. Here's how to master them.

## The 3 metrics of 2026

- **LCP (Largest Contentful Paint)**: time to display the largest visible element. Target: **< 2.5s**
- **INP (Interaction to Next Paint)**: responsiveness to user interactions. Target: **< 200ms**
- **CLS (Cumulative Layout Shift)**: visual stability. Target: **< 0.1**

(INP replaced FID in March 2024.)

## Optimizing LCP

LCP is almost always an image or a title. Levers:

1. **Serve the hero image in WebP/AVIF** (70% lighter than JPEG)
2. **Preload** the hero image in `<head>`: `<link rel="preload" as="image">`
3. **CDN** (Cloudflare, Bunny) to serve assets close to the user
4. **Brotli compression** of HTML/CSS/JS
5. **HTTP/2 or HTTP/3** for multiplexing
6. **Hosting** on PHP 8.3+ with OPcache enabled

## Optimizing INP

INP measures the delay between a click/tap and the next paint. Levers:

1. **Reduce client JavaScript** (tree-shaking, code splitting)
2. **Defer third-party scripts** (Google Analytics, chat, etc.) with `defer` or `async`
3. **Use `requestIdleCallback`** for non-critical processing
4. **Avoid long blocking event listeners** on the main thread
5. **Switch to SSR/SSG** over pure SPA when possible

![Lighthouse report with performance scores](https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1400&q=80)

## Optimizing CLS

CLS measures layout shifts during loading. Levers:

1. **Always declare width/height** on images and iframes
2. **Reserve space** for ad banners and widgets
3. **Use `font-display: optional`** or `swap` with a close fallback font
4. **Avoid inserting dynamic content** above existing content
5. **Preload critical fonts**

## Tools to measure

- **PageSpeed Insights** (Lighthouse): public synthetic report
- **Chrome DevTools > Performance**: detailed dev analysis
- **Search Console > Web Vitals**: real user data
- **WebPageTest**: tests from different locations
- **Chrome User Experience Report (CrUX)**: Google's official source

## Quick wins (1 day)

- Convert images to WebP
- Add `loading="lazy"` to below-the-fold images
- Compress/minify CSS and JS
- Cache static assets (1 year)
- Specify dimensions on all images

These 5 actions often take a site from **55 → 85** on mobile PageSpeed.

## Conclusion

Core Web Vitals are **simple to measure but require rigor** to maintain over time. A site going from 60 to 95 typically sees its SEO traffic grow 15-25% in 6 months.

Need a performance audit? [Contact us](/contact).
