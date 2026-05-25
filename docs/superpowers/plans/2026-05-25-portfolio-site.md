# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Dakota Mauza's complete portfolio site by converting `reference.html` into a Next.js 16 App Router site with TypeScript and plain CSS Modules.

**Architecture:** One-page server-rendered site with selective `"use client"` boundaries. Nav scroll state, Portfolio modal state, and ProjectModal interactions are the only client components. A silent `ScrollRevealInit` component runs `IntersectionObserver` on the client without forcing `page.tsx` to be a client component. Keyframes needed by CSS Modules are defined locally in each module (CSS Modules scope animation names — global keyframes in `globals.css` are for spec compliance but won't resolve across module boundaries).

**Tech Stack:** Next.js 16.2.6, React 19, TypeScript, CSS Modules (`*.module.css`), `next/font/google`

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `app/globals.css` | Replace | `:root` tokens, body reset, `body::before` noise, `.reveal`/`.visible`, `@keyframes`, shared section classes |
| `app/layout.tsx` | Replace | Fonts as CSS vars, metadata, `<Nav>`, `<html>`/`<body>` |
| `app/page.tsx` | Replace | Server component assembling all sections |
| `app/page.module.css` | Delete | Boilerplate — unused |
| `data/projects.ts` | Create | `Project` type + 12-item `projects` array |
| `data/skills.ts` | Create | `SkillCategory` type + 3-item `skillCategories` array |
| `hooks/useScrollReveal.ts` | Create | `IntersectionObserver` hook — adds `.visible` to `.reveal` elements |
| `components/Nav/Nav.tsx` | Create | `"use client"` — fixed nav with scroll listener |
| `components/Nav/Nav.module.css` | Create | Nav layout, scrolled state, responsive hide |
| `components/Hero/Hero.tsx` | Create | Server — full-viewport hero with botanical SVG, blobs, 2-col grid |
| `components/Hero/Hero.module.css` | Create | Hero layout, blobs, watermark, `heroIn`/`drift` keyframes |
| `components/Skills/Skills.tsx` | Create | Server — skill category cards from data |
| `components/Skills/Skills.module.css` | Create | 2-col layout, category cards, tag pills |
| `components/ProjectModal/ProjectModal.tsx` | Create | `"use client"` — slide-up panel, scroll lock, keyboard close |
| `components/ProjectModal/ProjectModal.module.css` | Create | Overlay, panel, slide animation |
| `components/Portfolio/Portfolio.tsx` | Create | `"use client"` — 12-card grid + `selectedProject` state |
| `components/Portfolio/Portfolio.module.css` | Create | Grid, card styles, `::before` accent-bar hover |
| `components/Contact/Contact.tsx` | Create | Server — centered contact section |
| `components/Contact/Contact.module.css` | Create | Contact layout, badge with `pulse` keyframe |
| `components/Footer/Footer.tsx` | Create | Server — light-bg2 footer |
| `components/Footer/Footer.module.css` | Create | Footer flex row |
| `components/ScrollRevealInit/ScrollRevealInit.tsx` | Create | `"use client"` — calls `useScrollReveal()`, renders `null` |

---

### Task 1: globals.css

**Files:**
- Replace: `app/globals.css`

- [ ] **Step 1: Replace app/globals.css**

```css
/* app/globals.css */

:root {
  --bg:         #0d1510;
  --bg2:        #111a13;
  --bg3:        #162019;
  --surface:    #1c2b1e;
  --surface2:   #243328;
  --border:     rgba(74, 124, 89, 0.22);
  --border2:    rgba(74, 124, 89, 0.1);
  --moss-dk:    #4a7c59;
  --moss:       #5e9970;
  --moss-lt:    #7aab8a;
  --stone:      #a8d5b5;
  --stone-lt:   #c8e8d4;
  --cream:      #e8e4d9;
  --text:       #cdd9c8;
  --text-dim:   #6b8f75;
  --warm:       #7aab8a;

  --light-bg:      #f4f7f2;
  --light-bg2:     #eaf0e6;
  --light-surface: #ffffff;
  --light-border:  rgba(74, 124, 89, 0.18);
  --light-text:    #2d4a35;
  --light-dim:     #6b8f75;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
  font-weight: 300;
  line-height: 1.7;
  overflow-x: hidden;
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 999;
  opacity: 0.35;
}

/* Scroll reveal */
.reveal {
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 0.75s ease, transform 0.75s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Animations — also defined locally in each CSS Module that references them */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes drift {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(30px, 20px) scale(1.06); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.8); }
}

@keyframes heroIn {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Shared section header classes */
section { position: relative; z-index: 1; }

.section-header { margin-bottom: 4rem; }

.section-eyebrow {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.section-num {
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 0.9rem;
  font-style: italic;
  color: var(--moss-lt);
}

.section-num.dark { color: var(--moss-dk); }

.section-line {
  width: 40px;
  height: 1px;
  background: var(--border);
}

.section-line.dark { background: var(--light-border); }

.section-label-text {
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--text-dim);
}

.section-label-text.dark { color: var(--light-dim); }

.section-title {
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: clamp(2.2rem, 3.5vw, 3.8rem);
  font-weight: 300;
  color: var(--cream);
  line-height: 1.1;
  letter-spacing: -0.01em;
}

.section-title.dark { color: var(--light-text); }

.section-title em { font-style: italic; color: var(--stone); }
.section-title.dark em { color: var(--moss-dk); }
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "feat: add global CSS tokens, reset, animations, shared section classes"
```

---

### Task 2: Data Layer

**Files:**
- Create: `data/projects.ts`
- Create: `data/skills.ts`

- [ ] **Step 1: Create data/projects.ts**

```ts
// data/projects.ts

export type Project = {
  id: number
  title: string
  description: string
  longDescription: string
  tech: string[]
  liveUrl?: string
  githubUrl?: string
  // imageUrl?: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Project Canopy',
    description: 'Real-time environmental data dashboard built for performance and clarity at scale.',
    longDescription:
      'An environmental monitoring dashboard that visualises live sensor data across multiple geographic regions. Built with React and D3.js for fluid chart transitions, with a Node.js backend streaming data via WebSockets.',
    tech: ['React', 'D3.js', 'Node'],
  },
  {
    id: 2,
    title: 'Mossy',
    description: 'Habit tracker with a calm, nature-inspired interface designed for gentle consistency.',
    longDescription:
      'A daily habit tracker built with a soft, nature-themed design system. Features streak tracking, custom habit categories, and a weekly calendar view. Prisma powers the data layer on a PostgreSQL database.',
    tech: ['Next.js', 'Tailwind', 'Prisma'],
  },
  {
    id: 3,
    title: 'Fieldwork',
    description: 'Freelance project management — proposals, invoicing, and client communication in one place.',
    longDescription:
      'An all-in-one tool for freelancers covering the full client lifecycle: proposal generation, contract signing, milestone tracking, time logging, and Stripe-powered invoicing. Built on React with Firebase for real-time sync.',
    tech: ['React', 'Firebase', 'Stripe'],
  },
  {
    id: 4,
    title: 'Shoreline',
    description: 'Headless CMS blog template with dark mode, full-text search, and tag filtering.',
    longDescription:
      'A production-ready blog starter built on Next.js and Sanity CMS. Ships with dark mode, full-text search powered by Sanity GROQ queries, tag-based filtering, and a custom rich-text renderer.',
    tech: ['Next.js', 'Sanity', 'TypeScript'],
  },
  {
    id: 5,
    title: 'Seedling',
    description: 'SaaS onboarding flow builder with drag-and-drop steps and conditional logic.',
    longDescription:
      'A no-code builder for SaaS onboarding flows. Product teams drag in steps, set conditions, and preview flows in real time. The backend stores flow definitions as JSON graphs in PostgreSQL.',
    tech: ['React', 'DnD Kit', 'PostgreSQL'],
  },
  {
    id: 6,
    title: 'Root & Branch',
    description: 'Family tree visualization with smooth zoom, search, and shareable snapshot exports.',
    longDescription:
      'A collaborative family tree app using D3.js for zoomable tree rendering on an HTML Canvas. Supports search across thousands of nodes, keyboard navigation, and PNG/SVG snapshot exports to share with family.',
    tech: ['React', 'D3.js', 'Canvas API'],
  },
  {
    id: 7,
    title: 'Clearwater',
    description: 'E-commerce storefront with advanced filtering and a fully custom checkout experience.',
    longDescription:
      'A Shopify-backed storefront built with Next.js and the Storefront GraphQL API. Features multi-faceted product filtering, cart persistence via localStorage, and a fully custom multi-step checkout without Shopify\'s default UI.',
    tech: ['Next.js', 'Shopify', 'GraphQL'],
  },
  {
    id: 8,
    title: 'Timber',
    description: 'Internal component library and design system, fully documented with Storybook.',
    longDescription:
      'A design system built for a product team of eight. Includes 40+ components built in React and Sass, documented in Storybook with live playground examples, accessibility annotations, and automated visual regression tests.',
    tech: ['React', 'Storybook', 'Sass'],
  },
  {
    id: 9,
    title: 'Watershed',
    description: 'Open source CLI for generating typed API clients from OpenAPI specs. 400+ GitHub stars.',
    longDescription:
      'A Node.js CLI that reads OpenAPI 3.x specs and outputs fully-typed TypeScript clients. Supports plugins for custom output templates. Published to npm and maintained as open source with 400+ GitHub stars.',
    tech: ['Node.js', 'TypeScript', 'OSS'],
  },
  {
    id: 10,
    title: 'Grove',
    description: 'Community platform for urban gardeners with real-time messaging and plant ID.',
    longDescription:
      'A community app for urban gardeners featuring posts, plant identification via an image API, neighbourhood maps, and real-time direct messaging via Socket.io. Built with React and an Express REST API.',
    tech: ['React', 'Socket.io', 'Express'],
  },
  {
    id: 11,
    title: 'Fern',
    description: 'Markdown editor with live preview, version history, and one-click GitHub Pages publishing.',
    longDescription:
      'A desktop Markdown editor built with Electron and CodeMirror. Features split-pane live preview, local version history stored in SQLite, and a one-click publish flow that pushes to a GitHub Pages repo via the GitHub REST API.',
    tech: ['Electron', 'CodeMirror', 'GitHub API'],
  },
  {
    id: 12,
    title: 'Underbrush',
    description: 'Browser extension for capturing dev notes, snippets, and bookmarks with tag-based search.',
    longDescription:
      'A Chrome extension for developers to capture notes, code snippets, and bookmarks while browsing. Data is stored in IndexedDB for offline access and synced across devices via Chrome\'s storage sync API. Built with React.',
    tech: ['Chrome API', 'React', 'IndexedDB'],
  },
]
```

- [ ] **Step 2: Create data/skills.ts**

```ts
// data/skills.ts

export type SkillCategory = {
  label: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    label: 'Frontend',
    skills: ['React', 'TypeScript', 'Next.js', 'CSS / Sass', 'Tailwind', 'Framer Motion', 'HTML5', 'Accessibility'],
  },
  {
    label: 'Backend & Data',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'REST APIs', 'GraphQL', 'Firebase'],
  },
  {
    label: 'Tools & Workflow',
    skills: ['Git', 'Figma', 'Vite', 'Docker', 'CI/CD', 'Vercel'],
  },
]
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add data/
git commit -m "feat: add Project and SkillCategory data types and content arrays"
```

---

### Task 3: useScrollReveal Hook

**Files:**
- Create: `hooks/useScrollReveal.ts`

- [ ] **Step 1: Create hooks/useScrollReveal.ts**

```ts
// hooks/useScrollReveal.ts
import { useEffect } from 'react'

export default function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).style.transitionDelay = `${i % 3 * 0.08}s`
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add hooks/
git commit -m "feat: add useScrollReveal IntersectionObserver hook"
```

---

### Task 4: Nav Component

**Files:**
- Create: `components/Nav/Nav.tsx`
- Create: `components/Nav/Nav.module.css`

- [ ] **Step 1: Create components/Nav/Nav.module.css**

```css
/* components/Nav/Nav.module.css */

.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;
  transition: padding 0.4s, background 0.4s, border-color 0.4s;
  border-bottom: 1px solid transparent;
}

.nav.scrolled {
  background: rgba(19, 18, 14, 0.92);
  backdrop-filter: blur(14px);
  padding: 1.2rem 4rem;
  border-bottom-color: var(--border);
}

.logo {
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-weight: 300;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--stone-lt);
  text-decoration: none;
}

.navRight {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.navLinks {
  display: flex;
  gap: 2.5rem;
  list-style: none;
}

.navLinks a {
  color: var(--text-dim);
  text-decoration: none;
  font-size: 0.78rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition: color 0.3s;
}

.navLinks a:hover {
  color: var(--moss-lt);
}

.hire {
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--moss-lt);
  text-decoration: none;
  padding: 0.5rem 1.2rem;
  border: 1px solid rgba(122, 171, 138, 0.35);
  transition: all 0.3s;
}

.hire:hover {
  background: rgba(122, 171, 138, 0.08);
  border-color: var(--moss-lt);
}

@media (max-width: 700px) {
  .nav {
    padding: 1.5rem 2rem;
  }

  .nav.scrolled {
    padding: 1rem 2rem;
  }

  .navLinks,
  .hire {
    display: none;
  }
}
```

- [ ] **Step 2: Create components/Nav/Nav.tsx**

```tsx
// components/Nav/Nav.tsx
'use client'

import { useEffect, useRef } from 'react'
import styles from './Nav.module.css'

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      navRef.current?.classList.toggle(styles.scrolled, window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav ref={navRef} className={styles.nav}>
      <a href="#hero" className={styles.logo}>D. Mauza</a>
      <div className={styles.navRight}>
        <ul className={styles.navLinks}>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#portfolio">Work</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" className={styles.hire}>Available for hire</a>
      </div>
    </nav>
  )
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add components/Nav/
git commit -m "feat: add Nav component with scroll-triggered frosted glass"
```

---

### Task 5: Hero Component

**Files:**
- Create: `components/Hero/Hero.tsx`
- Create: `components/Hero/Hero.module.css`

- [ ] **Step 1: Create components/Hero/Hero.module.css**

Note: `@keyframes heroIn` and `@keyframes drift` are declared here (not only in globals.css) because CSS Modules scope animation names locally. The module's own keyframe declarations are what actually resolve in `animation:` properties within this file.

```css
/* components/Hero/Hero.module.css */

@keyframes heroIn {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes drift {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(30px, 20px) scale(1.06); }
}

.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 4rem 5rem;
  position: relative;
  overflow: hidden;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
}

.blob1 {
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(61, 107, 74, 0.22), transparent);
  top: -200px;
  right: -150px;
  animation: drift 14s ease-in-out infinite alternate;
}

.blob2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(42, 92, 58, 0.14), transparent);
  bottom: 100px;
  left: -100px;
  animation: drift 18s ease-in-out infinite alternate-reverse;
}

.bgText {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -52%);
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: clamp(10rem, 18vw, 20rem);
  font-weight: 300;
  color: transparent;
  -webkit-text-stroke: 1px rgba(74, 124, 89, 0.08);
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
  letter-spacing: -0.02em;
  line-height: 1;
}

.botanical {
  position: absolute;
  top: -20px;
  right: -20px;
  width: 42vw;
  max-width: 580px;
  opacity: 0.13;
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: end;
  gap: 4rem;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.72rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--moss);
  margin-bottom: 2rem;
}

.tagLine {
  display: block;
  width: 40px;
  height: 1px;
  background: var(--moss);
}

.h1 {
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: clamp(4rem, 7vw, 8rem);
  font-weight: 300;
  line-height: 0.95;
  color: var(--cream);
  letter-spacing: -0.02em;
  animation: heroIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.italic {
  font-style: italic;
  color: var(--stone);
}

.indent {
  padding-left: 3rem;
  display: block;
}

.right {
  padding-bottom: 0.5rem;
  animation: heroIn 1.2s 0.25s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.desc {
  font-size: 1rem;
  color: var(--text-dim);
  line-height: 1.9;
  margin-bottom: 2.5rem;
  max-width: 380px;
}

.stats {
  display: flex;
  gap: 2.5rem;
  margin-bottom: 2.5rem;
  padding: 1.5rem 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.statNum {
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  font-weight: 300;
  color: var(--cream);
  line-height: 1;
  display: block;
}

.statLabel {
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-top: 0.25rem;
}

.actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.btnPrimary {
  padding: 0.9rem 2.2rem;
  background: var(--moss-dk);
  color: var(--cream);
  text-decoration: none;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
  border: 1px solid transparent;
  transition: background 0.3s, transform 0.2s;
  border-radius: 2px;
  display: inline-block;
}

.btnPrimary:hover {
  background: var(--moss);
  transform: translateY(-2px);
}

.btnGhost {
  padding: 0.9rem 2.2rem;
  background: transparent;
  color: var(--text-dim);
  text-decoration: none;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
  border: 1px solid var(--border);
  transition: all 0.3s;
  border-radius: 2px;
  display: inline-block;
}

.btnGhost:hover {
  border-color: var(--stone);
  color: var(--stone);
}

@media (max-width: 1000px) {
  .content {
    grid-template-columns: 1fr;
  }

  .right {
    max-width: 500px;
  }

  .botanical {
    opacity: 0.07;
  }
}

@media (max-width: 700px) {
  .hero {
    padding: 0 2rem 4rem;
  }
}
```

- [ ] **Step 2: Create components/Hero/Hero.tsx**

```tsx
// components/Hero/Hero.tsx
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />

      <div className={styles.bgText}>Frontend</div>

      <svg
        className={styles.botanical}
        viewBox="0 0 500 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M350 700 Q320 500 280 350 Q250 220 300 100" stroke="#4a7c59" strokeWidth="1.5" fill="none" />
        <path d="M290 380 Q180 320 160 220 Q220 260 280 350Z" fill="#2e4232" opacity="0.9" />
        <path d="M275 320 Q380 270 410 170 Q350 210 280 300Z" fill="#3d6b4a" opacity="0.7" />
        <path d="M295 460 Q190 430 175 360 Q235 390 295 450Z" fill="#4a7c59" opacity="0.7" />
        <path d="M300 200 Q250 150 260 80 Q290 130 305 195Z" fill="#4a7c59" opacity="0.6" />
        <path d="M285 250 Q360 220 380 160 Q330 190 285 245Z" fill="#2e4232" opacity="0.7" />
        <path d="M270 420 Q210 410 200 380" stroke="#3d6b4a" strokeWidth="0.8" fill="none" opacity="0.8" />
        <path d="M280 280 Q330 260 340 230" stroke="#3d6b4a" strokeWidth="0.8" fill="none" opacity="0.8" />
        <circle cx="200" cy="220" r="4.5" fill="#7aab8a" opacity="0.6" />
        <circle cx="162" cy="222" r="2.5" fill="#a8d5b5" opacity="0.5" />
        <circle cx="410" cy="172" r="4" fill="#7aab8a" opacity="0.55" />
        <circle cx="261" cy="82" r="5" fill="#a8d5b5" opacity="0.6" />
        <circle cx="175" cy="362" r="3" fill="#7aab8a" opacity="0.5" />
      </svg>

      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.tag}>
            <span className={styles.tagLine} />
            Full Stack Developer
          </div>
          <h1 className={styles.h1}>
            Dakota
            <br />
            <span className={styles.indent}>
              <span className={styles.italic}>Mauza</span>
            </span>
          </h1>
        </div>

        <div className={styles.right}>
          <p className={styles.desc}>
            I&apos;m a frontend-focused full stack developer who builds things people actually enjoy
            using. Thoughtful interfaces, clean code, and a genuine interest in getting the details
            right.
          </p>
          <div className={styles.stats}>
            <div>
              <span className={styles.statNum}>5+</span>
              <div className={styles.statLabel}>Years building</div>
            </div>
            <div>
              <span className={styles.statNum}>30+</span>
              <div className={styles.statLabel}>Projects shipped</div>
            </div>
            <div>
              <span className={styles.statNum}>∞</span>
              <div className={styles.statLabel}>Coffee consumed</div>
            </div>
          </div>
          <div className={styles.actions}>
            <a href="#portfolio" className={styles.btnPrimary}>See my work</a>
            <a href="#contact" className={styles.btnGhost}>Get in touch</a>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add components/Hero/
git commit -m "feat: add Hero component with botanical SVG, blobs, and heroIn animation"
```

---

### Task 6: Skills Component

**Files:**
- Create: `components/Skills/Skills.tsx`
- Create: `components/Skills/Skills.module.css`

- [ ] **Step 1: Create components/Skills/Skills.module.css**

```css
/* components/Skills/Skills.module.css */

.skills {
  background: var(--light-bg);
  padding: 7rem 4rem;
}

.layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: start;
  margin-top: 1rem;
}

.intro {
  font-size: 1rem;
  color: var(--light-dim);
  line-height: 1.95;
}

.intro p + p {
  margin-top: 1.2rem;
}

.intro strong {
  color: var(--light-text);
  font-weight: 500;
}

.grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.category {
  padding: 1.5rem;
  background: var(--light-surface);
  border: 1px solid var(--light-border);
  border-radius: 3px;
  transition: border-color 0.35s, box-shadow 0.35s;
}

.category:hover {
  border-color: var(--moss-dk);
  box-shadow: 0 4px 24px rgba(74, 124, 89, 0.08);
}

.categoryLabel {
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--moss-dk);
  margin-bottom: 1rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.tag {
  padding: 0.28rem 0.7rem;
  background: var(--light-bg2);
  color: var(--light-text);
  font-size: 0.8rem;
  border-radius: 2px;
  border: 1px solid transparent;
  transition: border-color 0.3s, color 0.3s;
}

.tag:hover {
  border-color: var(--moss-dk);
  color: var(--moss-dk);
}

@media (max-width: 1000px) {
  .layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 700px) {
  .skills {
    padding: 5rem 2rem;
  }
}
```

- [ ] **Step 2: Create components/Skills/Skills.tsx**

```tsx
// components/Skills/Skills.tsx
import { skillCategories } from '@/data/skills'
import styles from './Skills.module.css'

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <div className="section-header reveal">
        <div className="section-eyebrow">
          <span className="section-num dark">01</span>
          <span className="section-line dark" />
          <span className="section-label-text dark">Expertise</span>
        </div>
        <h2 className="section-title dark">
          Skills &amp; <em>tools</em>
        </h2>
      </div>

      <div className={styles.layout}>
        <div className={`${styles.intro} reveal`}>
          <p>
            My home is in the frontend — the part of the stack where design becomes reality and
            users form their first impressions. I care about every transition, every interaction
            state, every accessibility detail.
          </p>
          <p>
            That said, I&apos;m comfortable across the full stack and can hold my own on the backend
            when a project calls for it.
          </p>
          <p>
            <strong>I pick up new tools quickly</strong> and I&apos;m always looking to add
            something useful to the kit.
          </p>
        </div>

        <div className={`${styles.grid} reveal`}>
          {skillCategories.map((category) => (
            <div key={category.label} className={styles.category}>
              <p className={styles.categoryLabel}>{category.label}</p>
              <div className={styles.tags}>
                {category.skills.map((skill) => (
                  <span key={skill} className={styles.tag}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add components/Skills/
git commit -m "feat: add Skills component with two-column layout and category cards"
```

---

### Task 7: ProjectModal Component

**Files:**
- Create: `components/ProjectModal/ProjectModal.tsx`
- Create: `components/ProjectModal/ProjectModal.module.css`

- [ ] **Step 1: Create components/ProjectModal/ProjectModal.module.css**

```css
/* components/ProjectModal/ProjectModal.module.css */

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(5, 10, 7, 0.75);
  z-index: 500;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  width: 100%;
  max-width: 760px;
  max-height: 85vh;
  overflow-y: auto;
  padding: 3rem;
  position: relative;
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.panel.open {
  transform: translateY(0);
}

.closeBtn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: 1px solid var(--border);
  color: var(--text-dim);
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  transition: color 0.3s, border-color 0.3s;
  border-radius: 2px;
}

.closeBtn:hover {
  color: var(--stone);
  border-color: var(--stone);
}

.title {
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: clamp(1.8rem, 3vw, 2.8rem);
  font-weight: 300;
  color: var(--cream);
  line-height: 1.1;
  margin-bottom: 1.5rem;
  padding-right: 3rem;
}

.longDesc {
  font-size: 0.95rem;
  color: var(--text-dim);
  line-height: 1.9;
  margin-bottom: 2rem;
}

.techList {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 2rem;
}

.techChip {
  font-size: 0.72rem;
  padding: 0.25rem 0.6rem;
  background: var(--bg3);
  color: var(--moss-lt);
  border-radius: 2px;
  letter-spacing: 0.04em;
  border: 1px solid rgba(74, 124, 89, 0.3);
}

.actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.actionLink {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.7rem 1.4rem;
  font-size: 0.82rem;
  letter-spacing: 0.06em;
  text-decoration: none;
  border-radius: 2px;
  transition: all 0.3s;
}

.actionLinkPrimary {
  background: var(--moss-dk);
  color: var(--cream);
  border: 1px solid transparent;
}

.actionLinkPrimary:hover {
  background: var(--moss);
}

.actionLinkGhost {
  background: transparent;
  color: var(--text-dim);
  border: 1px solid var(--border);
}

.actionLinkGhost:hover {
  border-color: var(--stone);
  color: var(--stone);
}
```

- [ ] **Step 2: Create components/ProjectModal/ProjectModal.tsx**

```tsx
// components/ProjectModal/ProjectModal.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import type { Project } from '@/data/projects'
import styles from './ProjectModal.module.css'

type Props = {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!project) return

    document.body.style.overflow = 'hidden'
    const enterTimer = setTimeout(() => setIsOpen(true), 10)

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false)
        setTimeout(() => {
          document.body.style.overflow = ''
          onCloseRef.current()
        }, 400)
      }
    }

    window.addEventListener('keydown', handleKey)

    return () => {
      clearTimeout(enterTimer)
      window.removeEventListener('keydown', handleKey)
    }
  }, [project])

  if (!project) return null

  function handleClose() {
    setIsOpen(false)
    setTimeout(() => {
      document.body.style.overflow = ''
      onCloseRef.current()
    }, 400)
  }

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div
        className={`${styles.panel} ${isOpen ? styles.open : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Close modal">
          ✕
        </button>

        <h2 className={styles.title}>{project.title}</h2>
        <p className={styles.longDesc}>{project.longDescription}</p>

        <div className={styles.techList}>
          {project.tech.map((t) => (
            <span key={t} className={styles.techChip}>{t}</span>
          ))}
        </div>

        {(project.liveUrl || project.githubUrl) && (
          <div className={styles.actions}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.actionLink} ${styles.actionLinkPrimary}`}
              >
                ↗ Live site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.actionLink} ${styles.actionLinkGhost}`}
              >
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add components/ProjectModal/
git commit -m "feat: add ProjectModal with slide-up animation, scroll lock, Escape key"
```

---

### Task 8: Portfolio Component

**Files:**
- Create: `components/Portfolio/Portfolio.tsx`
- Create: `components/Portfolio/Portfolio.module.css`

- [ ] **Step 1: Create components/Portfolio/Portfolio.module.css**

```css
/* components/Portfolio/Portfolio.module.css */

.portfolio {
  background: var(--bg);
  padding: 7rem 4rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5px;
  background: var(--border2);
  border: 1px solid var(--border2);
  margin-top: 1rem;
}

.card {
  background: var(--bg2);
  padding: 2rem;
  cursor: pointer;
  transition: background 0.3s;
  position: relative;
  overflow: hidden;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: none;
  text-align: left;
  width: 100%;
  font-family: inherit;
  color: inherit;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 0;
  background: var(--stone);
  transition: height 0.4s ease;
}

.card:hover {
  background: var(--surface);
}

.card:hover::before {
  height: 100%;
}

.number {
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 0.85rem;
  font-style: italic;
  color: var(--moss);
  margin-bottom: 0.75rem;
}

.name {
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: 1.4rem;
  font-weight: 300;
  color: var(--stone-lt);
  margin-bottom: 0.5rem;
  line-height: 1.2;
  transition: color 0.3s;
}

.card:hover .name {
  color: var(--cream);
}

.desc {
  font-size: 0.81rem;
  color: var(--text-dim);
  line-height: 1.65;
  margin-bottom: 1.5rem;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.techList {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.chip {
  font-size: 0.65rem;
  padding: 0.18rem 0.5rem;
  background: var(--bg3);
  color: var(--moss-lt);
  border-radius: 2px;
  letter-spacing: 0.04em;
  border: 1px solid rgba(74, 124, 89, 0.3);
}

.arrow {
  color: var(--text-dim);
  font-size: 0.82rem;
  transition: color 0.3s;
  white-space: nowrap;
  margin-left: 0.5rem;
  flex-shrink: 0;
}

.card:hover .arrow {
  color: var(--stone);
}

@media (max-width: 1000px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .portfolio {
    padding: 5rem 2rem;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Create components/Portfolio/Portfolio.tsx**

```tsx
// components/Portfolio/Portfolio.tsx
'use client'

import { useState } from 'react'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'
import ProjectModal from '@/components/ProjectModal/ProjectModal'
import styles from './Portfolio.module.css'

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="portfolio" className={styles.portfolio}>
      <div className="section-header reveal">
        <div className="section-eyebrow">
          <span className="section-num">02</span>
          <span className="section-line" />
          <span className="section-label-text">Selected Work</span>
        </div>
        <h2 className="section-title">
          Things I&apos;ve <em>built</em>
        </h2>
      </div>

      <div className={styles.grid}>
        {projects.map((project) => (
          <button
            key={project.id}
            className={`${styles.card} reveal`}
            onClick={() => setSelectedProject(project)}
          >
            <div>
              <p className={styles.number}>{String(project.id).padStart(2, '0')}</p>
              <h3 className={styles.name}>{project.title}</h3>
              <p className={styles.desc}>{project.description}</p>
            </div>
            <div className={styles.footer}>
              <div className={styles.techList}>
                {project.tech.map((t) => (
                  <span key={t} className={styles.chip}>{t}</span>
                ))}
              </div>
              <span className={styles.arrow}>↗</span>
            </div>
          </button>
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add components/Portfolio/
git commit -m "feat: add Portfolio component with 3-col grid and modal integration"
```

---

### Task 9: Contact Component

**Files:**
- Create: `components/Contact/Contact.tsx`
- Create: `components/Contact/Contact.module.css`

- [ ] **Step 1: Create components/Contact/Contact.module.css**

Note: `@keyframes pulse` is declared here so the local animation name resolves in `.dot`.

```css
/* components/Contact/Contact.module.css */

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.8); }
}

.contact {
  background: var(--light-bg);
  padding: 8rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.title {
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: clamp(2.5rem, 4.5vw, 5rem);
  font-weight: 300;
  color: var(--light-text);
  line-height: 1.05;
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;
}

.title em {
  font-style: italic;
  color: var(--moss-dk);
}

.sub {
  color: var(--light-dim);
  font-size: 1rem;
  max-width: 420px;
  line-height: 1.85;
  margin-bottom: 1.5rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--moss-dk);
  margin-bottom: 2.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(74, 124, 89, 0.3);
  border-radius: 2px;
  background: var(--light-surface);
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--moss-dk);
  animation: pulse 2.2s ease-in-out infinite;
}

.emailLink {
  display: block;
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-size: clamp(1.4rem, 2.5vw, 2.5rem);
  font-weight: 300;
  color: var(--light-text);
  text-decoration: none;
  border-bottom: 1px solid var(--light-border);
  padding-bottom: 0.4rem;
  margin-bottom: 3rem;
  letter-spacing: -0.01em;
  transition: color 0.3s, border-color 0.3s;
}

.emailLink:hover {
  color: var(--moss-dk);
  border-color: var(--moss-dk);
}

.links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--light-dim);
  text-decoration: none;
  font-size: 0.82rem;
  padding: 0.7rem 1.4rem;
  border: 1px solid var(--light-border);
  border-radius: 2px;
  letter-spacing: 0.04em;
  background: var(--light-surface);
  transition: all 0.3s;
}

.link:hover {
  color: var(--moss-dk);
  border-color: var(--moss-dk);
  background: var(--light-bg2);
}

@media (max-width: 700px) {
  .contact {
    padding: 5rem 2rem;
  }
}
```

- [ ] **Step 2: Create components/Contact/Contact.tsx**

```tsx
// components/Contact/Contact.tsx
import styles from './Contact.module.css'

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className="section-header reveal" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
          <span className="section-num dark">03</span>
          <span className="section-line dark" />
          <span className="section-label-text dark">Get in Touch</span>
        </div>
      </div>

      <div className="reveal">
        <h2 className={styles.title}>
          Got a project in mind?
          <br />
          I&apos;d love to <em>hear about it.</em>
        </h2>
        <p className={styles.sub}>
          Whether it&apos;s a full build, a collaboration, or just a question — my inbox is always
          open. I try to reply within a day or two.
        </p>
        <div className={styles.badge}>
          <span className={styles.dot} />
          Available for new projects
        </div>
        <a href="mailto:hello@dakotamauza.com" className={styles.emailLink}>
          hello@dakotamauza.com
        </a>
      </div>

      <div className={`${styles.links} reveal`}>
        <a href="https://github.com" className={styles.link}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </a>
        <a href="https://linkedin.com" className={styles.link}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </a>
        <a href="#" className={styles.link}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          Résumé
        </a>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add components/Contact/
git commit -m "feat: add Contact component with pulsing badge and social links"
```

---

### Task 10: Footer Component

**Files:**
- Create: `components/Footer/Footer.tsx`
- Create: `components/Footer/Footer.module.css`

- [ ] **Step 1: Create components/Footer/Footer.module.css**

```css
/* components/Footer/Footer.module.css */

.footer {
  padding: 2rem 4rem;
  background: var(--light-bg2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--light-border);
  font-size: 0.75rem;
  color: var(--light-dim);
  position: relative;
  z-index: 1;
}

.tagline {
  font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 0.9rem;
  color: var(--light-text);
}

@media (max-width: 700px) {
  .footer {
    padding: 1.5rem 2rem;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
```

- [ ] **Step 2: Create components/Footer/Footer.tsx**

```tsx
// components/Footer/Footer.tsx
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© 2025 Dakota Mauza</span>
      <span className={styles.tagline}>Built with care &amp; curiosity.</span>
    </footer>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/Footer/
git commit -m "feat: add Footer component"
```

---

### Task 11: ScrollRevealInit + layout.tsx + page.tsx

**Files:**
- Create: `components/ScrollRevealInit/ScrollRevealInit.tsx`
- Replace: `app/layout.tsx`
- Replace: `app/page.tsx`
- Delete: `app/page.module.css`

- [ ] **Step 1: Create components/ScrollRevealInit/ScrollRevealInit.tsx**

```tsx
// components/ScrollRevealInit/ScrollRevealInit.tsx
'use client'

import useScrollReveal from '@/hooks/useScrollReveal'

export default function ScrollRevealInit() {
  useScrollReveal()
  return null
}
```

- [ ] **Step 2: Replace app/layout.tsx**

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import Nav from '@/components/Nav/Nav'
import './globals.css'

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dakota Mauza — Frontend Developer',
  description:
    'Frontend-focused full stack developer building thoughtful interfaces and clean code.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Replace app/page.tsx**

```tsx
// app/page.tsx
import Hero from '@/components/Hero/Hero'
import Skills from '@/components/Skills/Skills'
import Portfolio from '@/components/Portfolio/Portfolio'
import Contact from '@/components/Contact/Contact'
import Footer from '@/components/Footer/Footer'
import ScrollRevealInit from '@/components/ScrollRevealInit/ScrollRevealInit'

export default function Home() {
  return (
    <main>
      <ScrollRevealInit />
      <Hero />
      <Skills />
      <Portfolio />
      <Contact />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 4: Delete boilerplate CSS**

```bash
rm app/page.module.css
```

- [ ] **Step 5: Type-check**

Run: `npx tsc --noEmit`
Expected: No errors. If you see "Cannot find module" errors for `@/...` paths, verify that `tsconfig.json` has `"paths": { "@/*": ["./*"] }` — it should already be there from the project scaffold.

- [ ] **Step 6: Commit**

```bash
git add components/ScrollRevealInit/ app/layout.tsx app/page.tsx
git rm app/page.module.css
git commit -m "feat: wire up layout, page assembler, and ScrollRevealInit"
```

---

### Task 12: Final Verification

**Files:** None — verification only.

- [ ] **Step 1: Run dev server**

```bash
npm run dev
```

Open `http://localhost:3000`. Check each item:

| What | Expected |
|------|----------|
| Background | Dark forest green (`#0d1510`) with subtle noise texture overlay |
| Nav | "D. Mauza" top-left, links top-right, transparent initially |
| Nav on scroll | Frosted glass background after 60px, links + hire button visible |
| Nav ≤700px | Nav links and "Available for hire" button hidden |
| Hero | Full-viewport, "Dakota / Mauza" h1 with heroIn animation, stats row, blobs drifting |
| Hero botanical | Faint SVG illustration top-right |
| Hero ≤1000px | Single-column layout |
| Skills | Light green section, 2-col with intro + category cards |
| Skills hover | Card border goes dark-moss, subtle shadow |
| Portfolio | Dark section, 12 cards in 3-column grid |
| Portfolio card hover | Left accent bar slides down, card lightens, name goes cream |
| Portfolio card click | Modal slides up from bottom |
| Modal | Title, longDescription, tech chips; no live/GitHub buttons (URLs are undefined) |
| Modal close | Click overlay, ✕ button, or Escape — panel slides down, body scroll restored |
| Contact | Light section, pulsing green dot, large email link |
| Contact email hover | Turns dark-moss |
| Footer | Light-bg2 background, copyright left, italic tagline right |
| Scroll reveal | `.reveal` elements fade up as they enter viewport |

- [ ] **Step 2: Build check**

```bash
npm run build
```

Expected: Build succeeds with no TypeScript errors, no missing modules, no CSS parse errors.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete portfolio site — Nav, Hero, Skills, Portfolio, Contact, Footer"
```
