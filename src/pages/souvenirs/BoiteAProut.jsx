import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import PageShell from '../../components/PageShell.jsx'
import { shlagos } from '../../data/shlagos.js'
import { unlockAchievement } from '../../utils/achievements.js'

// 👉 5 vrais sons (Ryfu exclu à la demande). Chaque son est mappé sur la
// petite private joke de la personne.
const prouteurs = [
  { id: 'shlago-1', prenom: 'Leo', sound: '/sounds/prout-leo.wav' },
  { id: 'shlago-2', prenom: 'Bengal', sound: '/sounds/prout-bengal.wav' },
  { id: 'shlago-3', prenom: 'Mathieu', sound: '/sounds/prout-mathieu.wav' },
  { id: 'shlago-4', prenom: 'Gob', sound: '/sounds/prout-gob.wav' },
  { id: 'shlago-6', prenom: 'Baby Shlagos', sound: '/sounds/prout-baby.wav' }
]

export default function BoiteAProut() {
  const audioRefs = useRef({})
  const [played, setPlayed] = useState(() => new Set())

  function play(id) {
    const el = audioRefs.current[id]
    if (!el) return
    el.currentTime = 0
    el.play()
    setPlayed((prev) => {
      const next = new Set(prev).add(id)
      if (next.size === prouteurs.length) unlockAchievement('bruiteur-pro')
      return next
    })
  }

  return (
    <PageShell title="Boîte à Prout" emoji="💨">
      <p className="text-white/80 text-sm -mt-1 text-center">
        Le strict nécessaire pour la bagnole. Tape sur une tête.
      </p>

      <div className="grid grid-cols-2 gap-3 mt-2">
        {prouteurs.map((p) => {
          const s = shlagos.find((x) => x.id === p.id)
          return (
            <motion.button
              key={p.id}
              whileTap={{ scale: 0.92 }}
              onClick={() => play(p.id)}
              className="glass-card rounded-3xl p-4 flex flex-col items-center gap-2"
            >
              <audio ref={(el) => (audioRefs.current[p.id] = el)} src={p.sound} preload="auto" />
              {s?.photo ? (
                <img
                  src={s.photo}
                  alt={p.prenom}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/40 shadow-lg"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center font-display font-bold text-white text-xl">
                  {p.prenom.charAt(0)}
                </div>
              )}
              <span className="text-white text-sm font-display font-bold">Pet de {p.prenom}</span>
              <span className="text-2xl">💨</span>
            </motion.button>
          )
        })}
      </div>
    </PageShell>
  )
}
