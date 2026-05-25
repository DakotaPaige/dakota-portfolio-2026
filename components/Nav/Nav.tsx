'use client'

import { useEffect, useRef } from 'react'
import styles from './Nav.module.css'

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      navRef.current?.classList.toggle(styles.scrolled, window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav ref={navRef} className={styles.nav}>
      <a href="#hero" className={styles.logo}>D. Mauza</a>
      <div className={styles.navRight}>
        <ul className={styles.navLinks}>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#portfolio">Work</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" className={styles.hire}>Available for hire</a>
      </div>
    </nav>
  )
}
