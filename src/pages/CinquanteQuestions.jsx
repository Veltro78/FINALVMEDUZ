import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { intro, questions, mottoAfterIndex, motto } from '../data/fiftyQuestions.js'
import { sfx } from '../utils/sfx.js'

const TIME_PER_QUESTION = 15

export default function CinquanteQuestions() {
  const navigate = useNavigate()
  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [showMotto, setShowMotto] = useState(false)
  const [showEs, setShowEs] = useState(false)
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION)
  const [finished, setFinished] = useState(false)
  const intervalRef = useRef(null)
  const flickerRef = useRef(null)
  const [flicker, setFlicker] = useState(false)

  const current = questions[index]

  useEffect(() => {
    // effet de scintillement aléatoire type ampoule qui lâche, purement visuel
    flickerRef.current = setInterval(() => {
      if (Math.random() < 0.12) {
        setFlicker(true)
        setTimeout(() => setFlicker(false), 90)
      }
    }, 700)
    return () => clearInterval(flickerRef.current)
  }, [])

  useEffect(() => {
    if (!started || finished || showMotto) return
    clearInterval(intervalRef.current)
    setTimeLeft(TIME_PER_QUESTION)
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [index, started, finished, showMotto])

  function begin() {
    setStarted(true)
    sfx.drum()
  }

  function next() {
    setShowEs(false)
    if (index + 1 >= questions.length) {
      setFinished(true)
      sfx.fanfare()
      return
    }
    const nextIndex = index + 1
    if (nextIndex === mottoAfterIndex) {
      setShowMotto(true)
      setTimeout(() => {
        setShowMotto(false)
        setIndex(nextIndex)
      }, 3200)
    } else {
      setIndex(nextIndex)
    }
  }

  function restart() {
    setIndex(0)
    setStarted(false)
    setFinished(false)
    setShowMotto(false)
    setShowEs(false)
  }

  return (
    <div
      className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-8 relative overflow-hidden"
      style={{
        background: flicker
          ? 'radial-gradient(ellipse at center, #2a0808 0%, #000 75%)'
          : 'radial-gradient(ellipse at center, #1a0505 0%, #000 70%)',
        transition: 'background 0.05s'
      }}
    >
      {/* grain / vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 160px 60px rgba(0,0,0,0.85)' }}
      />

      <button
        onClick={() => navigate('/accueil')}
        className="absolute z-10 text-red-300/50 text-xs font-display"
        style={{ top: 'calc(env(safe-area-inset-top) + 16px)', left: 16 }}
      >
        ← Quitter
      </button>

      <AnimatePresence mode="wait">
        {!started && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex flex-col items-center text-center gap-5 max-w-sm"
          >
            <motion.span
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-5xl"
            >
              💀
            </motion.span>
            <h1
              className="text-red-500 font-display font-extrabold text-3xl tracking-wide"
              style={{ textShadow: '0 0 18px rgba(220,20,20,0.8), 0 0 40px rgba(150,0,0,0.5)' }}
            >
              50 QUESTIONS
            </h1>
            <p className="text-red-400/70 text-xs font-display uppercase tracking-widest">
              Le défi le plus dur du Medusa
            </p>

            <div className="w-full h-px bg-red-900/50 my-1" />

            <p className="text-red-200/90 text-sm font-display font-semibold">{intro.auteur}</p>
            <p className="text-red-400/50 text-xs italic">{intro.sousTitre}</p>
            <p className="text-red-100/80 text-sm leading-relaxed mt-2">{intro.regle}</p>

            <motion.button
              onClick={begin}
              whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: ['0 0 20px rgba(200,0,0,0.4)', '0 0 40px rgba(200,0,0,0.7)', '0 0 20px rgba(200,0,0,0.4)'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-6 rounded-full bg-gradient-to-br from-red-700 to-red-900 border border-red-500/50 px-8 py-3.5 font-display font-bold text-red-100 text-sm tracking-wide"
            >
              Entrer… si tu l'oses
            </motion.button>
          </motion.div>
        )}

        {started && showMotto && (
          <motion.div
            key="motto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 text-center px-6"
          >
            <p className="text-red-300 font-display italic text-lg leading-relaxed">{motto.fr}</p>
            <p className="text-red-500/50 text-sm italic mt-2">{motto.es}</p>
          </motion.div>
        )}

        {started && !showMotto && !finished && (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 flex flex-col items-center text-center gap-6 w-full max-w-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-red-500/60 text-xs font-display">{index + 1} / {questions.length}</span>
              <span
                className={`font-display font-extrabold text-lg tabular-nums ${timeLeft <= 5 ? 'text-red-500' : 'text-red-300/70'}`}
              >
                {timeLeft}s
              </span>
            </div>

            <div className="w-full h-1 rounded-full bg-red-950 overflow-hidden">
              <motion.div
                className="h-full bg-red-600"
                animate={{ width: `${(timeLeft / TIME_PER_QUESTION) * 100}%` }}
                transition={{ duration: 0.4, ease: 'linear' }}
              />
            </div>

            <p
              className="text-red-100 font-display font-bold text-2xl leading-snug px-2"
              style={{ textShadow: '0 0 14px rgba(200,0,0,0.5)' }}
            >
              {current.fr}
            </p>

            <button
              onClick={() => setShowEs((v) => !v)}
              className="flex items-center gap-1.5 rounded-full border border-red-800/60 px-3 py-1.5 text-red-300/70 text-xs font-display"
            >
              🇪🇸 {showEs ? 'Masquer la traduction' : 'Voir en espagnol'}
            </button>

            <AnimatePresence>
              {showEs && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-400/70 text-sm italic px-2 overflow-hidden"
                >
                  {current.es}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              onClick={next}
              className="mt-4 rounded-full bg-red-900/60 border border-red-700 px-8 py-3 font-display font-bold text-red-100 text-sm active:scale-95 transition-transform"
            >
              Question suivante →
            </button>
          </motion.div>
        )}

        {finished && (
          <motion.div
            key="fin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 flex flex-col items-center text-center gap-5"
          >
            <span className="text-5xl">🖤</span>
            <p className="text-red-300 font-display font-extrabold text-xl">Tu as survécu.</p>
            <p className="text-red-400/60 text-sm max-w-xs">
              47 vérités plus tard, tu sais un peu mieux qui tu es. Ou pas.
            </p>
            <div className="flex gap-3 mt-4">
              <button
                onClick={restart}
                className="rounded-full bg-red-900/60 border border-red-700 px-6 py-2.5 font-display font-bold text-red-100 text-sm"
              >
                Recommencer
              </button>
              <button
                onClick={() => navigate('/accueil')}
                className="rounded-full bg-white/10 px-6 py-2.5 font-display font-bold text-white/80 text-sm"
              >
                Sortir
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
