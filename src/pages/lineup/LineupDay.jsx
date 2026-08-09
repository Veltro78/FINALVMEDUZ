import { useMemo, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageShell from '../../components/PageShell.jsx'
import ZoomableImage from '../../components/ZoomableImage.jsx'
import { lineup } from '../../data/lineup.js'
import { lineupSchedule } from '../../data/lineupSchedule.js'
import { sortableMinutes } from '../../utils/festivalTime.js'
import { getStageLogo } from '../../utils/stageLogos.js'

export default function LineupDay() {
  const { jourId } = useParams()
  const day = lineup.find((d) => d.id === jourId)
  const schedule = lineupSchedule[jourId]
  const [stageIndex, setStageIndex] = useState(0)
  const [mode, setMode] = useState('scene') // 'scene' | 'horaire' | 'poster'

  const stages = schedule?.stages || []
  const activeStage = stages[stageIndex]

  const byTime = useMemo(() => {
    const all = stages.flatMap((s) =>
      s.slots.map((slot) => ({
        ...slot,
        stageName: s.name,
        sortKey: sortableMinutes(slot.time.split(' – ')[0])
      }))
    )
    return all.sort((a, b) => a.sortKey - b.sortKey)
  }, [stages])

  if (!day) return <Navigate to="/lineup" replace />

  return (
    <PageShell title={day.jour} emoji="🎧">
      <p className="text-white/85 text-sm -mt-1">{day.date}</p>

      <div className="glass-card rounded-full p-1 flex gap-1">
        {[
          ['scene', 'Par scène'],
          ['horaire', 'Par horaire']
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setMode(key)}
            className={`flex-1 rounded-full py-2 text-xs font-display font-semibold transition-colors ${
              mode === key ? 'bg-white text-pool-900' : 'text-white/80'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === 'scene' && (
        <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
          {stages.map((s, i) => {
            const logo = getStageLogo(s.name)
            return (
              <button
                key={s.name}
                onClick={() => setStageIndex(i)}
                className={`shrink-0 rounded-full overflow-hidden transition-all ${
                  i === stageIndex ? 'ring-2 ring-white' : 'opacity-60'
                }`}
              >
                {logo ? (
                  <img src={logo} alt={s.name} className="h-9 w-auto object-contain bg-white" />
                ) : (
                  <span className="glass-card px-3.5 py-1.5 text-xs font-display font-semibold text-white whitespace-nowrap">
                    {s.name}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}

      <button
        onClick={() => setMode((m) => (m === 'poster' ? 'scene' : 'poster'))}
        className="self-start text-xs font-display font-semibold text-white/80 underline underline-offset-2"
      >
        {mode === 'poster' ? '← Revenir au planning' : "Voir l'affiche complète"}
      </button>

      <AnimatePresence mode="wait">
        {mode === 'poster' && (
          <motion.div key="poster" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ZoomableImage src={day.image} alt={`Line-up ${day.jour}`} />
          </motion.div>
        )}

        {mode === 'scene' && (
          <motion.div
            key={`scene-${stageIndex}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-2"
          >
            {activeStage?.slots.map((slot, i) => (
              <div key={i} className="glass-card rounded-2xl px-4 py-3 flex items-center gap-3">
                <span className="text-white/70 text-xs font-display font-semibold w-28 shrink-0">
                  {slot.time}
                </span>
                <span className="text-white font-display font-semibold text-sm">{slot.artist}</span>
              </div>
            ))}
          </motion.div>
        )}

        {mode === 'horaire' && (
          <motion.div
            key="horaire"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-2"
          >
            {byTime.map((slot, i) => {
              const logo = getStageLogo(slot.stageName)
              return (
                <div key={i} className="glass-card rounded-2xl px-4 py-2.5 flex items-center gap-3">
                  <span className="text-white/70 text-xs font-display font-semibold w-24 shrink-0">
                    {slot.time.split(' – ')[0]}
                  </span>
                  <span className="text-white font-display font-semibold text-sm flex-1 min-w-0 truncate">
                    {slot.artist}
                  </span>
                  {logo ? (
                    <img src={logo} alt={slot.stageName} className="h-6 w-auto object-contain rounded shrink-0 bg-white" />
                  ) : (
                    <span className="text-[10px] font-display font-semibold px-2 py-1 rounded-full shrink-0 bg-white/20 text-white">
                      {slot.stageName}
                    </span>
                  )}
                </div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  )
}
