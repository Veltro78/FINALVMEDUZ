import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from '../components/Logo.jsx'
import SplashFloaters from '../components/SplashFloaters.jsx'

export default function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => navigate('/accueil'), 2200)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div
      className="app-shell flex flex-col items-center justify-center cursor-pointer relative"
      onClick={() => navigate('/accueil')}
    >
      <SplashFloaters />
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
      </motion.div>
      <p className="absolute bottom-8 text-white/60 text-xs font-body">Touche l'écran pour continuer</p>
    </div>
  )
}
