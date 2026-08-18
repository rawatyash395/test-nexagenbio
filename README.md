# NexaGen Bio - Precision Biology at the Molecular Frontier

> A production-grade, animation-driven biotechnology landing page built for the **Creative Frontend Developer Assignment (Task 01)**. NexaGen Bio represents a next-generation mRNA therapeutics and computational protein engineering platform - designed to institutional biotech standards.

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd nexagen-bio

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
# → Open http://localhost:3000

# 4. Production build & type-check
npm run build
npm run type-check
```

---

## 🛠️ Tech Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Framework** | Next.js (App Router) | 14.2.5 | SSR/SSG, file-based routing, RSC |
| **Language** | TypeScript | 5.5 (`strict: true`) | Full type safety across all components |
| **Styling** | Tailwind CSS | 3.4 | Custom HSL design tokens, responsive utilities |
| **3D Engine** | Three.js + `@react-three/fiber` + `@react-three/drei` | 0.166 / 8.17 / 9.108 | WebGL Molecular Field, 3D DNA Helix |
| **Scroll Engine** | GSAP 3 + ScrollTrigger | 3.12 | Pinned section timelines, scrubbed progress |
| **Smooth Scroll** | Lenis (`@studio-freight/lenis`) | 1.0.42 | Drift-free momentum scroll |
| **Animation** | Framer Motion | 11.3 | Reveals, card transitions, AnimatePresence |
| **Typography** | Space Grotesk · Plus Jakarta Sans · JetBrains Mono · Syne | `@fontsource` | Institutional biotech aesthetic |
| **Canvas** | HTML5 Canvas API | - | Interactive telemetry consoles |
| **SVG Animation** | React SVG + `requestAnimationFrame` | - | LNP cross-section simulator |

---

## 📁 Project Structure

```
nexagen-bio/
├── public/
│   └── bio-cursor-cell-light.png     # Custom logo / cursor asset
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout, font loading, BioCursor mount
│   │   ├── page.tsx                  # Section composition & page order
│   │   └── globals.css               # Design tokens, keyframes, base reset
│   ├── components/
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx       # 00 - 3D WebGL hero + kinetic typography
│   │   │   ├── AboutSection.tsx      # 01 - Light-mode lab microscope section
│   │   │   ├── TechnologySection.tsx # 02 - GSAP-pinned 4-stage pipeline consoles
│   │   │   ├── ProcessSection.tsx    # 03 - Step-by-step pipeline accelerator
│   │   │   ├── CapabilitiesSection.tsx # 04 - 6-module therapeutic pipeline
│   │   │   ├── StatisticsSection.tsx # 05 - rAF count-up telemetry metrics
│   │   │   ├── LnpCapsuleSection.tsx # 06 - Interactive LNP pH-release simulator
│   │   │   ├── PublicationsSection.tsx # 07 - Holographic research dossier vault
│   │   │   ├── CtaSection.tsx        # 08 - Partnership inquiry console
│   │   │   └── Footer.tsx            # Genomic ticker, teleport matrix, coordinates
│   │   ├── three/
│   │   │   ├── DnaScrollCanvas.tsx   # Scroll-reactive 3D DNA helix (WebGL)
│   │   │   ├── DnaModulesHelix.tsx   # Instanced helix geometry + spring physics
│   │   │   └── MolecularField.tsx    # Hero particle field with mouse parallax
│   │   └── ui/
│   │       ├── Navigation.tsx        # Fixed top bar + right-side vertical pagination
│   │       ├── BioCursor.tsx         # Tone-adaptive canvas cursor (365px diameter)
│   │       ├── RevealOnScroll.tsx    # Intersection Observer reveal wrapper
│   │       ├── StatCounter.tsx       # rAF-based animated number counter
│   │       └── PageIntro.tsx         # Pre-scroll loading intro sequence
│   ├── hooks/                        # Custom React hooks (scroll, reduced-motion, etc.)
│   ├── lib/                          # Utility functions
```

---

## 🧬 Section-by-Section Breakdown

### `00` - Hero Section
- Kinetic staggered typography: *"Rewriting Biology at Molecular Level."*
- Interactive **3D WebGL Molecular Field** with instanced particle shaders and real-time mouse parallax
- Animated platform status badge, magnetic CTA buttons, and institutional partner logos
- Scroll-linked opacity/scale transitions via GSAP

### `01` - About & Platform Science
- Atmospheric full-viewport transition into **Bio-Sage light mode** - evoking a high-resolution laboratory microscope
- Microscopic lens focus effects, molecular telemetry stat cards, and AI validation benchmarks
- Smooth gradient blend from obsidian dark → clinical sage without harsh color breaks

### `02` - Technology & Workflow Engine
- **GSAP ScrollTrigger pinned section** - 4-stage integrated pipeline:
  - **Discover** - AlphaFold2 target scanner with interactive heatmap grid and laser-corner reticle
  - **Engineer** - mRNA codon optimization visualizer with live GC content and CAI scoring
  - **Validate** - LNP delivery benchmarking panel with formulation comparison
  - **Scale** - Inline HPLC chromatogram PAT monitor with scrubbing cursor and peak detection
- Each stage features a live telemetry console (SVG/Canvas) with responsive state management

### `03` - Process & Pipeline Accelerator
- Modular step-by-step architecture from sequence generation through in vitro validation
- Animated connector lines and stage-gated progress indicators

### `04` - Capabilities & Integrated Modules
- 6-module alternating dual-column layout with hover micro-interactions
- Slender **3D DNA Helix weave** in matte bone porcelain with 4 floating biotech tablets
- Frame-rate independent sinusoidal spring physics for fluid lateral transitions

### `05` - Statistics & Clinical Impact
- `rAF`-based animated count-up metrics:
  - `99.8%` Structural Stability · `4.2×` Discovery Acceleration · `0.84Å` RMSD Accuracy · `12+` Clinical Candidates
- Glowing telemetry rings and benchmark performance comparison panels

### `06` - LNP pH-Responsive Release Simulator *(Interactive)*
- **SVG cross-section** of a Lipid Nanoparticle (ionisable LNP): PEG corona → ionisable lipid layer → helper lipid → mRNA cargo core
- **Draggable pH slider** (pH 4.0 → 7.4) simulates endosomal acidification in real-time:
  - Lipid shell rings visually destabilise (dashed break patterns appear)
  - mRNA cargo particles animate outward using `requestAnimationFrame`
  - Live biophysical metrics update: Encapsulation %, Release %, Zeta Potential (mV), Hydrodynamic Diameter (nm)
- pH–Release profile curve with a live tracking cursor
- Formulation metadata: DLin-MC3-DMA · DSPC · Chol · DMG-PEG2000 · N/P 6:1
- Fully responsive: fluid SVG, touch-enabled slider, adaptive label layout

### `07` - Scientific Research Dossiers
- **Holographic Cassette Vault** housing 6 peer-reviewed computational dossiers (`NXG-DOC.01` – `NXG-DOC.06`)
- Procedural holographic schematics (Spatial Matrix, LNP Cluster, RNA Loop, NOVA Core, Closed-Loop, Translation Ribbon)
- Interactive detail modal with abstract, author affiliations (MIT, Harvard, Broad, NexaGen), and direct DOI links

### `08` - CTA & Partnership Console
- 256-bit encrypted partnership inquiry console with program selector
- Direct scientist communication channel and clinical trust indicators

### Footer
- Real-time genomic codon ticker (`5'-AUG-CGU-GAC-UAA...`) with live UTC clock
- Interactive **6-card Biotech Teleport Matrix** for direct subsystem navigation
- Global hub coordinates (Cambridge HQ · San Francisco Labs)
- Compliance indicators: FDA 21 CFR Part 11 · ISO 9001:2015 · SOC-2
- Monumental semi-transparent wordmark `NEXAGEN BIO`

---

## 🎨 Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `brand-black` | `#060A08` | Deep obsidian base |
| `brand-accent` | `#6EFFC8` | Bioluminescent emerald - primary interactive color |
| `brand-white` | `#E6F6ED` | Off-white body text |
| `bio-sage` | `#EBF5F0` | Light-mode clinical background |
| `bone-porcelain` | `#F5F2EB` | 3D helix material |

### Typography

| Typeface | Role |
|---|---|
| **Space Grotesk** | Display headings |
| **Plus Jakarta Sans** | Body & UI text |
| **JetBrains Mono** | Telemetry readouts, console labels, metrics |
| **Syne** | Accent callouts |

### Navigation

The right-side vertical pagination tracks 9 sections (`00`–`08`) with:
- Active state: square bracket indicator
- Hover state: floating tooltip with section code + label
- Scroll spy via `IntersectionObserver` with `pin-spacer` GSAP support
- Full mobile drawer menu

---

## 🖱️ Cursor System

Custom **BioCursor** - a tone-adaptive canvas cursor that:
- Renders at a precise **365px visible diameter** regardless of section tone
- Automatically switches between dark-mode emerald and light-mode clinical variants
- Detects `.section-light` class on sections for seamless color transitions
- Disabled on touch devices

---

## ⚡ Performance & Accessibility

- **SSR-safe**: Three.js canvas components are dynamically imported client-side with `next/dynamic` and SSR fallbacks
- **Zero hydration blocking**: Physics loops run in `useFrame` / `requestAnimationFrame` outside React render cycles
- **`prefers-reduced-motion`**: All scroll-triggered animations and transitions respect the OS accessibility setting
- **Semantic HTML5**: Proper landmark elements (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`)
- **ARIA labels**: All interactive elements, navigation buttons, and custom controls are fully labelled
- **Keyboard navigation**: Focus outlines preserved across all interactive components

---

## 📄 License

© 2026 NexaGen Bio, Inc. All rights reserved.  
Built with Next.js 14, Three.js, GSAP, and Framer Motion.  
FDA 21 CFR Part 11 · ISO 9001:2015 Compliant.
