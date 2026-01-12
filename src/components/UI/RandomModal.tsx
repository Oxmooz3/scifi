'use client'

import React, { useEffect } from 'react'

interface RandomModalProps {
  open: boolean
  title?: string
  onClose: () => void
}

// Génère un petit contenu aléatoire dans l'esprit scifi
function generateRandomContent(seed?: number) {
  const snippets = [
    'Journal de bord : mise à jour des nœuds en cours — latence nominale.',
    'Analyse : flux neutrino détecté entre les systèmes 4•B et 9•C.',
    'Artifact : structure geometrico‑fractale capturée lors du dernier survol.',
    'Protocol : synchronisation des relais réseau — redémarrage automatique.',
    'Observation : tempêtes magnétiques augmentent la réfraction holographique.'
  ]

  const titles = [
    'Log d’instance',
    'Analyse réseau',
    'Observation',
    'Carte de nœuds',
    'Signal inconnu'
  ]

  const rand = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

  // Generate paragraphs with a fixed source per paragraph so they don't change on re-renders
  const paragraphs = new Array(3).fill(0).map(() => {
    const text = rand(snippets)
    const system = Math.ceil(Math.random() * 12)
    const node = Math.ceil(Math.random() * 99)
    return { text, source: `Système ${system} / Node ${node}` }
  })

  return {
    title: rand(titles),
    paragraphs,
    meta: {
      id: Math.random().toString(36).slice(2, 9).toUpperCase(),
      timestamp: new Date().toLocaleString(),
    },
  }
}

import ReactDOM from 'react-dom'

export default function RandomModal({ open, title, onClose }: RandomModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Generate random content when the component mounts (modal is only rendered when `open`)
  // Using an empty deps array is fine since the component is mounted each time `open` becomes true
  const data = React.useMemo(() => generateRandomContent(), [])

  if (!open) return null

  return ReactDOM.createPortal(
    <div style={{ zIndex: 9999 }} className="fixed inset-0 flex items-center justify-center pointer-events-auto">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative z-50 w-[min(880px,92%)] max-w-3xl rounded-lg border border-sky-500 bg-gradient-to-b from-black/70 to-black/60 p-6 shadow-2xl">
        <header className="flex items-start justify-between gap-4">
          <div>
            {/* Use the provided title when available so the header remains static */}
            <div className="text-xs text-sky-300">{title ?? data.title}</div>
            <h3 className="text-2xl font-semibold text-white">{title ?? data.title}</h3>
            <div className="text-xs text-sky-400 mt-1">ID {data.meta.id} • {data.meta.timestamp}</div>
          </div>

          <button
            onClick={onClose}
            className="ml-auto rounded-md border border-sky-500 px-3 py-1 text-sm text-sky-200 hover:bg-white/5"
          >
            Fermer
          </button>
        </header>

        <hr className="my-4 border-sky-900" />

        {/* Encadrés avec contenu aléatoire */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.paragraphs.map((p: {text: string; source: string}, idx: number) => (
            <div key={idx} className="rounded-md border border-sky-500 bg-black/40 p-4">
              <div className="text-sm text-sky-100">{p.text}</div>
              <div className="mt-2 text-xs text-sky-300 opacity-80">• Source: {p.source}</div>
            </div>
          ))}
        </div>

        {/* Footer small tips */}
        <div className="mt-4 text-xs text-sky-300 opacity-80">Tip: cliquez sur le fond pour fermer ou appuyez sur « Échap ».</div>
      </div>
    </div>,
    document.body
  )
}
