import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageShell from '../../components/PageShell.jsx'
import FeatureCard from '../../components/FeatureCard.jsx'
import CompactLink from '../../components/CompactLink.jsx'

export default function SouvenirsIndex() {
  return (
    <PageShell title="Souvenirs & Jeux" emoji="🍹">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-1"
      >
        <motion.span
          className="absolute inset-0 rounded-3xl bg-coral-400 -z-10"
          style={{ filter: 'blur(22px)' }}
          animate={{ opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <Link
          to="/souvenirs/polaroid"
          className="relative flex items-center gap-3 rounded-3xl p-4 bg-gradient-to-br from-coral-400 to-purple-600 shadow-[0_10px_28px_-8px_rgba(0,0,0,0.5)] active:scale-[0.98] transition-transform"
        >
          <span className="text-4xl shrink-0">📸</span>
          <span className="flex-1">
            <span className="flex items-center gap-2">
              <span className="font-display font-extrabold text-white text-lg">Mode Polaroid</span>
              <span className="bg-white/25 backdrop-blur text-white text-[9px] font-display font-bold px-2 py-0.5 rounded-full">
                LIVE
              </span>
            </span>
            <span className="block font-body text-white/85 text-xs mt-0.5">
              Le mur photo du groupe, en direct — la plus belle façon de garder une trace
            </span>
          </span>
          <span className="text-2xl text-white/85 shrink-0">›</span>
        </Link>
      </motion.div>

      <p className="text-white/70 text-xs font-display font-semibold uppercase tracking-wide mt-4 mb-1">
        ✨ Coups de cœur
      </p>
      <div className="grid grid-cols-2 gap-3">
        <FeatureCard
          to="/souvenirs/aventure"
          emoji="🎮"
          title="Shlago Adventure"
          subtitle="3 niveaux de plateforme"
          color="turquoise"
        />
        <FeatureCard
          to="/souvenirs/prout"
          emoji="💨"
          title="Boîte à Prout"
          subtitle="Avec vos vraies têtes"
          color="orange"
        />
        <FeatureCard
          to="/souvenirs/trophees"
          emoji="🏅"
          title="Mur des Trophées"
          subtitle="Se remplit en jouant"
          color="sun"
        />
        <FeatureCard
          to="/souvenirs/capsule"
          emoji="🔒"
          title="Capsule Temporelle"
          subtitle="Scellée jusqu'à une date"
          color="tropical"
        />
        <FeatureCard
          to="/souvenirs/jeu"
          emoji="🎲"
          title="Le Jeu du Schlag"
          subtitle="Un dé, un défi rapide"
          color="purple"
        />
      </div>

      <p className="text-white/50 text-[11px] font-display font-semibold uppercase tracking-wide mt-5 mb-1">
        Aussi dans le coin
      </p>
      <div className="flex flex-col gap-1">
        <CompactLink to="/souvenirs/defis" emoji="🏆">Défis &amp; Classement</CompactLink>
        <CompactLink to="/souvenirs/qui-a-dit-ca" emoji="💬">Qui a dit ça ?</CompactLink>
        <CompactLink to="/souvenirs/photos" emoji="📷">Photos Medusa 2025</CompactLink>
        <CompactLink to="/souvenirs/vlogs" emoji="🎥">Vlogs</CompactLink>
        <CompactLink to="/souvenirs/citations" emoji="💭">Citations cultes</CompactLink>
        <CompactLink to="/souvenirs/dictionnaire" emoji="📖">Dictionnaire du Shlago</CompactLink>
      </div>
    </PageShell>
  )
}
