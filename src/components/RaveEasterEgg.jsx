import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Portal from './Portal.jsx'
import { playAnthemOrFallback } from '../utils/sfx.js'

const COLORS = ['#ff6f7d', '#b98af0', '#38c6e6', '#ffcf3f', '#5cd88a']
const DURATION_MS = 10000

function ConfettiField() {
  const pieces = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 1.5,
    duration: 2 + Math.random() * 2,
    color: COLORS[i % COLORS.length],
    size: 6 + Math.random() * 8,
    rotate: Math.random() * 360
  }))
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0 rounded-sm"
          style={{ left: `${p.x}%`, width: p.size, height: p.size * 1.6, backgroundColor: p.color }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{ y: '110vh', opacity: [1, 1, 0], rotate: p.rotate }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </div>
  )
}

export default function RaveEasterEgg({ active, onDone }) {
  const [flashColor, setFlashColor] = useState(COLORS[0])

  useEffect(() => {
    if (!active) return
    const stopAudio = playAnthemOrFallback(DURATION_MS)
    const strobe = setInterval(() => {
      setFlashColor(COLORS[Math.floor(Math.random() * COLORS.length)])
    }, 90)
    const endTimer = setTimeout(() => {
      onDone?.()
    }, DURATION_MS)
    return () => {
      stopAudio()
      clearInterval(strobe)
      clearTimeout(endTimer)
    }
  }, [active, onDone])

  return (
    <AnimatePresence>
      {active && (
        <Portal>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: flashColor, transition: 'background-color 0.06s linear' }}
          >
            <ConfettiField />
            <motion.p
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [1, 1.15, 1], opacity: 1 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
              className="font-display font-extrabold text-white text-3xl text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] px-6"
            >
              🦑 MODE RAVE 🦑
            </motion.p>
          </motion.div>
        </Portal>
      )}
    </AnimatePresence>
  )
}
