'use client'

import { Suspense, useEffect } from 'react'
import Scene3D from '@/components/Scene3D/Scene3D'
import LoadingScreen from '@/components/UI/LoadingScreen'
import ErrorBoundary from '@/components/UI/ErrorBoundary'
import ScrollIndicator from '@/components/UI/ScrollIndicator'
import { TOTAL_SECTIONS } from '@/utils/constants'

export default function Home() {
  useEffect(() => {
    // Créer des sections invisibles pour le scroll
    const sections = ['home', 'about', 'services', 'portfolio', 'contact']
    const createdSections: HTMLElement[] = []
    
    sections.forEach((id) => {
      let section = document.getElementById(id)
      if (!section) {
        section = document.createElement('div')
        section.id = id
        section.style.height = '100vh'
        section.style.width = '100%'
        section.style.pointerEvents = 'none'
        document.body.appendChild(section)
        createdSections.push(section)
      }
    })
    
    return () => {
      createdSections.forEach((section) => {
        if (section.parentNode) {
          section.parentNode.removeChild(section)
        }
      })
    }
  }, [])

  return (
    <ErrorBoundary>
      <main className="relative overflow-x-hidden">
        <Suspense fallback={<LoadingScreen />}>
          <Scene3D />
          <ScrollIndicator />
          
          {/* Sections invisibles pour le scroll */}
          <div className="relative z-0 pointer-events-none">
            {Array.from({ length: TOTAL_SECTIONS }).map((_, index) => (
              <div
                key={index}
                id={['home', 'about', 'services', 'portfolio', 'contact'][index]}
                className="h-screen w-full"
              />
            ))}
          </div>
        </Suspense>
      </main>
    </ErrorBoundary>
  )
}
