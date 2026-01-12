export interface MenuSection {
  id: string
  title: string
  description: string
  image?: string
  position: [number, number, number]
  rotation: [number, number, number]
}

export interface ScrollSection {
  id: string
  name: string
  content: React.ReactNode
}

export type SectionId = 'home' | 'about' | 'services' | 'portfolio' | 'contact'
