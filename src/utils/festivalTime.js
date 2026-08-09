// Le programme tourne de ~16h à ~6h du matin, donc les heures avant midi
// appartiennent "au lendemain" dans l'ordre chronologique de la soirée.
export function sortableMinutes(time) {
  const [h, m] = time.split(':').map(Number)
  const hour = h < 12 ? h + 24 : h
  return hour * 60 + m
}

// Détermine quel jour de programmation (jeudi/vendredi/samedi/dimanche)
// s'applique à un instant donné : avant midi, on est encore sur la
// programmation de la veille au soir.
export function activeDayKey(now = new Date()) {
  const dateMap = { 13: 'jeudi', 14: 'vendredi', 15: 'samedi', 16: 'dimanche' }
  const month = now.getMonth() + 1
  const year = now.getFullYear()
  if (year !== 2026 || month !== 8) return null
  const day = now.getDate()
  const hour = now.getHours()
  const effectiveDay = hour < 12 ? day - 1 : day
  return dateMap[effectiveDay] || null
}

export function festivalStatus(now = new Date()) {
  const start = new Date('2026-08-13T16:00:00+02:00').getTime()
  const end = new Date('2026-08-17T07:00:00+02:00').getTime()
  const t = now.getTime()
  if (t < start) return 'before'
  if (t > end) return 'after'
  return 'during'
}

// Pour un planning de jour ({ stages: [...] }), trouve l'artiste en cours
// sur chaque scène à l'instant `now`.
export function currentSlotsForDay(daySchedule, now = new Date()) {
  if (!daySchedule) return []
  const h = now.getHours()
  const m = now.getMinutes()
  const nowMinutes = (h < 12 ? h + 24 : h) * 60 + m

  return daySchedule.stages
    .map((stage) => {
      const slot = stage.slots.find((s) => {
        const [startStr, endStr] = s.time.split(' – ')
        const start = sortableMinutes(startStr)
        const end = sortableMinutes(endStr)
        return nowMinutes >= start && nowMinutes < end
      })
      return slot ? { stageName: stage.name, color: stage.color, ...slot } : null
    })
    .filter(Boolean)
}
