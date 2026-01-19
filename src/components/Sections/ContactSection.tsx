'use client'

import { motion } from 'framer-motion'

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center relative px-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-2xl z-10 w-full"
      >
        <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-orbitron text-gradient mb-6 xs:mb-7 sm:mb-8 text-center">
          CONTACT
        </h2>
        <div className="hologram-effect p-4 xs:p-6 sm:p-8 rounded-lg">
          <form className="space-y-6">
            <div>
              <label className="block text-sm xs:text-base sm:text-base text-sci-fi-cyan font-orbitron mb-2">
                Nom
              </label>
              <input
                type="text"
                className="w-full bg-sci-fi-dark/50 border border-sci-fi-cyan/30 rounded-lg px-3 xs:px-4 py-2 xs:py-3 text-white focus:outline-none focus:border-sci-fi-cyan transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm xs:text-base sm:text-base text-sci-fi-cyan font-orbitron mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-sci-fi-dark/50 border border-sci-fi-cyan/30 rounded-lg px-3 xs:px-4 py-2 xs:py-3 text-white focus:outline-none focus:border-sci-fi-cyan transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm xs:text-base sm:text-base text-sci-fi-cyan font-orbitron mb-2">
                Message
              </label>
              <textarea
                rows={5}
                className="w-full bg-sci-fi-dark/50 border border-sci-fi-cyan/30 rounded-lg px-3 xs:px-4 py-2 xs:py-3 text-white focus:outline-none focus:border-sci-fi-cyan transition-colors"
              />
            </div>
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-sci-fi-cyan to-sci-fi-blue text-sci-fi-darker font-orbitron py-3 xs:py-4 rounded-lg glow-effect text-sm xs:text-base"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ENVOYER
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  )
}
