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
