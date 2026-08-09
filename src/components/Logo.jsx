import { motion } from 'framer-motion'

/**
 * The one and only logo asset for the app — a single image, so it is
 * pixel-identical everywhere it's used. `size` only scales it.
 * Swap /public/logo/logo.png to update the logo across the whole app.
 */
export default function Logo({ size = 'lg' }) {
  const widths = {
    xl: 'w-[85%] max-w-sm',
    lg: 'w-[95%] max-w-lg',
    sm: 'w-40 sm:w-44'
  }
  const w = widths[size] || widths.lg

  return (
    <motion.img
      src="/logo/logo.png"
      alt="Le Medusa des Shlagos — Édition 2026"
      className={`${w} mx-auto`}
      style={{
        WebkitMaskImage:
          'radial-gradient(ellipse 95% 92% at center, black 78%, transparent 100%)',
        maskImage:
          'radial-gradient(ellipse 95% 92% at center, black 78%, transparent 100%)'
      }}
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    />
  )
}
