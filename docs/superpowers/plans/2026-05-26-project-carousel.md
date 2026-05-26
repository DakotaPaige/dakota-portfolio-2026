# Project Modal Carousel — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a full-width Embla image carousel to the top of the project modal, with floating arrow navigation and dot indicators, supporting both images and auto-playing videos.

**Architecture:** A new `ProjectCarousel` component handles all Embla wiring and rendering in isolation. `ProjectModal` imports it and places it at the top of the panel before the text body. The panel's padding is restructured so the carousel bleeds edge-to-edge while the text content keeps its existing spacing via a new `.body` wrapper.

**Tech Stack:** `embla-carousel-react`, React 19, Next.js 16, CSS Modules, TypeScript

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `components/ProjectModal/ProjectCarousel.tsx` | **Create** | Embla hook, slide rendering, arrow + dot nav |
| `components/ProjectModal/ProjectCarousel.module.css` | **Create** | Carousel layout, arrows, dots, slide sizing |
| `components/ProjectModal/ProjectModal.tsx` | **Modify** | Import + render `<ProjectCarousel>`, wrap text in `.body` |
| `components/ProjectModal/ProjectModal.module.css` | **Modify** | Remove panel padding, add `.body`, update `.closeBtn` |
| `package.json` | **Modify** | Add `embla-carousel-react` dependency |

---

## Task 1: Install embla-carousel-react

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install the package**

```bash
npm install embla-carousel-react
```

- [ ] **Step 2: Verify it was added to dependencies**

```bash
grep embla package.json
```

Expected output:
```
"embla-carousel-react": "^8.x.x"
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install embla-carousel-react"
```

---

## Task 2: Create ProjectCarousel component

**Files:**
- Create: `components/ProjectModal/ProjectCarousel.tsx`
- Create: `components/ProjectModal/ProjectCarousel.module.css`

- [ ] **Step 1: Create the CSS module**

Create `components/ProjectModal/ProjectCarousel.module.css` with the full content below:

```css
/* components/ProjectModal/ProjectCarousel.module.css */

.carousel {
  position: relative;
  height: clamp(200px, 42vh, 380px);
  background: var(--bg);
  overflow: hidden;
}

.viewport {
  overflow: hidden;
  height: 100%;
}

.container {
  display: flex;
  height: 100%;
}

.slide {
  flex: 0 0 100%;
  min-width: 0;
  height: 100%;
}

.media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* --- Arrows --- */

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  border-radius: 2px;
  border: 1px solid rgba(122, 171, 138, 0.4);
  background: rgba(13, 21, 16, 0.7);
  backdrop-filter: blur(6px);
  color: var(--stone-lt);
  font-size: 1.1rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  z-index: 2;
  transition: border-color 0.2s, background 0.2s;
}

.arrow:hover {
  border-color: rgba(122, 171, 138, 0.8);
  background: rgba(13, 21, 16, 0.9);
}

.arrowPrev { left: 12px; }
.arrowNext { right: 12px; }

/* --- Dots --- */

.dots {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 6px;
  z-index: 2;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(122, 171, 138, 0.3);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: width 0.3s ease, border-radius 0.3s ease, background 0.3s ease;
}

.dotActive {
  width: 16px;
  border-radius: 3px;
  background: var(--stone);
}
```

- [ ] **Step 2: Create the carousel component**

Create `components/ProjectModal/ProjectCarousel.tsx` with the full content below:

```tsx
// components/ProjectModal/ProjectCarousel.tsx
'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { MediaItem } from '@/data/projects'
import styles from './ProjectCarousel.module.css'

type Slide = string | MediaItem

type Props = {
  title: string
  heroImage?: string
  images?: Array<string | MediaItem>
}

export default function ProjectCarousel({ title, heroImage, images }: Props) {
  const slides: Slide[] = [
    ...(heroImage ? [heroImage] : []),
    ...(images ?? []),
  ]

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  if (slides.length === 0) return null

  const showNav = slides.length > 1

  return (
    <div className={styles.carousel} aria-label="Project images">
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {slides.map((slide, i) => (
            <div key={i} className={styles.slide}>
              {typeof slide === 'string' ? (
                <img
                  src={slide}
                  alt={i === 0 ? title : `${title} — image ${i + 1}`}
                  className={styles.media}
                />
              ) : (
                <video
                  src={slide.src}
                  className={styles.media}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {showNav && (
        <>
          <button
            className={`${styles.arrow} ${styles.arrowPrev}`}
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            className={`${styles.arrow} ${styles.arrowNext}`}
            onClick={scrollNext}
            aria-label="Next slide"
          >
            ›
          </button>
          <div className={styles.dots}>
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === selectedIndex ? 'true' : undefined}
                className={`${styles.dot} ${i === selectedIndex ? styles.dotActive : ''}`}
                onClick={() => emblaApi?.scrollTo(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors. If you see `Cannot find module 'embla-carousel-react'`, run `npm install` first.

- [ ] **Step 4: Commit**

```bash
git add components/ProjectModal/ProjectCarousel.tsx components/ProjectModal/ProjectCarousel.module.css
git commit -m "feat: add ProjectCarousel component with Embla, arrows, and dots"
```

---

## Task 3: Integrate carousel into ProjectModal

**Files:**
- Modify: `components/ProjectModal/ProjectModal.module.css`
- Modify: `components/ProjectModal/ProjectModal.tsx`

- [ ] **Step 1: Update ProjectModal.module.css**

Replace the `.panel` rule and `.closeBtn` rule, and add a new `.body` rule. The full updated file:

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
  padding: 0;
  position: relative;
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.panel.open {
  transform: translateY(0);
}

.body {
  padding: 2.5rem 3rem 3rem;
}

.closeBtn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(13, 21, 16, 0.7);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(122, 171, 138, 0.4);
  color: var(--stone-lt);
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  transition: color 0.3s, border-color 0.3s, background 0.3s;
  border-radius: 2px;
  z-index: 3;
}

.closeBtn:hover {
  color: var(--stone);
  border-color: var(--stone);
  background: rgba(13, 21, 16, 0.9);
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
  transition: color 0.3s, border-color 0.3s, background 0.3s;
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

- [ ] **Step 2: Update ProjectModal.tsx**

Replace the full file content:

```tsx
// components/ProjectModal/ProjectModal.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Project } from '@/data/projects'
import ProjectCarousel from './ProjectCarousel'
import styles from './ProjectModal.module.css'

type Props = {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const onCloseRef = useRef(onClose)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    if (!project) return

    document.body.style.overflow = 'hidden'
    const enterTimer = setTimeout(() => setIsOpen(true), 10)
    closeBtnRef.current?.focus()

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
      document.body.style.overflow = ''
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

  return createPortal(
    <div className={styles.overlay} onClick={handleClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`${styles.panel} ${isOpen ? styles.open : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          className={styles.closeBtn}
          onClick={handleClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <ProjectCarousel
          title={project.title}
          heroImage={project.heroImage}
          images={project.images}
        />

        <div className={styles.body}>
          <h2 id="modal-title" className={styles.title}>{project.title}</h2>
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
    </div>,
    document.body
  )
}
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Run the dev server and verify in the browser**

```bash
npm run dev
```

Open http://localhost:3000 and:
1. Click any project card — the modal should slide up from the bottom
2. The carousel should appear at the top, full-width, showing the hero image
3. If the project has multiple images, prev/next arrows and dots should be visible
4. Click arrows — slides should advance with smooth Embla transition
5. Click dots — should jump to that slide, active dot should expand to a pill
6. Drag left/right on the carousel — should navigate slides on touch/mouse
7. For a project with video slides (Cedar Creek, Locale), navigate to the video slide — it should autoplay silently
8. Resize the browser to a narrow viewport — carousel height should clamp gracefully, arrows and dots should remain visible
9. Press Escape — modal should close with slide-down animation
10. Click the overlay backdrop — modal should close

- [ ] **Step 5: Commit**

```bash
git add components/ProjectModal/ProjectModal.tsx components/ProjectModal/ProjectModal.module.css
git commit -m "feat: integrate ProjectCarousel into ProjectModal with image-first layout"
```
