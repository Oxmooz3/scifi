'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MENU_SECTIONS } from '@/utils/constants'
import { useScroll } from '@/hooks/useScroll'

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-4 right-4 z-50 md:hidden p-3 rounded-lg hologram-effect text-sci-fi-cyan hover:bg-sci-fi-cyan/20 transition-all"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 flex flex-col justify-center gap-1">
          <span className={`block h-0.5 w-full bg-sci-fi-cyan transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`block h-0.5 w-full bg-sci-fi-cyan transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-full bg-sci-fi-cyan transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </div>
      </button>

      {/* Navigation menu */}
      <nav className={`fixed top-0 right-0 z-40 h-full w-64 transform transition-transform duration-300 md:relative md:top-8 md:right-8 md:h-auto md:w-auto md:transform-none ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
      }`}>
        <div className="flex flex-col gap-2 p-4 h-full bg-sci-fi-darker/95 backdrop-blur-sm md:bg-transparent md:p-0 md:gap-4">
          {MENU_SECTIONS.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`px-4 py-3 md:px-6 md:py-3 rounded-lg font-orbitron text-sm md:text-sm transition-all ${
                activeSection === section.id
                  ? 'bg-sci-fi-cyan text-sci-fi-darker glow-effect'
                  : 'hologram-effect text-sci-fi-cyan hover:bg-sci-fi-cyan/20'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {section.title}
            </motion.button>
          ))}
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  )
}
