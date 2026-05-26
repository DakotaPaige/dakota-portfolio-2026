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
