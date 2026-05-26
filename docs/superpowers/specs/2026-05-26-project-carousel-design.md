# Project Modal Carousel — Design Spec

**Date:** 2026-05-26
**Status:** Approved

---

## Overview

Add an image carousel to the project modal popup using Embla Carousel. The carousel sits image-first at the top of the panel, bleeding edge-to-edge. Navigation uses floating prev/next arrows overlaid on the image plus dot indicators below. Works across all viewport sizes with touch/drag support.

---

## Layout — Image First

The carousel occupies the full width of the panel at the top with no horizontal padding. The panel's `padding: 3rem` is restructured:

- `padding-top: 0` on `.panel` — carousel is flush to the top, left, and right edges
- A new `.body` wrapper inside the panel holds all text content (title, description, tech chips, action links) at `padding: 2.5rem 3rem 3rem`
- The close button stays `position: absolute` over the carousel image with a semi-transparent dark background so it reads against any photo

---

## Component — `ProjectCarousel`

Extracted into its own files:
- `components/ProjectModal/ProjectCarousel.tsx`
- `components/ProjectModal/ProjectCarousel.module.css`

### Props

```ts
type Props = {
  heroImage?: string
  images?: Array<string | MediaItem>
}
```

### Slides array

```ts
slides = [heroImage, ...images].filter(Boolean)
```

If `slides.length === 0`, the carousel renders nothing (component returns null). If `slides.length === 1`, arrows and dots are hidden.

### Slide height

`clamp(200px, 42vh, 380px)` — immersive on desktop, stays usable on mobile without consuming the whole viewport.

### Image slides

`<img>` with `object-fit: cover`, fills the slide container fully. `alt` attribute set to the project title for accessibility.

### Video slides (`{ src: string; video: boolean }`)

`<video autoPlay muted loop playsInline>` — autoplays silently when the slide is active. No controls shown; ambient/showcase behaviour suits the portfolio context.

### Embla config

```ts
useEmblaCarousel({ loop: true })
```

`loop: true` so arrows are always shown and the carousel wraps seamlessly. Touch/drag enabled by default — no extra plugins needed.

---

## Navigation

### Arrows

- `position: absolute`, vertically centred on the slide image
- 32×32px, `border-radius: 2px`
- Background: `rgba(13, 21, 16, 0.7)` with `backdrop-filter: blur(6px)`
- Border: `1px solid rgba(122, 171, 138, 0.4)` (moss palette)
- Icon colour: `var(--stone-lt)` (`#c8e8d4`)
- Left arrow: `left: 12px`, right arrow: `right: 12px`
- Hidden when `slides.length <= 1`

### Dots

- Rendered below the carousel image, inside the carousel container
- Centred row with `gap: 6px`
- Inactive dot: `6px` circle, `background: rgba(122, 171, 138, 0.3)`
- Active dot: expands to a pill — `width: 16px`, `border-radius: 3px`, `background: var(--stone)` (`#a8d5b5`)
- Transition: `width 0.3s ease` on the active dot
- Hidden when `slides.length <= 1`

---

## Installation

```bash
npm install embla-carousel-react
```

No additional Embla plugins required.

---

## Panel CSS Changes

| Before | After |
|--------|-------|
| `.panel { padding: 3rem }` | `.panel { padding: 0 }` |
| Content directly in panel | Content in `.body { padding: 2.5rem 3rem 3rem }` |
| Close button top-right of panel | Close button top-right, `z-index` above carousel, semi-transparent bg |

---

## Responsive Behaviour

The panel is already `width: 100%; max-width: 760px`. The carousel inherits full panel width at all sizes. On narrow viewports, `clamp(200px, 42vh, 380px)` keeps the carousel height reasonable. Touch/drag is native via Embla.

---

## Accessibility

- Carousel region has `aria-label="Project images"`
- Prev/next buttons have `aria-label="Previous slide"` / `aria-label="Next slide"`
- Dot buttons have `aria-label="Go to slide N"` and `aria-current="true"` on the active dot
- Images have `alt` set to the project title
- Videos have `aria-hidden="true"` since they are decorative/ambient

---

## Files Touched

| File | Change |
|------|--------|
| `components/ProjectModal/ProjectCarousel.tsx` | New — carousel component |
| `components/ProjectModal/ProjectCarousel.module.css` | New — carousel styles |
| `components/ProjectModal/ProjectModal.tsx` | Add `<ProjectCarousel>`, restructure padding |
| `components/ProjectModal/ProjectModal.module.css` | Remove `padding` from `.panel`, add `.body` |
| `package.json` | Add `embla-carousel-react` |
