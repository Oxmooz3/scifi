import type { Metadata } from 'next'
import { Orbitron, Exo_2 } from 'next/font/google'
import './globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

const exo = Exo_2({
  subsets: ['latin'],
  variable: '--font-exo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sci-Fi Interactive Site',
  description: 'An interactive sci-fi website with Three.js and React',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${orbitron.variable} ${exo.variable}`}>
      <body className="bg-sci-fi-darker text-white">
        {children}
      </body>
    </html>
  )
}
