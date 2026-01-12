'use client'

import { motion } from 'framer-motion'

export default function HomeSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative"
    >
      <div className="text-center z-10 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-8xl font-orbitron text-gradient mb-6"
        >
          BIENVENUE
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-xl md:text-2xl text-sci-fi-cyan font-exo"
        >
          Dans l'espace numérique du futur
        </motion.p>
      </div>
    </section>
  )
}
