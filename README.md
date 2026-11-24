# Soumyajit Mukherjee, Portfolio

Single-page portfolio built with Next.js 15 (App Router), React 19, Tailwind CSS 3 and TypeScript.

## Design system

- Light editorial theme (warm paper background, near-black text). Tokens live in `tailwind.config.ts` (`canvas`, `fg`, `accent`) and `src/app/globals.css`.
- Type: Inter Tight (display and body), Instrument Serif italic (accent words), JetBrains Mono (labels). Loaded with `next/font`.
- Numbered sections (01 to 08), full-screen numbered menu, terminal-style intro that shows once per session.

## Motion

| Piece | File |
|---|---|
| Lenis smooth scroll, synced to the GSAP ticker | `src/components/ui/SmoothScroll.tsx` |
| GSAP + ScrollTrigger helpers, scroll lock, intro signal | `src/lib/motion.ts` |
| Masked word reveal | `src/components/ui/SplitReveal.tsx` |
| Scroll fade-up | `src/components/ui/Reveal.tsx` |
| Custom cursor (fine pointers only) | `src/components/ui/CustomCursor.tsx` |
| Magnetic buttons | `src/components/ui/MagneticButton.tsx` |
| Hero GLSL shader (raw WebGL, no Three.js) | `src/components/ui/HeroShader.tsx` |

Reduced-motion users get static content: no smooth scroll, no reveals, a still shader frame, no intro.

## Content and data

- All copy and links: `site.config.ts`.
- `GET /api/linkedin` serves `data/linkedin.json` (refresh it with `npm run sync:linkedin`).
- `GET /api/gallery` lists images in `public/images/portfolio/`.
- Add `public/images/soumyajit-portrait.jpg` to replace the monogram placeholder in the About section.

## Commands

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm start
```

Set `NEXT_DIST_DIR` to build or run into a different folder (useful for verifying a build beside a live server).
