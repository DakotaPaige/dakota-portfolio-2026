'use client'

// components/Skills/Skills.tsx
import { useEffect, useRef, useState } from 'react'
import { skillCategories } from '@/data/skills'
import styles from './Skills.module.css'

export default function Skills() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    categoryRefs.current.forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i)
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

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
            <strong>I pick up new tools quickly</strong>&nbsp;and I&apos;m always looking to add
            something useful to the kit.
          </p>
        </div>

        <div className={`${styles.grid} reveal`}>
          {skillCategories.map((category, i) => (
            <div
              key={category.label}
              ref={(el) => { categoryRefs.current[i] = el }}
              className={`${styles.category}${activeIndex === i ? ` ${styles.categoryActive}` : ''}`}
            >
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
