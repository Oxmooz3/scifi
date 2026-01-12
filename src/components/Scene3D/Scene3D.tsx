'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import Planet from './Planet'
import OrbitalMenus from './OrbitalMenus'
import HUDMenus from './HUDMenus'
import PlanetTracker from './PlanetTracker'
import Particles from './Particles'
import { CAMERA_POSITION } from '@/utils/constants'

export default function Scene3D() {
  return (
    <div className="fixed inset-0 w-full h-full bg-sci-fi-darker">
      <Canvas
        className="z-10"
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#050508']} />
        <Suspense fallback={null}>
          <PerspectiveCamera
            makeDefault
            position={CAMERA_POSITION}
            fov={75}
          />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#00FFFF" />
          <pointLight position={[-10, -10, -10]} intensity={0.6} color="#9933FF" />
          
          <Planet />
          <PlanetTracker />
          <OrbitalMenus />
          <Particles />
          
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            autoRotate={false}
          />
        </Suspense>
      </Canvas>

      {/* HUD overlay 2D */}
      <HUDMenus />
    </div>
  )
}
