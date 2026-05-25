// app/page.tsx
import Hero from '@/components/Hero/Hero'
import Skills from '@/components/Skills/Skills'
import Portfolio from '@/components/Portfolio/Portfolio'
import Contact from '@/components/Contact/Contact'
import Footer from '@/components/Footer/Footer'
import ScrollRevealInit from '@/components/ScrollRevealInit/ScrollRevealInit'

export default function Home() {
  return (
    <main>
      <ScrollRevealInit />
      <Hero />
      <Skills />
      <Portfolio />
      <Contact />
      <Footer />
    </main>
  )
}
