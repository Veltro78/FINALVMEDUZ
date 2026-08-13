import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import PageShell from '../components/PageShell.jsx'
import BigButton from '../components/BigButton.jsx'
import Countdown from '../components/Countdown.jsx'
import ArtistAlert from '../components/ArtistAlert.jsx'
import WhatsNewModal from '../components/WhatsNewModal.jsx'
import RaveEasterEgg from '../components/RaveEasterEgg.jsx'

export default function Home() {
  const [raveActive, setRaveActive] = useState(false)

  return (
    <PageShell showLogo logoSize="lg" onLogoLongPress={() => setRaveActive(true)}>
      <RaveEasterEgg active={raveActive} onDone={() => setRaveActive(false)} />
      <WhatsNewModal />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="relative mb-3 -mt-1"
      >
        <motion.span
          className="absolute inset-0 rounded-3xl bg-coral-400 -z-10"
          style={{ filter: 'blur(22px)' }}
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.04, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <Link
          to="/ou-es-tu"
          className="relative flex items-center gap-3 rounded-3xl px-5 py-4 bg-gradient-to-br from-coral-500 to-coral-600 shadow-[0_10px_28px_-6px_rgba(232,72,47,0.7)] active:scale-[0.97] transition-transform"
        >
          <motion.span
            className="text-4xl shrink-0"
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            📍
          </motion.span>
          <span className="flex-1">
            <span className="block font-display font-extrabold text-white text-lg leading-tight">
              On se retrouve
            </span>
            <span className="block font-body text-white/90 text-xs mt-0.5">
              Perdu·e ? Prévenez le groupe en 2 taps
            </span>
          </span>
          <span className="text-2xl text-white/85 shrink-0">›</span>
        </Link>
      </motion.div>

      <ArtistAlert />

      <div className="mb-2">
        <Countdown />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative mb-3"
      >
        <motion.span
          className="absolute inset-0 rounded-3xl bg-purple-400 -z-10"
          style={{ filter: 'blur(20px)' }}
          animate={{ opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <Link
          to="/souvenirs/polaroid"
          className="relative flex items-center gap-3 rounded-3xl p-4 bg-gradient-to-br from-coral-400 to-purple-600 shadow-[0_10px_28px_-8px_rgba(0,0,0,0.5)] active:scale-[0.98] transition-transform"
        >
          <span className="text-3xl shrink-0">📸</span>
          <span className="flex-1">
            <span className="flex items-center gap-2">
              <span className="font-display font-extrabold text-white text-base">Mode Polaroid</span>
              <span className="bg-white/25 backdrop-blur text-white text-[9px] font-display font-bold px-2 py-0.5 rounded-full">
                LIVE
              </span>
            </span>
            <span className="block font-body text-white/85 text-xs mt-0.5">
              Le mur photo du groupe, en direct — jette un œil
            </span>
          </span>
          <span className="text-xl text-white/80 shrink-0">›</span>
        </Link>
      </motion.div>

      <div className="flex flex-col gap-3">
        <BigButton to="/lineup" icon="headphones" subtitle="Jeudi · Vendredi · Samedi · Dimanche">
          Line-Up
        </BigButton>
        <BigButton to="/commandement" icon="map" subtitle="Plan, météo, FAQ, réduction des risques">
          Centre de Commandement
        </BigButton>
        <BigButton to="/souvenirs" icon="camera" subtitle="Polaroid, jeux, souvenirs & plus">
          Souvenirs &amp; Jeux
        </BigButton>
        <BigButton to="/shlagos" icon="people" subtitle="Les 6 légendes du groupe">
          Les Shlagos
        </BigButton>
      </div>

      <Link to="/50-questions" className="block mt-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileTap={{ scale: 0.97 }}
          className="relative flex items-center gap-3 rounded-3xl px-5 py-4 overflow-hidden border border-red-900/60"
          style={{ background: 'linear-gradient(135deg, #1a0505, #000)' }}
        >
          <motion.div
            className="absolute inset-0 -z-10"
            animate={{ opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(200,0,0,0.5), transparent 70%)' }}
          />
          <span className="text-3xl shrink-0">💀</span>
          <span className="flex-1">
            <span className="block font-display font-extrabold text-red-400 text-base tracking-wide">
              50 QUESTIONS
            </span>
            <span className="block font-body text-red-300/60 text-xs mt-0.5">
              Le défi le plus dur du Medusa — entre si tu l'oses
            </span>
          </span>
          <span className="text-xl text-red-500/70 shrink-0">›</span>
        </motion.div>
      </Link>
    </PageShell>
  )
}
