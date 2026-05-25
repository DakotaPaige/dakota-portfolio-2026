// components/Hero/Hero.tsx
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />

      <div className={styles.bgText}>Frontend</div>

      <svg
        className={styles.botanical}
        viewBox="0 0 500 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M350 700 Q320 500 280 350 Q250 220 300 100" stroke="#4a7c59" strokeWidth="1.5" fill="none" />
        <path d="M290 380 Q180 320 160 220 Q220 260 280 350Z" fill="#2e4232" opacity="0.9" />
        <path d="M275 320 Q380 270 410 170 Q350 210 280 300Z" fill="#3d6b4a" opacity="0.7" />
        <path d="M295 460 Q190 430 175 360 Q235 390 295 450Z" fill="#4a7c59" opacity="0.7" />
        <path d="M300 200 Q250 150 260 80 Q290 130 305 195Z" fill="#4a7c59" opacity="0.6" />
        <path d="M285 250 Q360 220 380 160 Q330 190 285 245Z" fill="#2e4232" opacity="0.7" />
        <path d="M270 420 Q210 410 200 380" stroke="#3d6b4a" strokeWidth="0.8" fill="none" opacity="0.8" />
        <path d="M280 280 Q330 260 340 230" stroke="#3d6b4a" strokeWidth="0.8" fill="none" opacity="0.8" />
        <circle cx="200" cy="220" r="4.5" fill="#7aab8a" opacity="0.6" />
        <circle cx="162" cy="222" r="2.5" fill="#a8d5b5" opacity="0.5" />
        <circle cx="410" cy="172" r="4" fill="#7aab8a" opacity="0.55" />
        <circle cx="261" cy="82" r="5" fill="#a8d5b5" opacity="0.6" />
        <circle cx="175" cy="362" r="3" fill="#7aab8a" opacity="0.5" />
      </svg>

      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.tag}>
            <span className={styles.tagLine} />
            Full Stack Developer
          </div>
          <h1 className={styles.h1}>
            Dakota
            <br />
            <span className={styles.indent}>
              <span className={styles.italic}>Mauza</span>
            </span>
          </h1>
        </div>

        <div className={styles.right}>
          <p className={styles.desc}>
            I&apos;m a frontend-focused full stack developer who builds things people actually enjoy
            using. Thoughtful interfaces, clean code, and a genuine interest in getting the details
            right.
          </p>
          <div className={styles.stats}>
            <div>
              <span className={styles.statNum}>5+</span>
              <div className={styles.statLabel}>Years building</div>
            </div>
            <div>
              <span className={styles.statNum}>30+</span>
              <div className={styles.statLabel}>Projects shipped</div>
            </div>
            <div>
              <span className={styles.statNum}>∞</span>
              <div className={styles.statLabel}>Coffee consumed</div>
            </div>
          </div>
          <div className={styles.actions}>
            <a href="#portfolio" className={styles.btnPrimary}>See my work</a>
            <a href="#contact" className={styles.btnGhost}>Get in touch</a>
          </div>
        </div>
      </div>
    </section>
  )
}
