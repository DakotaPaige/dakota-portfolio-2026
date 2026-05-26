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

  const hasMedia = !!(project.heroImage || project.images?.length)

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

        <div className={`${styles.body} ${!hasMedia ? styles.bodyStandalone : ''}`}>
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
