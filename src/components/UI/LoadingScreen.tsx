'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-sci-fi-darker">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-orbitron text-gradient mb-8">
          INITIALISATION...
        </h1>
        <div className="w-64 h-1 bg-sci-fi-dark rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-sci-fi-cyan via-sci-fi-blue to-sci-fi-purple"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="mt-4 text-sci-fi-cyan font-exo">{progress}%</p>
      </motion.div>
    </div>
  )
}
