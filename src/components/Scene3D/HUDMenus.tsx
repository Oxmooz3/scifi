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
      const radius = Math.max(220, Math.min(width, height) * 0.28)
      const angleOffset = -Math.PI / 2 // start at top

      // spacing constraints
      const minDist = 220 // minimal center-to-center between boxes
      const marginX = 110
      const marginY = 70
      const minFromPlanet = radius + 48

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

        return (
          <div
            key={s.id}
            className={`pointer-events-auto fixed z-50 transform transition-transform duration-200 ${isSelected || isPressedNow ? 'scale-105' : 'scale-100'}`}
            style={{ width: 220, left: pos.left, top: pos.top, transform: 'translate(-50%, -50%)' }}
          >
            <button
              onClick={() => press(i)}
              onKeyDown={(e) => e.key === 'Enter' && press(i)}
              className={`w-full h-14 flex items-center gap-3 px-3 rounded-md border  border-sky-500 bg-black/40 backdrop-blur-sm text-left transition-shadow duration-200 focus:outline-none ${isSelected || isPressedNow ? 'shadow-lg shadow-sky-500/30 border-sky-300 scale-105' : 'hover:scale-105 hover:shadow-md'}`}
              aria-pressed={isSelected}
            >
              <div className={`w-10 h-10 flex-shrink-0 rounded-md flex items-center justify-center text-xs font-bold ${isSelected || isPressedNow ? 'bg-sky-400 text-black' : 'bg-transparent text-sky-200 border border-sky-500'}`}>
                {s.title.slice(0, 2)}
              </div>

              <div className="flex-1 text-sm">
                <div className={`font-semibold ${isSelected ? 'text-white' : 'text-sky-100'}`}>{s.title}</div>
                <div className="text-xs text-sky-300 opacity-80">{s.description}</div>
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