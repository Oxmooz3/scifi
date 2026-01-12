'use client'

import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, ShaderMaterial } from 'three'
import * as THREE from 'three'
import { PLANET_RADIUS } from '@/utils/constants'

export default function Planet() {
  const planetRef = useRef<Mesh>(null)
  const atmosphereRef = useRef<Mesh>(null)
  const shaderMaterialRef = useRef<ShaderMaterial>(null)

  // Shader pour l'effet holographique
  const holographicShader = useMemo(
    () => ({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x00ffff) },
        color2: { value: new THREE.Color(0x0066ff) },
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vPosition = position;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vec3 viewDirection = normalize(cameraPosition - vPosition);
          float fresnel = pow(1.0 - dot(viewDirection, vNormal), 2.0);
          
          vec3 color = mix(color1, color2, fresnel);
          float alpha = 0.7 + fresnel * 0.3;
          
          // Effet de scanlines
          float scanline = sin(vPosition.y * 50.0 + time * 2.0) * 0.5 + 0.5;
          color += scanline * 0.1;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
    }),
    []
  )

  // interactive rotation state
  const dragging = useRef(false)
  const start = useRef({ x: 0, y: 0 })
  const startRotation = useRef({ x: 0, y: 0 })
  const targetRotation = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    // continuous auto-rotation when not dragging
    if (!dragging.current) {
      targetRotation.current.y += 0.002
    }

    if (planetRef.current) {
      // smooth towards target rotation
      planetRef.current.rotation.x = THREE.MathUtils.lerp(
        planetRef.current.rotation.x,
        targetRotation.current.x,
        0.12
      )
      planetRef.current.rotation.y = THREE.MathUtils.lerp(
        planetRef.current.rotation.y,
        targetRotation.current.y,
        0.12
      )
    }

    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = planetRef.current ? planetRef.current.rotation.y * -0.5 : 0
    }
    
    // Mise à jour du shader time
    if (shaderMaterialRef.current) {
      shaderMaterialRef.current.uniforms.time.value = state.clock.getElapsedTime()
    }
  })

  // handlers for drag
  const onPointerDown = (e: any) => {
    e.stopPropagation()
    dragging.current = true
    start.current = { x: e.clientX, y: e.clientY }
    startRotation.current = { x: targetRotation.current.x, y: targetRotation.current.y }
    document.body.style.cursor = 'grabbing'

    // ensure we capture pointer up even if pointer leaves the canvas
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointermove', onPointerMove)
  }

  const onPointerMove = (e: PointerEvent) => {
    if (!dragging.current) return
    const dx = e.clientX - start.current.x
    const dy = e.clientY - start.current.y
    const sensitivity = 0.005
    targetRotation.current.y = startRotation.current.y + dx * sensitivity
    targetRotation.current.x = startRotation.current.x + dy * sensitivity * 0.5
  }

  const onPointerUp = (e: PointerEvent) => {
    dragging.current = false
    document.body.style.cursor = 'default'
    window.removeEventListener('pointerup', onPointerUp)
    window.removeEventListener('pointermove', onPointerMove)
  }

  // réseau interne (nœuds + arêtes) dessiné en LineSegments
  const networkGeometry = useMemo(() => {
    const N = 60
    const nodes: THREE.Vector3[] = []

    for (let i = 0; i < N; i++) {
      // points uniformes approximatifs sur la sphère
      const v = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize()
      v.multiplyScalar(PLANET_RADIUS * (0.55 + Math.random() * 0.25)) // légèrement à l'intérieur
      nodes.push(v)
    }

    const segments: number[] = []

    for (let i = 0; i < N; i++) {
      // trouver les 3 voisins les plus proches
      const dists: Array<{ idx: number; d: number }> = []
      for (let j = 0; j < N; j++) {
        if (i === j) continue
        dists.push({ idx: j, d: nodes[i].distanceToSquared(nodes[j]) })
      }
      dists.sort((a, b) => a.d - b.d)
      const k = 3
      for (let m = 0; m < k; m++) {
        const j = dists[m].idx
        // éviter duplications en ne créant l'arête que si i < j
        if (i < j) {
          const a = nodes[i]
          const b = nodes[j]
          segments.push(a.x, a.y, a.z, b.x, b.y, b.z)
        }
      }
    }

    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(segments)
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geometry
  }, [])

  const networkRef = useRef<THREE.LineSegments>(null)

  useFrame(() => {
    // légère animation du réseau
    if (networkRef.current) {
      networkRef.current.rotation.y += 0.0015
    }
  })

  return (
    <group>
      {/* Planète principale */}
      <mesh
        ref={planetRef}
        position={[0, 0, 0]}
        onPointerDown={onPointerDown}
        // attach pointer cursor
        onPointerEnter={() => (document.body.style.cursor = 'grab')}
        onPointerLeave={() => !dragging.current && (document.body.style.cursor = 'default')}
      >
        <icosahedronGeometry args={[PLANET_RADIUS, 2]} />
        <shaderMaterial
          ref={shaderMaterialRef}
          {...holographicShader}
          side={THREE.DoubleSide}
          transparent
        />
      </mesh>

      {/* Réseau interne (lignes) */}
      <lineSegments ref={networkRef} geometry={networkGeometry} position={[0, 0, 0]}>
        <lineBasicMaterial color="#00FFFF" transparent opacity={0.9} linewidth={1} />
      </lineSegments>

      {/* Atmosphère avec glow */}
      <mesh ref={atmosphereRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[PLANET_RADIUS * 1.1, 1]} />
        <meshBasicMaterial
          color="#00FFFF"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>

    </group>
  )
}
