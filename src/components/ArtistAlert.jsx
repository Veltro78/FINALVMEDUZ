import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { favoris } from '../data/favoris.js'
import { sfx } from '../utils/sfx.js'

const WINDOW_BEFORE_MIN = 45 // alerte si l'artiste commence dans les 45 prochaines minutes
const WINDOW_AFTER_MIN = 30 // ou s'il joue depuis moins de 30 minutes

export default function ArtistAlert() {
  const [match, setMatch] = useState(null)

  useEffect(() => {
    const now = Date.now()
    const found = favoris.find((a) => {
      const start = new Date(a.datetime).getTime()
      const diffMin = (start - now) / 60000
      return diffMin <= WINDOW_BEFORE_MIN && diffMin >= -WINDOW_AFTER_MIN
    })
    if (found) {
      const diffMin = Math.round((new Date(found.datetime).getTime() - now) / 60000)
      setMatch({ ...found, diffMin })
      sfx.ding()
    }
  }, [])

  return (
    <AnimatePresence>
      {match && (
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.96 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative mb-2"
        >
          {/* halo qui pulse doucement derrière la carte, façon flash lumineux */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-sun-400"
            animate={{ opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ filter: 'blur(14px)' }}
          />
          <Link
            to="/lineup/favoris"
            className="relative glass-card rounded-2xl px-4 py-3 flex items-center gap-3 border border-sun-300/60"
          >
            <span className="text-2xl shrink-0">🔥</span>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-white text-sm truncate">
                {match.artist}{' '}
                {match.diffMin > 0 ? `dans ${match.diffMin} min` : 'est en cours'}
              </p>
              <p className="text-white/75 text-xs truncate">{match.stage}</p>
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
