import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import PageShell from '../../components/PageShell.jsx'
import { favoris } from '../../data/favoris.js'
import { getStageLogo } from '../../utils/stageLogos.js'

const ringColor = {
  coral: 'ring-coral-400',
  sun: 'ring-sun-400',
  purple: 'ring-purple-400',
  pool: 'ring-pool-400',
  orange: 'ring-orange-400',
  tropical: 'ring-tropical-400',
  turquoise: 'ring-turquoise-400'
}

const days = ['Tous', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

function useNow() {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  return now
}

function formatCountdown(diffMs) {
  if (diffMs <= 0) return null
  const totalMin = Math.floor(diffMs / 60000)
  const days = Math.floor(totalMin / (60 * 24))
  const hours = Math.floor((totalMin % (60 * 24)) / 60)
  const minutes = totalMin % 60
  if (days > 0) return `${days}j ${hours}h`
  if (hours > 0) return `${hours}h ${minutes}min`
  return `${minutes} min`
}

export default function ArtistesFavoris() {
  const now = useNow()
  const [dayFilter, setDayFilter] = useState('Tous')

  const filtered = useMemo(
    () => (dayFilter === 'Tous' ? favoris : favoris.filter((a) => a.day === dayFilter)),
    [dayFilter]
  )

  return (
    <PageShell title="Artistes Favoris" emoji="⭐">
      <p className="text-white/80 text-sm -mt-1">Ta collection — qui, quand, où.</p>

      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setDayFilter(d)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-display font-semibold whitespace-nowrap transition-colors ${
              dayFilter === d ? 'bg-white text-pool-900' : 'glass-card text-white/85'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filtered.map((a, i) => {
          const start = new Date(a.datetime).getTime()
          const diff = start - now
          const isNow = diff <= 0 && diff > -90 * 60000
          const isPast = diff <= -90 * 60000
          const countdown = formatCountdown(diff)
          const stageLogo = getStageLogo(a.stage)

          return (
            <motion.div
              key={a.artist}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: isPast ? 0.5 : 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="glass-card rounded-3xl overflow-hidden flex flex-col"
            >
              <div className="relative aspect-square">
                {a.photo ? (
                  <img src={a.photo} alt={a.artist} className={`w-full h-full object-cover ring-2 ring-inset ${ringColor[a.color]}`} />
                ) : (
                  <div
                    className={`w-full h-full flex items-center justify-center text-4xl font-display font-extrabold text-white bg-gradient-to-br from-white/10 to-white/0 ring-2 ring-inset ${ringColor[a.color]}`}
                  >
                    {a.artist.charAt(0)}
                  </div>
                )}

                {isNow && (
                  <span className="absolute top-2 left-2 bg-tropical-500 text-white text-[10px] font-display font-bold px-2 py-0.5 rounded-full">
                    🔴 EN COURS
                  </span>
                )}
                {!isNow && !isPast && countdown && (
                  <span className="absolute top-2 left-2 bg-black/50 backdrop-blur text-white text-[10px] font-display font-bold px-2 py-0.5 rounded-full">
                    {countdown}
                  </span>
                )}

                {stageLogo && (
                  <img
                    src={stageLogo}
                    alt={a.stage}
                    className="absolute bottom-2 right-2 h-6 w-auto object-contain rounded shadow-lg"
                  />
                )}
              </div>

              <div className="p-2.5">
                <h3 className="font-display font-bold text-white text-[13px] leading-tight truncate">
                  {a.artist}
                </h3>
                <p className="text-white/60 text-[11px] mt-0.5">
                  {a.day} · {a.time}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </PageShell>
  )
}
