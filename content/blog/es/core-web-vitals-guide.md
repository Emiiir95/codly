---
title: "Core Web Vitals: la guía completa para optimizar tu sitio"
description: "LCP, INP, CLS: entender y optimizar los Core Web Vitals de Google paso a paso, sin jerga innecesaria."
date: "2026-02-15"
author: "Agency"
cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80"
coverAlt: "Gráficos de rendimiento web en pantalla"
tags: ["Rendimiento", "SEO", "Web Vitals"]
---

Los Core Web Vitals son señal de ranking de Google desde 2021. Un sitio lento está **sistemáticamente** desfavorecido. Aquí cómo dominarlos.

## Las 3 métricas de 2026

- **LCP (Largest Contentful Paint)**: tiempo para mostrar el elemento visible más grande. Objetivo: **< 2,5s**
- **INP (Interaction to Next Paint)**: reactividad a las interacciones usuario. Objetivo: **< 200ms**
- **CLS (Cumulative Layout Shift)**: estabilidad visual. Objetivo: **< 0,1**

(INP reemplazó al FID desde marzo de 2024.)

## Optimizar el LCP

El LCP es casi siempre una imagen o un título. Las palancas:

1. **Servir la imagen hero en WebP/AVIF** (70% más ligera que JPEG)
2. **Preload** de la imagen hero en el `<head>`: `<link rel="preload" as="image">`
3. **CDN** (Cloudflare, Bunny) para servir los assets cerca del usuario
4. **Compresión Brotli** de HTML/CSS/JS
5. **HTTP/2 o HTTP/3** para el multiplexing
6. **Hosting** en PHP 8.3+ con OPcache activado

## Optimizar el INP

El INP mide el retardo entre un clic/tap y el siguiente render. Las palancas:

1. **Reducir el JavaScript del lado cliente** (tree-shaking, code splitting)
2. **Diferir los scripts de terceros** (Google Analytics, chat, etc.) con `defer` o `async`
3. **Usar `requestIdleCallback`** para procesos no críticos
4. **Evitar long event listeners** bloqueantes en el main thread
5. **Pasar a SSR/SSG** mejor que SPA pura cuando sea posible

![Informe Lighthouse con puntuaciones de rendimiento](https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1400&q=80)

## Optimizar el CLS

El CLS mide los saltos de layout durante la carga. Las palancas:

1. **Declarar siempre width/height** en imágenes e iframes
2. **Reservar el espacio** para banners publicitarios y widgets
3. **Usar `font-display: optional`** o `swap` con una font fallback cercana
4. **Evitar inserciones de contenido dinámico** sobre contenido existente
5. **Precargar las fonts críticas**

## Las herramientas para medir

- **PageSpeed Insights** (Lighthouse): informe sintético público
- **Chrome DevTools > Performance**: análisis detallado en dev
- **Search Console > Web Vitals**: datos reales de tus usuarios
- **WebPageTest**: pruebas desde diferentes ubicaciones
- **Chrome User Experience Report (CrUX)**: la fuente oficial de Google

## Los quick wins (1 día)

- Convertir imágenes a WebP
- Añadir `loading="lazy"` en imágenes bajo la línea de flotación
- Comprimir/minificar CSS y JS
- Cachear los assets estáticos (1 año)
- Precisar las dimensiones de todas las imágenes

Estas 5 acciones suelen llevar un sitio de **55 → 85** en PageSpeed móvil.

## Conclusión

Los Core Web Vitals son **simples de medir pero exigen rigor** para mantenerse en el tiempo. Un sitio que pasa de 60 a 95 suele ver su tráfico SEO crecer un 15-25% en 6 meses.

¿Necesitas una auditoría de rendimiento? [Contáctanos](/contact).
