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
