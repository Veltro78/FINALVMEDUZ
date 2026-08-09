import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageShell from '../../components/PageShell.jsx'
import BigButton from '../../components/BigButton.jsx'
import { shlagos } from '../../data/shlagos.js'

const colorClasses = {
  turquoise: 'from-turquoise-400 to-turquoise-600',
  sun: 'from-sun-400 to-sun-600',
  coral: 'from-coral-400 to-coral-600',
  tropical: 'from-tropical-400 to-tropical-600',
  pool: 'from-pool-400 to-pool-600'
}

// 👉 Ex "Kit du Shlago" — fusionné directement ici pour alléger la navigation.
const kitItems = [
  'Dignité (à laisser à la maison)',
  'Bout de taz de secours pour Bengal',
  'Doliprane pour le comedown du lendemain',
  'Électrolytes / boisson isotonique',
  'Playlist hardstyle prête pour Baby Shlagos',
  'Excuse toute prête pour la douane',
  "Une bonne raison d'avoir perdu Ryfu",
  "Un débat tout prêt pour Mathieu",
  "De quoi occuper Gob s'il se retrouve seul 5 minutes",
  'Des reins de fer pour les 5 jours'
]

const KIT_STORAGE_KEY = 'shlagos-checklist-v1'

export default function ShlagosIndex() {
  const [showKit, setShowKit] = useState(false)
  const [checked, setChecked] = useState({})

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KIT_STORAGE_KEY)
      if (saved) setChecked(JSON.parse(saved))
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(KIT_STORAGE_KEY, JSON.stringify(checked))
    } catch {
      // ignore
    }
  }, [checked])

  const toggle = (item) => setChecked((c) => ({ ...c, [item]: !c[item] }))
  const done = kitItems.filter((i) => checked[i]).length

  return (
    <PageShell title="Les Shlagos" emoji="👥">
      <BigButton to="/shlagos/classement" icon="trophy" color="coral" subtitle="Le classement évolue avec le festival">
        Classement des Shlagos
      </BigButton>

      <div className="grid grid-cols-2 gap-3 mt-1">
        {shlagos.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Link
              to={`/shlagos/${s.id}`}
              className="glass-card rounded-3xl p-4 flex flex-col items-center gap-2 text-center active:scale-95 transition-transform"
            >
              {s.photo ? (
                <img
                  src={s.photo}
                  alt={s.prenom}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/40 shadow-lg"
                />
              ) : (
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-b ${colorClasses[s.couleur]} flex items-center justify-center text-2xl font-display font-extrabold text-white border-2 border-white/40 shadow-lg`}
                >
                  {s.prenom.charAt(0)}
                </div>
              )}
              <span className="font-display font-bold text-white text-sm leading-tight">
                {s.prenom}
              </span>
              <span className="text-white/75 text-[11px] leading-tight">{s.titre}</span>
            </Link>
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => setShowKit((v) => !v)}
        className="glass-card rounded-2xl px-4 py-3 flex items-center justify-between mt-1"
      >
        <span className="font-display font-bold text-white text-sm">🎒 Kit du Shlago</span>
        <span className="text-white/70 text-xs font-display font-semibold">
          {done}/{kitItems.length} {showKit ? '▲' : '▼'}
        </span>
      </button>

      <AnimatePresence>
        {showKit && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden flex flex-col gap-2"
          >
            {kitItems.map((item) => {
              const isChecked = !!checked[item]
              return (
                <button
                  key={item}
                  onClick={() => toggle(item)}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm transition-colors ${
                    isChecked ? 'bg-white/25' : 'bg-white/5'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center shrink-0 ${
                      isChecked ? 'bg-tropical-400 border-tropical-400' : ''
                    }`}
                  >
                    {isChecked && <span className="text-white text-xs">✓</span>}
                  </span>
                  <span className={isChecked ? 'line-through text-white/60' : 'text-white/95'}>{item}</span>
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  )
}
