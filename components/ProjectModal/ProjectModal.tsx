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
