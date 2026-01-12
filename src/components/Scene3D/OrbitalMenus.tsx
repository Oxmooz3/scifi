'use client'

import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import * as THREE from 'three'
import { Text } from '@react-three/drei'
import { MENU_SECTIONS, TOTAL_SECTIONS, ORBIT_RADIUS } from '@/utils/constants'
import MenuPanel from './MenuPanel'
import { useScroll } from '@/hooks/useScroll'

export default function OrbitalMenus() {
  // No 3D frames anymore — handled in 2D HUD overlay to avoid occlusion with planet
  return null
}
