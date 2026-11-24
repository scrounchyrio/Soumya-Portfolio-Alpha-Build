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

## Resume media marquee

Drop image or video files into `public/media/resume-gallery/` and run the usual `npm run dev` or `npm run build`. The marquee discovers files from this folder automatically; add, replace, or remove files there without editing its component. Supported formats are `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.mp4`, and `.webm`. Files are naturally sorted, so optional prefixes such as `01-intro.webp` control their order.

Optional per-file metadata can be set in `public/media/resume-gallery/metadata.json`, keyed by the exact filename:

```json
{
  "02-project.mp4": {
    "alt": "A product animation in a studio environment",
    "poster": "/media/posters/project-preview.webp",
    "caption": "Product animation",
    "href": "https://example.com/project"
  }
}
```

The marquee reads this directory through `GET /api/resume-media` at runtime. Its reusable component also accepts an `items` array when you want to supply media from another source.

## Commands

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm start
```

Set `NEXT_DIST_DIR` to build or run into a different folder (useful for verifying a build beside a live server).
