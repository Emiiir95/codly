---
title: "Accesibilidad web: la guía pragmática para estar en conformidad"
description: "WCAG 2.2, European Accessibility Act. Lo que hay que hacer concretamente para hacer tu sitio accesible en 2026."
date: "2026-01-05"
author: "Agency"
cover: "https://images.unsplash.com/photo-1573496546038-82f9c39f6365?auto=format&fit=crop&w=1600&q=80"
coverAlt: "Persona usando un lector de pantalla en un ordenador"
tags: ["Accesibilidad", "WCAG", "Conformidad"]
---

Desde el **28 de junio de 2025**, la European Accessibility Act hace la accesibilidad obligatoria para numerosos sitios comerciales europeos. En 2026, la conformidad ya no es opcional.

## ¿Quién está afectado?

- Sitios e-commerce
- Servicios bancarios online
- Plataformas de transporte y venta de entradas
- Servicios públicos (ya cubiertos por RGAA en Francia)

Las **pequeñas empresas** (< 10 empleados y < 2 M€ de facturación) están exentas, pero nada les impide ser accesibles.

## Los referenciales

- **WCAG 2.2**: estándar internacional (3 niveles: A, AA, AAA). Diana = **AA**.
- **EN 301 549**: estándar europeo armonizado.
- **RGAA 4.1**: declinación francesa del WCAG. Obligatorio para el sector público FR.

## Las 10 reglas que cubren el 80% de los casos

1. **Todas las imágenes tienen un `alt` pertinente** (o `alt=""` si son decorativas)
2. **Los colores respetan una ratio de contraste** de 4,5:1 mínimo (AA)
3. **Todo el sitio es navegable con teclado** (Tab, Enter, Espacio, flechas)
4. **El focus es visible** (outline claro en elementos interactivos)
5. **Los formularios tienen labels explícitos** y errores descriptivos
6. **La jerarquía de títulos es limpia** (un solo H1, luego H2, H3…)
7. **Enlaces y botones tienen etiquetas claras** (nada de "haz clic aquí")
8. **Los vídeos tienen subtítulos y/o transcripción**
9. **El sitio funciona sin JavaScript** para los contenidos críticos
10. **Las animaciones se pueden desactivar** (`prefers-reduced-motion`)

![Manos tecleando en un ordenador, navegación accesible](https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80)

## Las herramientas para auditar

- **axe DevTools** (extensión Chrome/Firefox): scan rápido y preciso
- **WAVE** (WebAIM): informe visual en la página
- **Lighthouse** pestaña Accessibility: incluido en Chrome DevTools
- **VoiceOver** (Mac) / **NVDA** (Windows): pruebas reales con lector de pantalla

## Buenas prácticas en desarrollo

- Usar las etiquetas semánticas correctas (`<nav>`, `<main>`, `<article>`, `<button>` mejor que `<div>`)
- Respetar el orden del DOM (sin trucos con `order` CSS que rompan la lógica)
- Probar con teclado regularmente, no solo antes del paso a producción
- Escribir **pruebas de accesibilidad automatizadas** (jest-axe, Playwright)

## Las sanciones arriesgadas

En Francia, un sitio no conforme puede arriesgarse a:

- Sanción administrativa de **25.000€** por la DGCCRF
- Acción en référé para obligar a la puesta en conformidad
- Daño a la reputación (informe público)

## La declaración de accesibilidad

Obligatoria para todos los sitios afectados: un documento público (página dedicada) que indique:

- El nivel de conformidad alcanzado
- Los contenidos no conformes y exenciones
- Un contacto para señalar un problema de accesibilidad
- Un recurso ante el Defensor de los derechos

## Conclusión

La accesibilidad no es un lujo, es un estándar de **calidad y de derecho**. Un sitio accesible es también un sitio que rankea mejor (Google favorece los sitios accesibles) y que convierte más (UX mejorada para todos).

¿Necesitas una auditoría de accesibilidad? [Contáctanos](/contact).
