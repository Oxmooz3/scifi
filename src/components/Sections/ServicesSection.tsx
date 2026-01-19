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
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-orbitron text-gradient mb-8 xs:mb-10 sm:mb-12 text-center"
        >
          SERVICES
        </motion.h2>
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="hologram-effect p-4 xs:p-6 sm:p-8 rounded-lg hover:glow-effect transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl xs:text-5xl sm:text-6xl mb-4">{service.icon}</div>
              <h3 className="text-lg xs:text-xl sm:text-2xl font-orbitron text-sci-fi-cyan mb-2">
                {service.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
