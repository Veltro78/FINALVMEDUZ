import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageShell from '../../components/PageShell.jsx'
import { citations } from '../../data/citations.js'

// Seules les citations attribuées à un vrai Shlago (pas "Message", pas vide)
// sont jouables — on a besoin d'options claires pour le quiz.
const PLAYERS = ['Leo', 'Gob', 'Mathieu', 'Bengal']
const playable = citations.filter((c) => PLAYERS.includes(c.auteur))

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function buildRound() {
  const q = playable[Math.floor(Math.random() * playable.length)]
  const wrongOptions = shuffle(PLAYERS.filter((p) => p !== q.auteur)).slice(0, 3)
  const options = shuffle([q.auteur, ...wrongOptions])
  return { q, options }
}

export default function QuiADitCa() {
  const [round, setRound] = useState(buildRound)
  const [picked, setPicked] = useState(null)
  const [score, setScore] = useState({ good: 0, total: 0 })

  function pick(name) {
    if (picked) return
    setPicked(name)
    setScore((s) => ({ good: s.good + (name === round.q.auteur ? 1 : 0), total: s.total + 1 }))
  }

  function next() {
    setRound(buildRound())
    setPicked(null)
  }

  if (playable.length < 4) {
    return (
      <PageShell title="Qui a dit ça ?" emoji="💬">
        <p className="text-white/80 text-sm text-center">
          Pas encore assez de citations attribuées pour lancer le quiz.
        </p>
      </PageShell>
    )
  }

  return (
    <PageShell title="Qui a dit ça ?" emoji="💬">
      <div className="flex items-center justify-between -mt-1">
        <p className="text-white/70 text-xs font-display font-semibold">
          Score : {score.good}/{score.total}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={round.q.texte}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-4"
        >
          <div className="glass-card rounded-3xl p-5 text-center">
            <p className="font-display font-bold text-white text-base leading-snug">
              &laquo;&nbsp;{round.q.texte}&nbsp;&raquo;
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {round.options.map((name) => {
              const isCorrect = name === round.q.auteur
              const isPicked = name === picked
              let style = 'bg-white/10 text-white'
              if (picked) {
                if (isCorrect) style = 'bg-tropical-500 text-white'
                else if (isPicked) style = 'bg-coral-500 text-white'
                else style = 'bg-white/5 text-white/50'
              }
              return (
                <button
                  key={name}
                  onClick={() => pick(name)}
                  className={`rounded-2xl py-3.5 font-display font-bold text-sm transition-colors ${style}`}
                >
                  {name}
                </button>
              )
            })}
          </div>

          {picked && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={next}
              className="rounded-full bg-gradient-to-br from-coral-400 to-purple-600 py-3 font-display font-bold text-white"
            >
              Question suivante →
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </PageShell>
  )
}
