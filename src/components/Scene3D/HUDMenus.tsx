'use client'

import React from 'react'
import { MENU_SECTIONS } from '@/utils/constants'
import { useScroll } from '@/hooks/useScroll'
import { useRef, useEffect, useState } from 'react'
import { usePlanetScreen } from '@/utils/planetScreen'
import RandomModal from '@/components/UI/RandomModal'

export default function HUDMenus() {
  const { scrollProgress } = useScroll()
  const scrollActiveIndex = Math.round(scrollProgress * (MENU_SECTIONS.length - 1))
  const planet = usePlanetScreen()

  // selection state: clicks set forcedIndex (visual selection without scrolling)
  const [forcedIndex, setForcedIndex] = useState<number | null>(null)
  const [pressedIndex, setPressedIndex] = useState<number | null>(null)
  const selectedIndex = forcedIndex ?? scrollActiveIndex

  const [positions, setPositions] = useState<Array<{ left: number; top: number }>>([])

  // modal state for random content
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState<string | undefined>(undefined)

  // Clicking panels now triggers a visual press effect and sets selection (no scroll)
  const press = (i: number) => {
    console.log('[HUDMenus] press', i)
    setPressedIndex(i)
    setForcedIndex(i)

    // Don't open the modal for the home section; just scroll to top
    if (MENU_SECTIONS[i]?.id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      window.setTimeout(() => setPressedIndex((prev) => (prev === i ? null : prev)), 600)
      return
    }

    setModalTitle(MENU_SECTIONS[i]?.title ?? undefined)
    setModalOpen(true)
    window.setTimeout(() => setPressedIndex((prev) => (prev === i ? null : prev)), 600)
  }

  useEffect(() => {
    const compute = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const n = MENU_SECTIONS.length

      // distance from planet: keep a bit farther and scale with viewport
      const radius = Math.max(100, Math.min(width, height) * 0.22)
      const angleOffset = -Math.PI / 2 // start at top

      // spacing constraints - smaller on mobile
      const minDist = width < 394 ? 60 : width < 768 ? 90 : 140 // minimal center-to-center between boxes
      const marginX = width < 394 ? 25 : width < 768 ? 40 : 70
      const marginY = width < 394 ? 25 : width < 768 ? 40 : 60
      const minFromPlanet = radius + (width < 394 ? 50 : width < 768 ? 60 : 80)

      // initial placement on the circle around projected planet position
      const next: Array<{ left: number; top: number }> = []

      for (let i = 0; i < n; i++) {
        const angle = angleOffset + (i / n) * Math.PI * 2
        let x = planet.x + Math.cos(angle) * radius
        let y = planet.y + Math.sin(angle) * radius

        // enforce minimum distance from planet center
        const dxp = x - planet.x
        const dyp = y - planet.y
        const dp = Math.hypot(dxp, dyp)
        if (dp < minFromPlanet) {
          const k = (minFromPlanet / Math.max(1, dp))
          x = planet.x + dxp * k
          y = planet.y + dyp * k
        }

        // clamp to viewport with margins
        x = Math.max(marginX, Math.min(width - marginX, x))
        y = Math.max(marginY, Math.min(height - marginY, y))

        next.push({ left: x, top: y })
      }

      // simple collision resolution: iteratively push overlapping boxes apart
      for (let iter = 0; iter < 8; iter++) {
        let moved = false
        for (let i = 0; i < n; i++) {
          for (let j = i + 1; j < n; j++) {
            const a = next[i]
            const b = next[j]
            const dx = b.left - a.left
            const dy = b.top - a.top
            const dist = Math.hypot(dx, dy)
            if (dist < 1) continue

            if (dist < minDist) {
              const overlap = (minDist - dist) / 2
              const nx = dx / dist
              const ny = dy / dist

              a.left = Math.max(marginX, Math.min(width - marginX, a.left - nx * overlap))
              a.top = Math.max(marginY, Math.min(height - marginY, a.top - ny * overlap))

              b.left = Math.max(marginX, Math.min(width - marginX, b.left + nx * overlap))
              b.top = Math.max(marginY, Math.min(height - marginY, b.top + ny * overlap))

              moved = true
            }
          }
        }
        if (!moved) break
      }

      setPositions(next)
    }

    compute()
    window.addEventListener('resize', compute)
    window.addEventListener('scroll', compute, { passive: true })

    // clear forced selection when user actually scrolls / interacts
    const clearForced = () => setForcedIndex(null)
    window.addEventListener('wheel', clearForced, { passive: true })
    window.addEventListener('touchstart', clearForced, { passive: true })

    return () => {
      window.removeEventListener('resize', compute)
      window.removeEventListener('scroll', compute)
      window.removeEventListener('wheel', clearForced)
      window.removeEventListener('touchstart', clearForced)
    }
  }, [planet.x, planet.y])

  return (
    <>
      {MENU_SECTIONS.map((s, i) => {
        const pos = positions[i] ?? { left: 80 + i * 40, top: 80 }
        const isSelected = i === selectedIndex
        const isPressedNow = pressedIndex === i
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
        const isSmallMobile = typeof window !== 'undefined' && window.innerWidth < 475
        const isTinyMobile = typeof window !== 'undefined' && window.innerWidth < 394

        return (
          <div
            key={s.id}
            className={`pointer-events-auto fixed z-50 transform transition-transform duration-200 ${isSelected || isPressedNow ? 'scale-105' : 'scale-100'}`}
            style={{ 
              width: isTinyMobile ? 60 : isSmallMobile ? 80 : isMobile ? 100 : 120, 
              left: pos.left, 
              top: pos.top, 
              transform: 'translate(-50%, -50%)' 
            }}
          >
            <button
              onClick={() => press(i)}
              onKeyDown={(e) => e.key === 'Enter' && press(i)}
              className={`w-full h-16 xs:h-20 sm:h-24 md:h-28 lg:h-32 flex flex-col items-center justify-center gap-1 xs:gap-2 sm:gap-2 md:gap-3 p-1 xs:p-2 sm:p-2 md:p-3 rounded-lg border border-sky-500 bg-black/40 backdrop-blur-sm text-center transition-shadow duration-200 focus:outline-none ${isSelected || isPressedNow ? 'shadow-lg shadow-sky-500/30 border-sky-300 scale-105' : 'hover:scale-105 hover:shadow-md'}`}
              aria-pressed={isSelected}
            >
              <div className={`w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-8 md:w-10 md:h-10 flex-shrink-0 rounded-md flex items-center justify-center text-xs font-bold mb-1 ${isSelected || isPressedNow ? 'bg-sky-400 text-black' : 'bg-transparent text-sky-200 border border-sky-500'}`}>
                {s.title.slice(0, 2)}
              </div>

              <div className="text-center">
                <div className={`font-semibold text-xs xs:text-xs sm:text-xs md:text-sm ${isSelected ? 'text-white' : 'text-sky-100'}`}>{s.title}</div>
              </div>
            </button>
          </div>
        )
      })}

      {/* Modal de contenu aléatoire */}
      <RandomModal open={modalOpen} title={modalTitle} onClose={() => setModalOpen(false)} />
    </>
  )
}