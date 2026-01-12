'use client'

import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center relative px-4"
    >
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl z-10"
      >
        <h2 className="text-5xl md:text-6xl font-orbitron text-gradient mb-8">
          À PROPOS
        </h2>
        <div className="hologram-effect p-8 rounded-lg">
          <p className="text-lg md:text-xl font-exo text-sci-fi-cyan mb-4">
            Nous sommes une équipe passionnée par les technologies de pointe
            et l'innovation numérique.
          </p>
          <p className="text-base md:text-lg font-exo text-white/80">
            Notre mission est de créer des expériences immersives qui repoussent
            les limites du possible, en combinant art et technologie pour
            façonner le futur du web.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
