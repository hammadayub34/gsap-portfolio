'use client'

import { useEffect } from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'

export default function Home() {
  useEffect(() => {
    // Custom cursor follower (optional enhancement)
    const cursor = document.getElementById('cursor-follower')
    if (!cursor) return

    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e
      cursor.style.left = `${clientX}px`
      cursor.style.top = `${clientY}px`
      cursor.style.opacity = '0.5'
    }

    const hideCursor = () => {
      cursor.style.opacity = '0'
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseleave', hideCursor)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseleave', hideCursor)
    }
  }, [])

  return (
    <>
      {/* Hero Section - Full viewport */}
      <section id="home" className="relative">
        <Hero />
      </section>

      {/* Decorative transition */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* About Section */}
      <section id="about" className="relative">
        <About />
      </section>

      {/* Decorative transition */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Skills Section */}
      <section id="skills" className="relative">
        <Skills />
      </section>

      {/* Decorative transition */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Projects Section */}
      <section id="projects" className="relative">
        <Projects />
      </section>

      {/* Decorative transition */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Contact Section */}
      <section id="contact" className="relative">
        <Contact />
      </section>
    </>
  )
}