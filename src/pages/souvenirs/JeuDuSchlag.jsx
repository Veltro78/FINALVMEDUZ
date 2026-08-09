import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageShell from '../../components/PageShell.jsx'
import DiceCube from '../../components/DiceCube.jsx'
import Confetti from '../../components/Confetti.jsx'
import { jeuDefis } from '../../data/jeuDefis.js'
import { sfx } from '../../utils/sfx.js'

function formatTime(s) {
  if (s >= 60) {
    const m = Math.floor(s / 60)
    const rest = s % 60
    return rest > 0 ? `${m}min ${rest}s` : `${m}min`
  }
  return `${s}s`
}

export default function JeuDuSchlag() {
  const [current, setCurrent] = useState(null)
  const [rolling, setRolling] = useState(false)
  const [timeLeft, setTimeLeft] = useState(null)
  const [burst, setBurst] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => () => clearInterval(intervalRef.current), [])

  function roll() {
    if (rolling) return
    clearInterval(intervalRef.current)
    setTimeLeft(null)
    setRolling(true)
    setCurrent(null)
    sfx.drum()
    setTimeout(() => {
      const pick = jeuDefis[Math.floor(Math.random() * jeuDefis.length)]
      setCurrent(pick)
      setRolling(false)
      setBurst((b) => b + 1)
      sfx.fanfare()
      setTimeLeft(pick.secondes)
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(intervalRef.current)
            sfx.fail()
            return 0
          }
          return t - 1
        })
      }, 1000)
    }, 900)
  }

  const progress = current && timeLeft !== null ? timeLeft / current.secondes : 1

  return (
    <PageShell title="Le Jeu du Schlag" emoji="🎲">
      <p className="text-white/80 text-sm -mt-1 text-center">
        Appuie sur le dé, relève le défi avant la fin du timer.
      </p>

      <div className="relative flex flex-col items-center gap-6 mt-6">
        {/* halo qui pulse doucement derrière le dé */}
        <motion.div
          className="absolute top-2 w-40 h-40 rounded-full bg-purple-500 -z-10"
          style={{ filter: 'blur(30px)' }}
          animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />

        <DiceCube rolling={rolling} onClick={roll} />

        <div className="relative w-full">
          <Confetti trigger={burst} />

          <AnimatePresence mode="wait">
            {current && !rolling && (
              <motion.div
                key={current.texte}
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="glass-card rounded-3xl px-6 py-5 text-center w-full"
              >
                <p className="font-display font-bold text-white text-base leading-snug mb-4">
                  {current.texte}
                </p>

                {timeLeft !== null && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-full h-3 rounded-full bg-white/15 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${timeLeft <= Math.min(10, current.secondes * 0.2) ? 'bg-coral-400' : 'bg-sun-400'}`}
                        animate={{ width: `${progress * 100}%` }}
                        transition={{ duration: 0.4, ease: 'linear' }}
                      />
                    </div>
                    <span className="font-display font-extrabold text-2xl text-white tabular-nums">
                      {timeLeft > 0 ? formatTime(timeLeft) : 'Temps écoulé !'}
                    </span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!current && !rolling && (
          <p className="text-white/50 text-xs text-center">Touche le dé pour lancer</p>
        )}

        {current && !rolling && (
          <button
            onClick={roll}
            className="text-xs font-display font-semibold text-white/80 underline underline-offset-2"
          >
            Relancer
          </button>
        )}
      </div>
    </PageShell>
  )
}
