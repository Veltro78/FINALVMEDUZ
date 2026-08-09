import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { doc, onSnapshot, setDoc, increment, collection } from 'firebase/firestore'
import { db } from '../../firebase.js'
import PageShell from '../../components/PageShell.jsx'
import { shlagos } from '../../data/shlagos.js'

const colorClasses = {
  turquoise: 'from-turquoise-400 to-turquoise-600',
  sun: 'from-sun-400 to-sun-600',
  coral: 'from-coral-400 to-coral-600',
  tropical: 'from-tropical-400 to-tropical-600',
  pool: 'from-pool-400 to-pool-600'
}

const medals = ['🥇', '🥈', '🥉']

export default function Classement() {
  const [scores, setScores] = useState(() =>
    Object.fromEntries(shlagos.map((s) => [s.id, 0]))
  )
  const [synced, setSynced] = useState(false)

  useEffect(() => {
    const unsubs = shlagos.map((s) =>
      onSnapshot(doc(collection(db, 'classement'), s.id), (snap) => {
        setSynced(true)
        if (snap.exists()) {
          setScores((prev) => ({ ...prev, [s.id]: snap.data().score || 0 }))
        }
      })
    )
    return () => unsubs.forEach((u) => u())
  }, [])

  const adjust = (id, delta) => {
    // mise à jour optimiste locale — l'écran réagit tout de suite, la vraie
    // valeur Firestore revient juste après (et se met en attente toute
    // seule si le réseau est coupé, grâce à la persistance activée)
    setScores((s) => ({ ...s, [id]: (s[id] || 0) + delta }))
    setDoc(doc(collection(db, 'classement'), id), { score: increment(delta) }, { merge: true })
  }

  const ranked = [...shlagos].sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0))

  return (
    <PageShell title="Classement des Shlagos" emoji="🏆">
      <p className="text-white/80 text-sm -mt-1">
        {synced ? '🔴 En direct — tout le monde voit les mêmes scores.' : 'Connexion en cours…'}
      </p>

      <AnimatePresence initial={false}>
        {ranked.map((s, i) => (
          <motion.div
            key={s.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ layout: { duration: 0.4, ease: 'easeInOut' }, duration: 0.3 }}
            className="glass-card rounded-2xl p-3 flex items-center gap-3"
          >
            <span className="w-7 text-center font-display font-extrabold text-lg shrink-0">
              {medals[i] || i + 1}
            </span>

            {s.photo ? (
              <img
                src={s.photo}
                alt={s.prenom}
                className="w-12 h-12 rounded-full object-cover border-2 border-white/40 shrink-0"
              />
            ) : (
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-b ${colorClasses[s.couleur]} flex items-center justify-center text-lg font-display font-extrabold text-white shrink-0`}
              >
                {s.prenom.charAt(0)}
              </div>
            )}

            <span className="flex-1 font-display font-semibold text-white text-sm truncate">
              {s.prenom}
            </span>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => adjust(s.id, -1)}
                className="w-7 h-7 rounded-full bg-white/15 text-white font-bold active:scale-90 transition-transform"
              >
                –
              </button>
              <span className="font-display font-extrabold text-white w-8 text-center tabular-nums">
                {scores[s.id] || 0}
              </span>
              <button
                onClick={() => adjust(s.id, 1)}
                className="w-7 h-7 rounded-full bg-white/15 text-white font-bold active:scale-90 transition-transform"
              >
                +
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </PageShell>
  )
}
