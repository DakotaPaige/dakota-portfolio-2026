// components/Contact/Contact.tsx
import styles from './Contact.module.css'
import GithubIcon from '../icons/github.svg'
import LinkedinIcon from '../icons/linkedin.svg'
import ResumeIcon from '../icons/resume.svg'

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

      <div className={`${styles.content} reveal`}>
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
        <a href="mailto:dakota@dakotamauza.com" className={styles.emailLink}>
          dakota@dakotamauza.com
        </a>
      </div>

      <div className={`${styles.links} reveal`}>
        <a href="https://github.com/DakotaPaige" target="_blank" rel="noopener noreferrer" className={styles.link}>
          <GithubIcon className={styles.icon} aria-hidden="true" />
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/dakota-mauza-simeone/" target="_blank" rel="noopener noreferrer" className={styles.link}>
          <LinkedinIcon className={styles.icon} aria-hidden="true" />
          LinkedIn
        </a>
        <a href="/assets/pdf/Resume.pdf" target="_blank" rel="noopener noreferrer" className={styles.link}>
          <ResumeIcon className={styles.icon} aria-hidden="true" />
          Résumé
        </a>
      </div>
    </section>
  )
}
