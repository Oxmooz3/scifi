'use client'

import { motion } from 'framer-motion'

const services = [
  { title: 'Développement 3D', icon: '🎮' },
  { title: 'Web Design', icon: '🎨' },
  { title: 'Intelligence Artificielle', icon: '🤖' },
  { title: 'Réalité Virtuelle', icon: '🥽' },
]

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="min-h-screen flex items-center justify-center relative px-4"
    >
      <div className="max-w-6xl z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-orbitron text-gradient mb-12 text-center"
        >
          SERVICES
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="hologram-effect p-8 rounded-lg hover:glow-effect transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-6xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-orbitron text-sci-fi-cyan mb-2">
                {service.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
