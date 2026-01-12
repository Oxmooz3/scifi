import { MenuSection } from '@/types'

export const MENU_SECTIONS: MenuSection[] = [
  {
    id: 'home',
    title: 'ACCUEIL',
    description: 'Bienvenue',
    image: 'https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=0b1c4f1b2b6aef9b6c7f9ed08f7e3b3b',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: 'about',
    title: 'À PROPOS',
    description: 'Notre histoire',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=6cf1d3a5c0f9c1320e4c3e8b6c2a19ad',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: 'services',
    title: 'SERVICES',
    description: 'Technologies',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=4d9e0d6f3fbe6f3f6b1d2f1a4f2f2f2a',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: 'portfolio',
    title: 'PORTFOLIO',
    description: 'Projets',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=0d6e2a3d2a1f1c3f4a5b6c7d8e9f0a1b',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: 'contact',
    title: 'CONTACT',
    description: 'Nous contacter',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
]

export const PLANET_RADIUS = 1.5
export const ORBIT_RADIUS = 5
export const CAMERA_POSITION: [number, number, number] = [0, 0, 10]
export const TOTAL_SECTIONS = MENU_SECTIONS.length
