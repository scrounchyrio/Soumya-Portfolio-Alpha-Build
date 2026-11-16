# SOUMYAJIT MUKHERJEE — EDITORIAL PORTFOLIO
### Heavily inspired by the Nothing Design Philosophy (`nothing.tech`)

[![Design Language: Nothing Light + Arshawn Arbabi](https://img.shields.io/badge/Design%20Language-Nothing%20Light%20(Pure%20White%20%2B%20Fluid%20Morph)-white?style=for-the-badge&logoColor=black)](https://nothing.tech)
[![Framework: Next.js 15](https://img.shields.io/badge/Framework-Next.js%2015%20App%20Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Animation: Framer Motion + Lenis](https://img.shields.io/badge/Motion-Framer%20Motion%20%2B%20Lenis-black?style=for-the-badge)](https://lenis.darkroom.engineering)

---

## 00 // DESIGN SYSTEM & PHILOSOPHY

This portfolio rebuilds Soumyajit Mukherjee's personal presence as a high-contrast, editorial-grade light-themed digital artifact inspired by **Nothing** (`https://in.nothing.tech/`) and the fluid design engineering of **Arshawn Arbabi** (`https://www.arshawnarbabi.com/`):

1. **Clean Light Palette with Nothing Crimson Red Accent**:
   - Crisp white background (`#FFFFFF` / `#FAFAFA`), frosted glass surfaces (`rgba(255, 255, 255, 0.75)` with `backdrop-blur-xl`), and subtle hairlines (`#E5E5E5` / `rgba(0, 0, 0, 0.08)`).
   - High-contrast near-black typography (`#111111`) for primary text, mid-gray (`#666666`) for secondary descriptions, and muted gray (`#86868B`) for technical coordinates.
   - Signature **Nothing Crimson Red** (`#D71921`) used for recording/status LEDs, coordinate markers, and key active states.
2. **Animated Background Layer (Arshawn Arbabi Fluid Morphing Bubbles)**:
   - Full-page background layer with slowly drifting, colorful fractal-like gradient bubbles (coral red, violet, cerulean, amber, and emerald) with organic fluid morphing edges (`border-radius` transitions).
   - Low opacity, heavy blur (`blur-[100px]`), and subtle technical dot-matrix grid overlay so all text stays 100% readable.
   - Floating micro-labels and telemetry tags that gently drift and oscillate across screen sectors.
   - GPU-accelerated, capped frame rate, `pointer-events: none`, and respects `prefers-reduced-motion`.
3. **Apple-Grade Typography**:
   - `-apple-system`, `BlinkMacSystemFont`, `SF Pro Display`, `SF Pro Text`, and `Inter` font stack.
   - Apple-style type scale with large light-weight hero headings, tight tracking (`-0.02em`), and comfortable line-height.
4. **Restrained but Bubbly & Tactile Motion**:
   - **Custom Reactive Cursor**: Near-black inner dot + trailing spring ring that dynamically scales and labels (`VIEW`, `CASE`, `OPEN`, `INSPECT`) when hovering over interactive targets. Auto-disabled on touch devices.
   - **Nothing OS Boot Splash**: Light-themed dot-matrix assembling sequence with live boot telemetry and skip capability.
   - **Magnetic Buttons**: Subtle cursor-gravitational pull on interactive actions.
   - **Tactile Lightbox Inspector**: Fullscreen modal with coordinate HUD, image viewer, and original asset hyperlinks.
   - **Lenis Smooth Scroll**: Silky momentum scrolling with automatic fallback for `prefers-reduced-motion`.

---

## 01 // BRAND ASSETS & "SM" MONOGRAM LOGO

The custom **SM Monogram** has been engineered specifically for this portfolio:
- **Construction**: A geometric 15×7 dot-matrix grid with inactive ghost LEDs and active pure white dots forming the letters **S** and **M**, terminated by a signature crimson red status dot (`#D71921`).
- **Files provided in `/public`**:
  - `public/favicon.svg` & `favicon.svg` — 48×48 high-contrast dot-matrix icon for browser tabs.
  - `public/logo-sm.svg` — Full horizontal monogram with Nothing hardware boundary and alignment crosshairs.
  - `public/logo-sm-dark.svg` — Pitch black background with white active LEDs.
  - `public/logo-sm-light.svg` — High-key editorial print variant with dark active LEDs.
  - `src/components/brand/MonogramLogo.tsx` — Interactive React SVG component with hover illumination and responsive scaling (`sm`, `md`, `lg`, `hero`).

---

## 02 // PROJECT ARCHITECTURE

```
├── data/
│   └── linkedin.json             # Cached / fallback LinkedIn telemetry feed
├── public/
│   ├── favicon.svg               # SM Monogram favicon
│   ├── logo-sm.svg               # Default Nothing-style SM logo
│   ├── logo-sm-dark.svg          # Dark variant logo
│   ├── logo-sm-light.svg         # Light variant logo
│   ├── images/
│   │   ├── soumyajit-portrait.jpg # Optional About photo
│   │   ├── icons/                # Reusable image icon assets
│   │   └── portfolio/            # Images automatically added to the gallery
│   └── Soumyajit_Mukherjee_Resume.pdf # Downloadable résumé PDF
├── scripts/
│   └── fetch-linkedin.mjs        # Node.js automated LinkedIn feed sync script
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── gallery/route.ts  # Lists images in public/images/portfolio
│   │   │   └── linkedin/route.ts # Next.js serverless feed API route
│   │   ├── globals.css           # Nothing design system styles & textures
│   │   ├── layout.tsx            # Root layout, fonts, JSON-LD Person schema, SEO
│   │   ├── opengraph-image.tsx   # Dynamic OpenGraph 1200x630 social card
│   │   ├── page.tsx              # Home page assembling all sections
│   │   ├── robots.ts             # Robots.txt generator
│   │   └── sitemap.ts            # Dynamic sitemap generator
│   ├── components/
│   │   ├── brand/
│   │   │   ├── MonogramLogo.tsx  # Interactive dot-matrix monogram
│   │   │   └── SplashScreen.tsx  # Boot sequence splash animation
│   │   ├── sections/
│   │   │   ├── AboutSection.tsx  # Photo slot, bio, stats, resume, socials
│   │   │   ├── ContactSection.tsx# Direct terminal, live clock, copy email
│   │   │   ├── EducationSection.tsx# Nalanda MBA, Kolhan BA, Arena VFX
│   │   │   ├── ExperienceSection.tsx# Rich cards (UBU, WAF, UNGC, HMX, DNEG, MPC)
│   │   │   ├── Footer.tsx        # Coordinates, monogram, back-to-top
│   │   │   ├── GallerySection.tsx# Masonry visual artifacts with Lightbox
│   │   │   ├── HeroSection.tsx   # Oversized typography, marquee, action pills
│   │   │   ├── LinkedInSection.tsx# Telemetry stream with auto-sync status
│   │   │   ├── Navbar.tsx        # Sticky HUD navigation with mobile menu
│   │   │   └── SystemSpecsSection.tsx# Hardware-style technical skill matrix
│   │   └── ui/
│   │       ├── CustomCursor.tsx  # Dot + trailing ring with hover labels
│   │       ├── Lightbox.tsx      # Modal asset inspector
│   │       ├── MagneticButton.tsx# Tactile magnetic pull buttons
│   │       ├── NoiseOverlay.tsx  # Subtle film grain overlay
│   │       ├── SectionHeader.tsx # Asymmetric section numbering (01/, 02/...)
│   │       └── SmoothScroll.tsx  # Lenis smooth scrolling
└── site.config.ts                # SINGLE SOURCE OF TRUTH FOR ALL CONTENT
```

---

## 03 // HOW TO UPDATE CONTENT (`site.config.ts`)

You **never need to edit components** to update your content. Everything is centralized in [`site.config.ts`](site.config.ts):

### 1. Personal Information & Social Links
Open `site.config.ts` and modify `siteConfig.meta` and `siteConfig.socials`:
```typescript
meta: {
  name: "Soumyajit Mukherjee",
  title: "Soumyajit Mukherjee — Creative & Sustainability Portfolio",
  url: "https://your-custom-domain.com", // Replace before launch!
  email: "mukherjee.soumyajit.16@gmail.com",
  phone: "+91 89100 03750",
  coordinates: "22.5726° N, 88.3639° E",
}
```

### 2. Updating Experiences & Career Roles
Under `siteConfig.experiences`, update or append new roles:
- `organization`: Hyperlinked name of the company/institution.
- `orgUrl`: Official website URL (automatically gets `target="_blank"` and `↗` link icon).
- `role`: Job title.
- `period`: Formatted date range (e.g., `Jan 2026 – Feb 2026`).
- `description`: 2–3 line summary.
- `highlights`: Bulleted deliverables shown in the expandable highlights drawer.
- `skills`: Tech/skill tags (e.g. `["Green Hydrogen", "Katana", "PBR"]`).
- `logoText`: 3–4 letter monogram code displayed on the hardware badge (e.g., `DNEG`, `UNGC`).

### 3. Adding Projects & Case Studies
Under `siteConfig.projects`:
- `category`: `"policy" | "sustainability" | "vfx" | "design"` (matches category filter tabs).
- `metrics`: Array of telemetry statistics (e.g., `{ label: "Maps", value: "07" }`).
- `links`: Array of external links (`IMDb`, `ResearchGate`, `ArtStation`, `Live Demo`).

### 4. Updating Gallery Artworks
Under `siteConfig.gallery`:
- `aspectRatio`: `"square" | "wide" | "tall"` (controls the masonry layout sizing).
- Clicking any item in the gallery automatically opens the **Nothing Lightbox Inspector** with high-contrast metadata.

---

## 04 // HOW TO SWAP THE ABOUT PHOTO

1. Place your portrait photo at:
   ```
   public/images/soumyajit-portrait.jpg
   ```
2. (Optional) If your file has a different name or extension (e.g. `.png`, `.webp`), simply update line 98 in `site.config.ts`:
   ```typescript
   photo: {
     src: "/images/your-photo-name.webp",
     alt: "Soumyajit Mukherjee portrait",
     caption: "SPEC: SOUMYAJIT MUKHERJEE // KOLKATA (IN) // 22°34'N 88°21'E",
   }
   ```
3. If no photo file is found, the component automatically displays a high-tech Nothing camera viewfinder HUD placeholder without breaking layout!

## 05 // ADDING PORTFOLIO IMAGES & ICONS

- Add `.avif`, `.jpg`, `.jpeg`, `.png`, or `.webp` images to `public/images/portfolio/`. They are discovered automatically and appear in the gallery after refreshing the page. The filename becomes the gallery title (for example, `green-hydrogen-map.webp` becomes “Green hydrogen map”).
- Add reusable image icons to `public/images/icons/` and reference them in the app with a URL such as `/images/icons/my-icon.svg`.
- After adding files to a deployed site, redeploy so the new assets are included.

---

## 06 // LINKEDIN AUTO-SYNC SETUP

The **Latest from LinkedIn** section is built with a dual-layer auto-sync architecture:

### How it works:
1. **Frontend**: The `LinkedInSection` fetches `/api/linkedin`, which delivers cached recent posts with stale-while-revalidate headers (`s-maxage=3600`).
2. **API Endpoint** (`src/app/api/linkedin/route.ts`): Reads `data/linkedin.json` and returns the telemetry payload with HTTP cache headers.
3. **Automated Sync Script** (`scripts/fetch-linkedin.mjs`):
   - Queries an RSSHub/RSS-to-JSON bridge for your LinkedIn public posts.
   - Parses titles, snippets, publication dates, and tags.
   - Safely updates `data/linkedin.json` with the latest timestamp.
   - If offline or rate-limited, safely preserves curated posts without error.

### Running a Manual Sync:
To refresh the LinkedIn posts from your terminal anytime:
```bash
node scripts/fetch-linkedin.mjs
```
or via npm script:
```bash
npm run sync:linkedin
```

### Automating with GitHub Actions (Optional Cron):
To run this automatically once every 24 hours on GitHub:
Create `.github/workflows/sync-linkedin.yml`:
```yaml
name: Sync LinkedIn Posts
on:
  schedule:
    - cron: '0 6 * * *' # Every morning at 06:00 UTC
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: node scripts/fetch-linkedin.mjs
      - name: Commit & push if changed
        run: |
          git config user.name "Nothing Telemetry Bot"
          git config user.email "bot@soumyajit.design"
          git add data/linkedin.json
          git diff --quiet && git diff --staged --quiet || (git commit -m "chore(feed): sync latest linkedin posts" && git push)
```

---

## 07 // LOCAL DEVELOPMENT & BUILD

```bash
# 1. Run local development server
npm run dev

# 2. Build for production (compiles static pages & dynamic OG image)
npm run build

# 3. Test production build locally
npm run start
```

---

## 08 // DEPLOYMENT (NETLIFY / VERCEL)

### Deploying to Netlify:
The repository includes a ready-to-go `netlify.toml`.
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- Netlify Next.js Runtime plugin will automatically handle serverless routes (`/api/linkedin`) and dynamic OpenGraph image generation.

### Deploying to Vercel:
Push this repository to GitHub/GitLab and import it into [Vercel](https://vercel.com).
- Framework Preset: **Next.js**
- Everything configures automatically with zero extra setup.

---

## 09 // QUALITY BAR & AUDIT TARGETS

- **Performance**: Zero unoptimized images, CSS `@font-face` display swap, hardware accelerated transforms.
- **SEO**: Structured `JSON-LD` Person schema, OpenGraph 1200×630 dynamic generation, automated XML sitemap, `robots.txt`.
- **Accessibility**: Semantic HTML5 landmark structure, `skip-to-content` link, WCAG AA contrast on primary text, keyboard navigable Lightbox with `Escape` handler, `prefers-reduced-motion` compliance.

---

© 2026 Soumyajit Mukherjee. All rights reserved. Inspired by Nothing OS design philosophy.
