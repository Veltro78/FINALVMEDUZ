import { motion } from 'framer-motion'

const COLORS = ['#ff6f7d', '#ffcf3f', '#b98af0', '#5cd88a', '#38c6e6', '#ffab5c']

export default function Confetti({ trigger }) {
  if (!trigger) return null

  const pieces = Array.from({ length: 24 }, (_, i) => ({
    id: `${trigger}-${i}`,
    x: (Math.random() - 0.5) * 220,
    rotate: Math.random() * 360,
    color: COLORS[i % COLORS.length],
    delay: Math.random() * 0.15,
    size: 6 + Math.random() * 6
  }))

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center overflow-visible">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-sm"
          style={{ width: p.size, height: p.size * 1.6, backgroundColor: p.color, top: 0 }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: p.x,
            y: 160 + Math.random() * 60,
            opacity: 0,
            rotate: p.rotate
          }}
          transition={{ duration: 1.1, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}
