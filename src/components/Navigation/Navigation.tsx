'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MENU_SECTIONS } from '@/utils/constants'
import { useScroll } from '@/hooks/useScroll'

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home')
  const { scrollY } = useScroll()

  useEffect(() => {
    const handleScroll = () => {
      const sections = MENU_SECTIONS.map((s) => s.id)
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - 100
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <nav className="fixed top-8 right-8 z-40">
      <div className="flex flex-col gap-4">
        {MENU_SECTIONS.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`px-6 py-3 rounded-lg font-orbitron text-sm transition-all ${
              activeSection === section.id
                ? 'bg-sci-fi-cyan text-sci-fi-darker glow-effect'
                : 'hologram-effect text-sci-fi-cyan hover:bg-sci-fi-cyan/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {section.title}
          </motion.button>
        ))}
      </div>
    </nav>
  )
}
