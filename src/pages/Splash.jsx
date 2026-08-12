import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from '../components/Logo.jsx'
import SplashFloaters from '../components/SplashFloaters.jsx'
import { tips } from '../data/tips.js'

export default function Splash() {
  const navigate = useNavigate()
  const [tip] = useState(() => tips[Math.floor(Math.random() * tips.length)])

  useEffect(() => {
    const t = setTimeout(() => navigate('/accueil'), 2200)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div
      className="app-shell flex flex-col items-center justify-center cursor-pointer relative overflow-hidden"
      onClick={() => navigate('/accueil')}
    >
      <SplashFloaters />

      {/* léger voile en bas pour la lisibilité + la profondeur, sans jamais être blanc */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(4,28,38,0) 0%, rgba(4,28,38,0.45) 100%)' }}
      />

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="flex flex-col items-center gap-6"
      >
        <Logo size="xl" />
        <motion.div
          className="mt-4 h-1.5 w-40 rounded-full bg-white/25 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="h-full bg-sun-400 rounded-full"
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-white/70 text-xs font-body text-center max-w-[240px] px-2"
        >
          💡 {tip}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute z-10"
        style={{ bottom: 'calc(env(safe-area-inset-bottom) + 22px)' }}
      >
        <motion.span
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="glass-card rounded-full px-5 py-2 text-white/90 text-xs font-display font-semibold"
        >
          Touche l'écran pour continuer
        </motion.span>
      </motion.div>
    </div>
  )
}
