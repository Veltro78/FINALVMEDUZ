import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

/**
 * Rendered once in App.jsx, outside the routed page tree, so it persists
 * across navigation. Two full-bleed background images are crossfaded with
 * opacity based on whether we're on the home/splash screen or a sub-page —
 * this is what makes navigating feel like one continuous scene instead of
 * pages hard-cutting between two different pictures.
 */
export default function AppBackground() {
  const location = useLocation()
  const isHome = location.pathname === '/' || location.pathname === '/accueil'

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-top"
        style={{ backgroundImage: "url('/backgrounds/bg-main.jpg')" }}
        animate={{ opacity: isHome ? 1 : 0, scale: isHome ? 1 : 1.04 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute inset-0 bg-cover bg-top"
        style={{ backgroundImage: "url('/backgrounds/bg-secondary.jpg')" }}
        animate={{ opacity: isHome ? 0 : 1, scale: isHome ? 1.04 : 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(6,40,54,0.05) 0%, rgba(6,40,54,0.22) 55%, rgba(4,28,38,0.62) 100%)'
        }}
      />
    </div>
  )
}
