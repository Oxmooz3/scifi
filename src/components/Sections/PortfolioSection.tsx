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
          className="text-5xl md:text-6xl font-orbitron text-gradient mb-12 text-center"
        >
          PORTFOLIO
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="hologram-effect p-6 rounded-lg hover:glow-effect transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-orbitron text-sci-fi-cyan mb-2">
                {project.name}
              </h3>
              <p className="text-sm font-exo text-white/80">
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
