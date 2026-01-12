'use client'

import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect } from 'react'
import { setPlanetScreen } from '@/utils/planetScreen'

export default function PlanetTracker() {
  const { camera, size } = useThree()
  const vec = new THREE.Vector3()

  useFrame(() => {
    // Planet assumed at world origin (0,0,0)
    vec.set(0, 0, 0)
    vec.project(camera)

    const x = (vec.x * 0.5 + 0.5) * size.width
    const y = (-vec.y * 0.5 + 0.5) * size.height

    setPlanetScreen(x, y)
  })

  // no render
  useEffect(() => () => {}, [])
  return null
}