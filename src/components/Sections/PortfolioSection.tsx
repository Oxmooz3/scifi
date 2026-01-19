'use client'

import { motion } from 'framer-motion'

const projects = [
  { name: 'Projet Alpha', description: 'Expérience immersive 3D' },
  { name: 'Projet Beta', description: 'Interface futuriste' },
  { name: 'Projet Gamma', description: 'Application VR' },
]

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="min-h-screen flex items-center justify-center relative px-4"
    >
      <div className="max-w-6xl z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-orbitron text-gradient mb-8 xs:mb-10 sm:mb-12 text-center"
        >
          PORTFOLIO
        </motion.h2>
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xs:gap-5 sm:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="hologram-effect p-4 xs:p-5 sm:p-6 rounded-lg hover:glow-effect transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-lg xs:text-xl sm:text-xl font-orbitron text-sci-fi-cyan mb-2">
                {project.name}
              </h3>
              <p className="text-xs xs:text-sm sm:text-sm font-exo text-white/80">
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
