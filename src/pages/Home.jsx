import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageShell from '../components/PageShell.jsx'
import BigButton from '../components/BigButton.jsx'
import Countdown from '../components/Countdown.jsx'
import ArtistAlert from '../components/ArtistAlert.jsx'

export default function Home() {
  return (
    <PageShell showLogo logoSize="lg">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }}
        style={{ top: 'calc(env(safe-area-inset-top) + 14px)' }}
        className="fixed right-4 z-20"
      >
        <Link
          to="/ou-es-tu"
          className="w-12 h-12 rounded-full bg-gradient-to-br from-coral-500 to-coral-600 shadow-[0_6px_16px_-4px_rgba(232,72,47,0.6)] flex items-center justify-center text-xl active:scale-90 transition-transform"
          aria-label="On se retrouve"
          title="On se retrouve"
        >
          📍
        </Link>
      </motion.div>

      <ArtistAlert />

      <div className="mb-2">
        <Countdown />
      </div>
      <div className="flex flex-col gap-3">
        <BigButton to="/commandement" icon="map" subtitle="Plan, météo, FAQ, réduction des risques">
          Centre de Commandement
        </BigButton>
        <BigButton to="/lineup" icon="headphones" subtitle="Jeudi · Vendredi · Samedi · Dimanche">
          Line-Up
        </BigButton>
        <BigButton to="/shlagos" icon="people" subtitle="Les 6 légendes du groupe">
          Les Shlagos
        </BigButton>
        <BigButton to="/souvenirs" icon="camera" subtitle="Polaroid, jeux, souvenirs & plus">
          Souvenirs &amp; Jeux
        </BigButton>
      </div>
    </PageShell>
  )
}
