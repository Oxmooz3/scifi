'use client'

import { motion } from 'framer-motion'
import { useScroll } from '@/hooks/useScroll'
import { TOTAL_SECTIONS } from '@/utils/constants'

export default function ScrollIndicator() {
  const { scrollProgress } = useScroll()

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
      <div className="flex flex-col items-center gap-2">
        <motion.div
          className="w-6 h-10 border-2 border-sci-fi-cyan rounded-full p-1 glow-effect"
          initial={{ opacity: 0 }}
          animate={{ opacity: scrollProgress > 0.95 ? 0 : 1 }}
        >
          <motion.div
            className="w-full bg-gradient-to-t from-sci-fi-cyan to-sci-fi-blue rounded-full"
            style={{
              height: `${Math.min(scrollProgress * 100, 100)}%`,
            }}
          />
        </motion.div>
        <motion.p
          className="text-xs text-sci-fi-cyan font-orbitron"
          animate={{ opacity: scrollProgress > 0.95 ? 0 : 1 }}
        >
          Défilez pour explorer
        </motion.p>
      </div>
    </div>
  )
}
