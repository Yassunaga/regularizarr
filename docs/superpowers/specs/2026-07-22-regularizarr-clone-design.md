# RR Regularização — React Clone Design

**Date:** 2026-07-22
**Goal:** Pixel-perfect recreation of https://regularizarr.com/ as a React single-page app.

## Scope

Faithful clone of the single-page dark-themed marketing site for RR Regularização
(construction / INSS regularization, Brazil). All copy, structure, colors and fonts
match the original. The INSS simulator replicates the form UI but computes a **local
placeholder estimate** (no external API calls).

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS (design tokens matching the original)
- Single page composed of section components; static content lives in `src/data/`.

## Design tokens (extracted from source)

- Background gradient: `#0c0f14` → `#10141c`
- Primary (gold/amber): `#e1a32d`; button gradient `#efb94e` → `#d99a21`
- Card: `#151922`; card2: `#101722`; border: `#2b3444`
- Text: `#ffffff`; muted: `#a8b0bd`
- Fonts: Inter (simulator + body), Poppins (headings) via Google Fonts
- WhatsApp green: `#25D366`
- Radii: cards 24px, inputs 14px, buttons 16px

## Sections (top → bottom)

1. **Header** (sticky) — logo pill "Regularização" + anchor nav: Início, Simulador de INSS, Serviços, Depoimentos, Contato.
2. **Hero** (`#inicio`) — badge "Especialistas em Regularização de Obras"; H1 `Regularize sua obra com segurança e <em>reduza custos</em> com o INSS`; subtitle; CTAs: "Fale com um especialista" (WhatsApp) + "Simulação rápida e atendimento especializado" (→ #sobre); 3 stat cards (+110 Obras regularizadas / 100% Clientes satisfeitos / Todo Brasil); hero image with "✓ Atuação em todo o Brasil" tag.
3. **Simulador** (`#sobre`) — hero badge/title/points, main form card, hidden result card, "Por que fazer essa simulação?" info card.
4. **Quem Somos** — engineer photo card (Eng. Civil Rodrigo Ribeiro, CREA 35088-D/DF, +110 badge) + 3 about paragraphs.
5. **Serviços** (`#servico`) — 4 icon cards (Regularização INSS, Apuração/Redução, Emissão CND, Averbação).
6. **Vantagens** — 4 benefit cards (Segurança Jurídica, Valorização, Facilidade em Transações, Prevenção de Multas).
7. **Depoimentos** (`#depoimentos`) — 3 testimonial cards (José Almeida, Rafael Mendonça, Giovane Costa).
8. **Contato** (`#contato`) — email / phone / address cards.
9. **Footer** — © 2026 RR Regularização + tagline.
10. **Floating WhatsApp button** (fixed bottom-right).

## Simulator behavior (UI-only estimate)

Form fields (all replicated): responsável, categoria, dataInicio, dataFim,
destinação, tipoObra, estado, áreaConstruída, áreaComplementar.

On submit:
- `areaTotal = areaConstruida + areaComplementar`
- `vau = areaTotal × RATE_PER_M2` (a plausible per-m² construction unit value)
- `inssAPagar = vau × INSS_RATE` (a plausible aggregate rate)
- `mesReferencia` = current month/year
- Populate result card (Responsável, Tipo, Área total, VAU, Mês ref., Estado, datas, INSS estimado).
- Show alert "Em muitos casos, é possível reduzir legalmente até 90% desse custo."
- Build the same pre-filled WhatsApp link (number `5561998839992`) with simulation data.
- Values are labeled as estimates; **no network calls**.

## Assets

Reuse original hosted images by URL:
- Logo: `https://regularizarr.lovable.app/assets/logo-Bj1AecFe.png`
- Hero: `https://regularizarr.lovable.app/assets/hero-construction-BD0Ux-Mi.png`
- Engineer: `https://regularizarr.com/wp-content/uploads/2026/04/Imagem-Melhorada-1-scaled.png`

Service/benefit icons: inline Lucide-style SVGs (copied from source).

## File structure

```
src/
  components/
    Header.tsx, Hero.tsx, Simulator.tsx, About.tsx, Services.tsx,
    Benefits.tsx, Testimonials.tsx, Contact.tsx, Footer.tsx, WhatsAppButton.tsx
  data/ services.ts, benefits.ts, testimonials.ts, ufs.ts
  lib/ simulator.ts (estimate logic), whatsapp.ts
  App.tsx, main.tsx, index.css
```

## Out of scope

- Real INSS API / exact government formula.
- WordPress/Elementor byte-identical CSS (spacing is best-judgment where not public).
- Analytics (GTM, Meta Pixel), cookie/tracking scripts.

## Success criteria

- `npm run dev` serves the page; `npm run build` succeeds.
- All sections render with correct copy and dark+gold theme.
- Nav anchors smooth-scroll; responsive single-column on mobile.
- Simulator produces an estimate and a working WhatsApp link.
