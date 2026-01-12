'use client'

import { useEffect, useState, useRef } from 'react'

export const useScroll = () => {
  const [scrollY, setScrollY] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const updateScroll = () => {
      const currentScroll = window.scrollY
      const documentHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      )
      setScrollY(currentScroll)
      setMaxScroll(documentHeight)
      rafId.current = null
    }

    const handleScroll = () => {
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(updateScroll)
      }
    }

    // Mise à jour initiale
    updateScroll()

    // Écouter le scroll avec passive pour de meilleures performances
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateScroll)
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [])

  const scrollProgress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0

  return { scrollY, maxScroll, scrollProgress }
}
