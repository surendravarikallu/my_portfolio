# Developer Portfolio

A modern, highly interactive, and production-ready developer portfolio built with the **Next.js 14 (App Router)**. This repository houses a responsive, performant single-page application (SPA) architecture augmented with custom routing for specific use cases (like a secure resume viewer).

This document serves as an architectural blueprint for AI assistants and human developers to understand the structure, components, state management, and custom logic applied throughout the application without needing visual screenshots.

---

## 🛠 Tech Stack Core
- **Framework:** Next.js 14+ (React 18), utilizing the new App Router (`app/` directory).
- **Language:** TypeScript for strict typing and scalable component interfaces.
- **Styling:** Tailwind CSS (utility-first, responsive by default, deeply integrated with custom `tailwind.config.ts` themes).
- **Animations:** Framer Motion (page transitions, scroll reveals, complex timeline animations).
- **3D Graphics:** React Three Fiber & Three.js (dynamic, interactive background geometries).
- **Icons:** Lucide React (`npm install lucide-react`).
- **Deployment:** Optimized for Vercel with custom `.dev` domain integration.

---

## 📂 Project Architecture & Routing

The project follows a component-centric composition model. Instead of relying on a CMS or external databases, the content (Experience, Projects, Certifications, Skills) is structurally hardcoded into arrays within their respective component files to ensure zero-latency initial loads and statically generated optimization.

### Directory Structure Overview
```text
├── app/
│   ├── layout.tsx         -> Global layout, HTML document scaffolding, layout wrapper, global Metadata/SEO tags.
│   ├── page.tsx           -> Main entry point. Stacks all the section components logically.
│   ├── globals.css        -> Tailwind directives and custom root CSS variables.
│   └── resume/
│       └── page.tsx       -> Isolated route (`/resume`) implementing a strict view-only DRM-protected document viewer.
│
├── components/
│   ├── animations/
│   │   └── ScrollReveal.tsx -> Wrapper component that hooks into standard Framer Motion `whileInView` observers for fade-in/slide-up effects.
│   ├── ui/
│   │   ├── shimmer-button.tsx -> Custom animated call-to-action button used in Hero.
│   │   └── spotlight-card.tsx -> Reusable wrapper providing a glassmorphism aesthetic with a functional hover-based gradient spotlight effect.
│   └── 3d/
│       └── HeroScene.tsx      -> R3F Canvas rendering the interactive geometric background of the Hero section.
│
├── ... (public/ assets, configurations, package.json)
```

---

## 🧩 Core Sections Breakdown

The main `app/page.tsx` seamlessly renders these components in the following chronological flow:

### 1. `Navbar` (`app/components/navbar.tsx`)
- **Logic:** Uses an `IntersectionObserver` coupled with `window.scrollY` tracking to automatically highlight the "active" section link based on proportional viewport visibility.
- **Features:** Desktop fixed header and a mobile hamburger menu overlay. Links to internal anchors (`#experience`, `#projects`) and standard external paths.

### 2. `HeroSection` (`app/components/hero-section.tsx`)
- **Logic:** Combines severe typography over a semi-transparent layer rendering against the React Three Fiber `HeroScene`. 
- **Features:** Integrates `framer-motion` to create parallax effects on text when the user moves their mouse. Includes standard CTAs ("View Projects" scrolling to `#projects`, and "View Resume" routing to `/resume`).

### 3. `AboutSection` (`app/components/about-section.tsx`)
- **Logic:** Standard structured text mapping the developer's background, philosophy, and engineering approach. Animated gently into view via `ScrollReveal`.

### 4. `SkillsSection` (`app/components/skills-section.tsx`)
- **Logic:** Data is decoupled into thematic arrays (Frontend, Backend, Database, Tools).
- **Features:** Renders precise, high-res developer logos dynamically queried from standard SVGs or CDNs (Devicon). Certain icons (like Express/GitHub) apply CSS inversion (`filter invert`) to maintain contrast on the deep dark background.

### 5. `ExperienceSection` (`app/components/experience-section.tsx`)
- **Logic:** Employs a complex Vertical Timeline layout.
- **Features:** Uses `map` to alternate SpotlightCards (`index % 2 === 0 ? "md:flex-row-reverse" : ""`). 
- **Data (Newest to Oldest):**
  1. Hackathon Winner (Feb 2026)
  2. Google Student Ambassador (Aug 2025 - Dec 2025)
  3. Full Stack Intern (June 2025 - July 2025)
  4. Web Dev Intern (May 2025 - June 2025)

### 6. `ProjectsSection` (`app/components/projects-section.tsx`)
- **Logic:** Segmented precisely into "Featured Projects" (Skillnox, StudentConnect) and "Other Projects".
- **Features:** Featured cards use explicit `flex-col` and `flex-grow` with `h-full` paradigms to guarantee strictly even row heights regardless of text density. Includes responsive image arrays and bulleted feature impacts.

### 7. `CertificatesSection` (`app/components/certificates-section.tsx`)
- **Logic:** Arranged explicitly across a multi-column CSS grid. 
- **Features:** The data array forces thematic logical grouping:
  - Row 1: Hackathon & Google Student Ambassador
  - Row 2: Codegnan (Web Dev) & Cognifyz (Full Stack)
  - Row 3: IIT Bombay TechFest & Google DevFest
  - Row 4/5: HackerRank SQL, Oracle Gen AI Professional, Oracle AI Foundations
- Implements custom interactive buttons reflecting relevant endpoints (e.g., standard "View Certificate", "View on LinkedIn", "View Project").

### 8. `ContactSection` (`app/components/contact-section.tsx`)
- **Logic:** Footer CTA containing heavily gradient-styled links (Email `mailto:`, LinkedIn, GitHub, Domain).

---

## 🔒 Special Logic: Secure Resume Viewer
**Path:** `app/resume/page.tsx`

This route handles a custom PDF embedded view specifically designed to restrict copying, text selection, and native downloading.
- **Implementation Strategy:** It relies strictly on an `iframe` rendering the raw `/resume.pdf` with the toolbar disabled via URL query arguments (`#toolbar=0&navpanes=0`).
- **Responsive Sizing Math:** The iframe parent uses a CSS constraint (`aspectRatio: '1 / 2.92'`) manually calculated to match the exact mathematical bounds of a two-page standard A4 PDF document scaled horizontally (`view=FitH`). This ensures the bottom of the PDF never clips on wide (desktop) screens, and never leaves white space on narrow (mobile) screens.
- **Scrollbar Elimination:** The `iframe` is forced slightly larger via `width: calc(100% + 20px)`. This CSS hack shoves the browser's native rigid PDF scrollbar out of the `overflow-hidden` bounding box constraint, rendering it invisible. Only standard UI smooth scrolling applied to the parent `div` operates.
- **DRM Protection:** An absolute `.inset-0.z-10` transparent `div` layer sits atop the iframe. It intercepts all mouse interaction arrays via `onContextMenu={e => e.preventDefault()}` and blocks text selection via Tailwind's `select-none`, rendering "Right-Click -> Save As" and highlighting impossible while still passing general scrollwheel events linearly.

---

## ⚙️ AI Extensibility Notes / Best Practices
- **Styling Changes:** If extending components, prioritize Tailwind classes. Do not drop into raw CSS (`globals.css`) unless establishing complex keyframe animations or root variables.
- **Modifying Data:** Simply locate the corresponding component file and append/modify the hardcoded data arrays (e.g., `experiences` or `certificates` objects). 
- **SEO/Metadata:** Always update `app/layout.tsx` metadata variables. Current metadata includes strict OpenGraph image mappings and custom domain mappings.
- **Icons:** Rely on `lucide-react` for standard UI iconography. For tech logos, map raw `.png`/`.svg` entries in `public/` directory or reference reliable CDNs.
