import { motion } from 'framer-motion'

const glowColor = {
  coral: 'bg-coral-400',
  sun: 'bg-sun-400',
  purple: 'bg-purple-400',
  turquoise: 'bg-turquoise-400',
  tropical: 'bg-tropical-400',
  orange: 'bg-orange-400'
}

/**
 * Wraps a BigButton (or anything) with a pulsing halo + a small flashy
 * badge — "casino lights" treatment. Doesn't touch the size of the child,
 * so the featured item stays the exact same size as every other button;
 * it just visually pops more.
 */
export default function Highlight({ children, color = 'sun', badge = '🔥' }) {
  return (
    <div className="relative">
      <motion.span
        className={`absolute inset-0 rounded-full ${glowColor[color]} -z-10`}
        style={{ filter: 'blur(14px)' }}
        animate={{ opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        className="absolute -top-1.5 -right-1.5 z-10 text-base"
        animate={{ scale: [1, 1.25, 1], rotate: [0, -8, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {badge}
      </motion.span>
      {children}
    </div>
  )
}
