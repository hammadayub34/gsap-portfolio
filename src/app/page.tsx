'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Blogs from '@/components/Blogs'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'

export default function Home() {
  // Global ScrollTrigger refresh — fixes stale positions after page refresh
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Scroll to top instantly on refresh so animations start from correct position
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    // After all components mount and layout is settled, refresh trigger positions
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    return () => cancelAnimationFrame(rafId)
  }, [])

  // Custom cursor follower
  useEffect(() => {
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
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Blogs />
      <Testimonials />
      <Contact />
    </>
  )
}