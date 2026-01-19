'use client'

import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Vector3 } from 'three'
import * as THREE from 'three'
import { Text } from '@react-three/drei'
import { MenuSection } from '@/types'
import { ORBIT_RADIUS, MENU_SECTIONS, PLANET_RADIUS } from '@/utils/constants'

interface MenuPanelProps {
  section: MenuSection
  index: number
  isHovered: boolean
  isActive?: boolean
  onHover: (id: string | null) => void
  baseRotation: number
}

export default function MenuPanel({ section, index, isHovered, isActive, onHover, baseRotation }: MenuPanelProps) {
  // Keep this component for potential future use, but render nothing now to avoid 3D overlap
  return null

  const groupRef = useRef<Group>(null)
  const textRef = useRef<THREE.Group>(null)
  const lineRef = useRef<any>(null)
  const [hovered, setHovered] = useState(false)

  // Combinaison d'états pour le rendu (hover local + hover externe + active via scroll)
  const isActiveNow = hovered || isHovered || isActive

  // Angle de base pour la position orbitale (répartition uniforme)
  const baseAngle = (index / MENU_SECTIONS.length) * Math.PI * 2
  // Variation verticale pour créer une orbite en 3D
  const verticalOffset = Math.sin(baseAngle) * 1.5

  // Position de la planète (origine)
  const planetPosition = useMemo(() => new Vector3(0, 0, 0), [])

  useFrame((state) => {
    if (!groupRef.current) return
    
    // Rotation orbitale combinée (scroll + angle de base)
    const totalRotation = baseRotation + baseAngle
    
    // Position orbitale en cercle autour de la planète avec variation verticale
    const x = Math.cos(totalRotation) * ORBIT_RADIUS
    const y = verticalOffset + Math.sin(state.clock.getElapsedTime() * 0.2 + index) * 0.2
    const z = Math.sin(totalRotation) * ORBIT_RADIUS
    
    const textPosition = new Vector3(x, y, z)
    groupRef.current.position.copy(textPosition)
    
    if (textRef.current) {
      // Rotation du texte pour toujours faire face à la caméra
      textRef.current.lookAt(state.camera.position)
      
      // Combinaison d'états : hover local, hover externe et active (scroll)
      const isActiveNow = hovered || isHovered || isActive

      // Scale sur hover/active avec animation fluide
      const baseScale = isActiveNow ? 1.5 : 1
      const pulse = isActiveNow ? 1 + Math.sin(state.clock.getElapsedTime() * 4) * 0.1 : 1
      const targetScale = baseScale * pulse
      textRef.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.2)
    }

    // Mise à jour de la ligne HUD
    if (lineRef.current && textPosition.length() > 0.1) {
      try {
        const lineGeometry = lineRef.current.geometry as THREE.BufferGeometry
        const positions = lineGeometry.attributes.position as THREE.BufferAttribute
        
        if (positions) {
          // Point de départ : surface de la planète (en coordonnées relatives au groupe)
          const planetSurface = textPosition.clone().normalize().multiplyScalar(PLANET_RADIUS * 1.1)
          const lineStart = planetSurface.sub(textPosition)
          const lineEnd = new Vector3(0, 0, 0)
          
          positions.setXYZ(0, lineStart.x, lineStart.y, lineStart.z)
          positions.setXYZ(1, lineEnd.x, lineEnd.y, lineEnd.z)
          positions.needsUpdate = true

          // Mise à jour du matériau (couleur/opacity) en fonction de l'état actif
          if (lineRef.current) {
            const mat = (lineRef.current.material as any)
            mat.color.set(isActiveNow ? '#00FFFF' : '#0066FF')
            mat.opacity = isActiveNow ? 0.8 : 0.5
            mat.needsUpdate = true
          }
        }
      } catch (e) {
        // Ignorer les erreurs de mise à jour de ligne
      }
    }
  })

  const handleClick = () => {
    const scrollPosition = (index / MENU_SECTIONS.length) * (document.documentElement.scrollHeight - window.innerHeight)
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth',
    })
  }

  // Géométrie de ligne initiale
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(6) // 2 points * 3 coordonnées
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geometry
  }, [])

  // Matériel et objet Line (utilisé via <primitive> pour éviter les conflits de typage JSX/SVG)
  const lineMaterialRef = useRef(new THREE.LineBasicMaterial({
    color: '#0066FF',
    transparent: true,
    opacity: 0.5,
    linewidth: 2,
  }))

  const lineObject = useMemo(() => {
    return new THREE.Line(lineGeometry, lineMaterialRef.current)
  }, [lineGeometry])

  return (
    <group ref={groupRef}>
      {/* Ligne HUD qui part de la planète */}
      <primitive ref={lineRef} object={lineObject} />

      {/* Zone cliquable invisible */}
      <mesh
        position={[0, 0, 0]}
        onPointerEnter={() => {
          setHovered(true)
          onHover(section.id)
          document.body.style.cursor = 'pointer'
        }}
        onPointerLeave={() => {
          setHovered(false)
          onHover(null)
          document.body.style.cursor = 'default'
        }}
        onClick={handleClick}
      >
        <planeGeometry args={[3, 1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Groupe pour le texte */}
      <group ref={textRef}>
        {/* Texte principal */}
        <Text
          position={[0, 0.15, 0]}
          fontSize={0.4}
          color={isActiveNow ? '#00FFFF' : '#FFFFFF'}
          anchorX="center"
          anchorY="middle"
          outlineWidth={isActiveNow ? 0.03 : 0.02}
          outlineColor="#000000"
        >
          {section.title}
        </Text>
        
        {/* Description */}
        <Text
          position={[0, -0.2, 0]}
          fontSize={0.18}
          color={isActiveNow ? '#00FFFF' : '#88CCFF'}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#000000"
        >
          {section.description}
        </Text>
      </group>
    </group>
  )
}
