import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { lineupSchedule } from '../data/lineupSchedule.js'
import { activeDayKey, festivalStatus, currentSlotsForDay } from '../utils/festivalTime.js'
import { getStageLogo } from '../utils/stageLogos.js'

export default function EnCeMoment() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(t)
  }, [])

  const status = festivalStatus(now)
  const timeLabel = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })

  if (status === 'before') {
    return (
      <div className="glass-card rounded-2xl px-4 py-3">
        <p className="text-white/85 text-sm">
          🕒 Il est {timeLabel} — le festival n'a pas encore commencé.
        </p>
      </div>
    )
  }

  if (status === 'after') {
    return (
      <div className="glass-card rounded-2xl px-4 py-3">
        <p className="text-white/85 text-sm">🕒 Il est {timeLabel} — c'est terminé, à l'année prochaine !</p>
      </div>
    )
  }

  const dayKey = activeDayKey(now)
  const slots = dayKey ? currentSlotsForDay(lineupSchedule[dayKey], now) : []

  return (
    <div className="flex flex-col gap-2">
      <p className="text-white/80 text-xs font-display font-semibold uppercase tracking-wide">
        🕒 Il est {timeLabel} — en ce moment
      </p>
      {slots.length === 0 ? (
        <div className="glass-card rounded-2xl px-4 py-3">
          <p className="text-white/85 text-sm">Aucun set en cours (entre deux scènes).</p>
        </div>
      ) : (
        slots.map((s, i) => {
          const logo = getStageLogo(s.stageName)
          return (
            <motion.div
              key={s.stageName}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-2xl px-4 py-2.5 flex items-center gap-3"
            >
              {logo ? (
                <img src={logo} alt={s.stageName} className="h-7 w-auto object-contain rounded shrink-0 bg-white" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-white/60 shrink-0" />
              )}
              <span className="text-white font-display font-semibold text-sm flex-1 min-w-0 truncate">
                {s.artist}
              </span>
            </motion.div>
          )
        })
      )}
    </div>
  )
}
