---
name: portfolio-design
description: Complete design spec for Dakota Mauza's Next.js 16 App Router portfolio site, converted from reference.html
metadata:
  type: project
---

# Dakota Mauza Portfolio — Design Spec

## Overview

Convert `reference.html` into a production Next.js 16.2.6 / React 19 App Router site using TypeScript and plain CSS (CSS Modules + globals). No Tailwind, no CSS-in-JS, no animation libraries.

---

## Tech Stack

- **Next.js 16.2.6** — App Router, server components by default
- **React 19.2.4**
- **TypeScript**
- **CSS Modules** for component-scoped styles; `app/globals.css` for tokens, resets, shared classes
- **`next/font/google`** for Cormorant Garamond + DM Sans

---

## File Structure

```
app/
  layout.tsx              — fonts (CSS vars), metadata, Nav, ScrollRevealInit
  page.tsx                — server component assembling all sections + Footer
  globals.css             — :root tokens, body reset, body::before noise, .reveal/.visible, @keyframes

components/
  Nav/
    Nav.tsx               — "use client" (scroll listener)
    Nav.module.css
  Hero/
    Hero.tsx              — server component
    Hero.module.css
  Skills/
    Skills.tsx            — server component
    Skills.module.css
  Portfolio/
    Portfolio.tsx         — "use client" (selectedProject state)
    Portfolio.module.css
  ProjectModal/
    ProjectModal.tsx      — "use client" (scroll lock, keyboard, enter animation)
    ProjectModal.module.css
  Contact/
    Contact.tsx           — server component
    Contact.module.css
  Footer/
    Footer.tsx            — server component
    Footer.module.css
  ScrollRevealInit/
    ScrollRevealInit.tsx  — "use client" thin wrapper; calls useScrollReveal(), renders nothing

data/
  projects.ts             — Project type + projects array (12 items)
  skills.ts               — SkillCategory type + skillCategories array (3 items)

hooks/
  useScrollReveal.ts      — IntersectionObserver hook
```

---

## Fonts

Load in `app/layout.tsx` via `next/font/google`:

```ts
Cormorant_Garamond({ weight: ['300','400','600'], style: ['normal','italic'], subsets: ['latin'], variable: '--font-cormorant' })
DM_Sans({ weight: ['300','400','500'], subsets: ['latin'], variable: '--font-dm-sans' })
```

Apply both variables on `<html className={`${cormorant.variable} ${dmSans.variable}`}>`.

---

## globals.css

Copy verbatim from reference.html:
- Full `:root` block (all `--bg`, `--moss-*`, `--stone`, `--cream`, `--text*`, `--light-*` tokens)
- `*, *::before, *::after` reset
- `html { scroll-behavior: smooth }`
- `body` base styles (background, color, font-family, font-weight, line-height, overflow-x)
- `body::before` noise texture overlay (fixed, inset 0, SVG data URI, pointer-events none, z-index 999, opacity 0.35)
- `.reveal` / `.reveal.visible` scroll-reveal classes
- All `@keyframes`: `fadeUp`, `drift`, `pulse`, `heroIn`

---

## Data

### `data/projects.ts`

```ts
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
```

12 projects from reference.html: Project Canopy, Mossy, Fieldwork, Shoreline, Seedling, Root & Branch, Clearwater, Timber, Watershed, Grove, Fern, Underbrush. All `liveUrl` / `githubUrl` left as `undefined` (placeholder).

### `data/skills.ts`

```ts
export type SkillCategory = {
  label: string
  skills: string[]
}
```

Three categories:
- **Frontend**: React, TypeScript, Next.js, CSS / Sass, Tailwind, Framer Motion, HTML5, Accessibility
- **Backend & Data**: Node.js, Express, PostgreSQL, REST APIs, GraphQL, Firebase
- **Tools & Workflow**: Git, Figma, Vite, Docker, CI/CD, Vercel

---

## Components

### Nav.tsx (`"use client"`)

- `position: fixed`, transparent by default
- `useEffect` scroll listener: toggles `.scrolled` CSS module class when `scrollY > 60`
- `.scrolled` state: `backdrop-filter: blur(14px)`, dark semi-transparent bg, reduced padding, border-bottom
- Logo: "D. Mauza" (Cormorant Garamond, letter-spaced, uppercase)
- Links: Skills → `#skills`, Work → `#portfolio`, Contact → `#contact`
- "Available for hire" pill → `#contact`
- Links + pill hidden below 700px via media query in Nav.module.css

### Hero.tsx (server)

- `min-height: 100vh`, flex column, `justify-content: flex-end`, anchored to bottom
- Two animated blob `<div>`s (CSS `drift` keyframe, no JS)
- Ghost watermark `<div>` with "Frontend" text (Cormorant Garamond, transparent, `-webkit-text-stroke`)
- Botanical SVG inlined directly (copied exactly from reference.html)
- Two-column CSS grid (left: tag + h1; right: desc + stats + CTAs)
- `heroIn` entrance animation on left column; same with `animation-delay: 0.25s` on right
- Stats: "5+" Years, "30+" Projects, "∞" Coffee
- CTAs: "See my work" → `#portfolio` (btn-primary), "Get in touch" → `#contact` (btn-ghost)
- Single column below 1000px; botanical opacity reduced to 0.07

### Skills.tsx (server)

- `background: var(--light-bg)`, padding `7rem 4rem`
- Section header with eyebrow (`01`, line, "Expertise") + `h2` "Skills & *tools*"
- Two-column grid (intro left, category cards right); single column below 1000px
- Intro copy from reference.html (3 paragraphs)
- Three `.skill-category` cards: label + tag pills
- Hover: `border-color` → `--moss-dk`, `box-shadow` CSS only

### Portfolio.tsx (`"use client"`)

- `useState<Project | null>(null)` for selected project
- Dark bg section, 3-col grid (2-col ≤1000px, 1-col ≤700px)
- 12 project cards, each:
  - Italic number, title, description, tech chips, ↗ arrow
  - `::before` left-edge accent bar (height 0→100% on hover via CSS transition)
  - `onClick` → `setSelectedProject(project)`
- Renders `<ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />`

### ProjectModal.tsx (`"use client"`)

- Props: `project: Project | null`, `onClose: () => void`
- Returns `null` when project is null
- On mount: `document.body.style.overflow = 'hidden'`; on unmount: restore scroll, call `onClose`
- Enter animation: CSS class added via `useEffect` + `setTimeout(fn, 10)` to trigger slide-up after mount
- Semi-transparent overlay behind panel; click overlay → close
- `useEffect` for `Escape` key listener
- Shows: title, longDescription, tech chips, live link button (if `liveUrl`), GitHub link button (if `githubUrl`)
- Close button top-right

### Contact.tsx (server)

- `background: var(--light-bg)`, centered, `text-align: center`
- Eyebrow (`03`, line, "Get in Touch")
- Contact title with italic em
- Sub copy
- Availability badge with pulsing dot (CSS `pulse` keyframe)
- `<a href="mailto:hello@dakotamauza.com">` — large Cormorant Garamond
- GitHub, LinkedIn, Résumé link buttons (SVG icons inline, copied from reference)

### Footer.tsx (server)

- Light `--light-bg2` background, border-top `--light-border`, text `--light-dim`
- Flex row, space-between
- Left: "© 2025 Dakota Mauza"
- Right: "Built with care & curiosity." (Cormorant Garamond italic, `--light-text` colour)
- Column layout below 700px

### ScrollRevealInit.tsx (`"use client"`)

```tsx
'use client'
import useScrollReveal from '@/hooks/useScrollReveal'
export default function ScrollRevealInit() {
  useScrollReveal()
  return null
}
```

Imported in `app/page.tsx` (server component). Keeps page.tsx as a server component.

---

## hooks/useScrollReveal.ts

```ts
import { useEffect } from 'react'

export default function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          ;(entry.target as HTMLElement).style.transitionDelay = (i % 3 * 0.08) + 's'
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.08 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
```

Stagger delay matches reference.html: each entry's `transitionDelay` is `(i % 3 * 0.08)s`.

---

## Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| `≤ 1000px` | Hero: 1-col. Skills: 1-col. Portfolio: 2-col. Botanical opacity 0.07. |
| `≤ 700px` | Portfolio: 1-col. Nav links + hire button hidden. Section/hero padding reduced. Footer stacks. |

---

## "use client" Boundary Map

| File | Client? | Reason |
|---|---|---|
| `app/layout.tsx` | No | Fonts, metadata only |
| `app/page.tsx` | No | Pure assembly |
| `Nav.tsx` | Yes | scroll listener |
| `Hero.tsx` | No | static |
| `Skills.tsx` | No | static |
| `Portfolio.tsx` | Yes | `useState` for modal |
| `ProjectModal.tsx` | Yes | scroll lock, keyboard, animation |
| `Contact.tsx` | No | static |
| `Footer.tsx` | No | static |
| `ScrollRevealInit.tsx` | Yes | `useEffect` / IntersectionObserver |

---

## Content Placeholders (needs real data)

- `liveUrl` and `githubUrl` on all 12 projects — set to `undefined` until real links exist
- LinkedIn URL in Contact — currently `https://linkedin.com`
- Résumé link in Contact — currently `#`
- GitHub URL in Contact — currently `https://github.com`
- Bio copy in Skills intro — used verbatim from reference.html; update as needed
- `longDescription` on each project — filled with 1-2 sentence placeholder for now
