import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Festival start: Jeudi 13 août 2026, ouverture Beach Club à 16h (heure d'Espagne).
const FESTIVAL_START = new Date('2026-08-13T16:00:00+02:00').getTime()

function getTimeLeft() {
  const diff = FESTIVAL_START - Date.now()
  if (diff <= 0) return null
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds }
}

function Unit({ value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex flex-col items-center flex-1"
    >
      <div className="glass-card rounded-2xl w-full py-2.5 flex items-center justify-center">
        <span className="font-display font-extrabold text-2xl sm:text-3xl text-white tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] uppercase tracking-wider text-white/70 font-display font-semibold mt-1.5">
        {label}
      </span>
    </motion.div>
  )
}

export default function Countdown() {
  const [left, setLeft] = useState(getTimeLeft)

  useEffect(() => {
    const t = setInterval(() => setLeft(getTimeLeft()), 1000)
    return () => clearInterval(t)
  }, [])

  if (!left) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card rounded-2xl py-3 text-center"
      >
        <span className="font-display font-bold text-white">🦑 On y est — profitez du Medusa !</span>
      </motion.div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-[11px] uppercase tracking-widest text-white/75 font-display font-semibold">
        Avant le décollage
      </span>
      <div className="flex gap-2 w-full">
        <Unit value={left.days} label="jours" delay={0} />
        <Unit value={left.hours} label="heures" delay={0.05} />
        <Unit value={left.minutes} label="min" delay={0.1} />
        <Unit value={left.seconds} label="sec" delay={0.15} />
      </div>
    </div>
  )
}
