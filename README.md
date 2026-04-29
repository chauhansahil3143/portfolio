# Zero-G Portfolio 🌌

A stunning Next.js portfolio for a Computer Engineer, themed **"Engineering in Zero-G"** — featuring a live Three.js physics background, glassmorphism UI, and Lighthouse-optimized performance.

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open in browser
open http://localhost:3000
```

Or use the convenience script:
```bash
bash start.sh
```

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| 3D Engine | Three.js (vanilla, no R3F overhead) |
| Language | TypeScript (strict) |
| Styling | Vanilla CSS with custom design tokens |
| Animations | CSS transitions + IntersectionObserver |
| Fonts | Space Grotesk · JetBrains Mono · Orbitron |

## 🌌 Features

### Zero-G Physics Background
- **55 geometric data packets** (tetrahedra, octahedra, icosahedra, boxes, tori)
- **Mouse gravity** — shapes are pulled toward your cursor with inverse-square law physics
- **Drift-back force** — shapes return to their origin positions
- **Delta-time integration** — buttery smooth at any frame rate
- **Star field** + pulsing colored lighting

### Glassmorphism UI
- `backdrop-filter: saturate(180%) blur(20px)` on About & Projects cards
- Semi-transparent backgrounds with subtle borders
- Depth via layered box shadows

### Lighthouse 100/100 Strategy
| Optimization | Technique |
|---|---|
| LCP | Three.js loaded via `next/dynamic` (no SSR) |
| CLS | All element sizes known at SSR time |
| FID/INP | Three.js canvas `pointer-events: none` |
| SEO | Full OG tags, semantic HTML, single H1/page |
| Accessibility | ARIA labels, roles, skip links |
| Caching | `Cache-Control: immutable` headers |
| Image format | AVIF + WebP via `next/image` |
| CSS | Inlined critical CSS, no render-blocking |
| Fonts | `preconnect` + `font-display: swap` |

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout + SEO metadata
│   ├── page.tsx          # Page composition (dynamic imports)
│   └── globals.css       # Full design system
└── components/
    ├── ZeroGCanvas.tsx   # Three.js physics background
    ├── Navbar.tsx        # Sticky nav + scroll progress
    ├── HeroSection.tsx   # Animated hero
    ├── AboutSection.tsx  # Glassmorphic bio + terminal card
    ├── ProjectsSection.tsx # 6 project cards with glass effect
    ├── SkillsSection.tsx # Animated skill bars
    ├── ContactSection.tsx # CTA + social links
    └── Footer.tsx        # Minimal footer
```

## 🎨 Design Tokens

```css
--c-void:    #02040a   /* background */
--c-glow:    #63d2ff   /* primary accent */
--c-accent:  #7c5cff   /* purple accent */
--c-pulse:   #00ffc8   /* green pulse */
--font-display: 'Orbitron'    /* headings */
--font-sans:    'Space Grotesk'
--font-mono:    'JetBrains Mono'
```

## 🚀 Production Build

```bash
npm run build
npm start
```
