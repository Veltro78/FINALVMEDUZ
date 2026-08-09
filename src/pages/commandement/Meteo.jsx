import { useEffect, useState } from 'react'
import PageShell from '../../components/PageShell.jsx'
import Card from '../../components/Card.jsx'

// Cullera, Espagne
const LAT = 39.1667
const LON = -0.2333

// Mappe les codes météo Open-Meteo (WMO) vers nos icônes.
function iconFor(code) {
  if (code === 0 || code === 1) return 'sun'
  if (code === 2) return 'sun-cloud'
  if (code === 3 || (code >= 45 && code <= 48)) return 'cloud'
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82) || (code >= 95 && code <= 99)) return 'rain'
  return 'sun'
}

function labelFor(code) {
  if (code === 0) return 'Ciel dégagé'
  if (code === 1) return 'Plutôt dégagé'
  if (code === 2) return 'Partiellement nuageux'
  if (code === 3) return 'Nuageux'
  if (code >= 45 && code <= 48) return 'Brumeux'
  if (code >= 51 && code <= 67) return 'Pluie'
  if (code >= 80 && code <= 82) return 'Averses'
  if (code >= 95) return 'Orageux'
  return 'Ensoleillé'
}

const DAY_NAMES = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

export default function Meteo() {
  const [days, setDays] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Europe%2FMadrid&forecast_days=4`
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const d = data.daily
        const parsed = d.time.map((date, i) => ({
          date,
          jour: DAY_NAMES[new Date(date).getDay()],
          jourCourt: new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
          icon: iconFor(d.weathercode[i]),
          condition: labelFor(d.weathercode[i]),
          max: Math.round(d.temperature_2m_max[i]),
          min: Math.round(d.temperature_2m_min[i])
        }))
        setDays(parsed)
      })
      .catch(() => setError(true))
  }, [])

  return (
    <PageShell title="Météo à Cullera" emoji="🌤️">
      {error && (
        <Card>
          <p className="text-sm text-white/90 text-center">
            Impossible de charger la météo en direct — vérifie ta connexion.
          </p>
        </Card>
      )}

      {!error && !days && (
        <Card>
          <p className="text-sm text-white/80 text-center">Chargement de la météo…</p>
        </Card>
      )}

      {days &&
        days.map((j) => (
          <Card key={j.date} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={`/icons/weather/${j.icon}.png`} alt={j.condition} className="w-12 h-12" />
              <div>
                <h3 className="font-display font-semibold">
                  {j.jour} <span className="text-white/60 font-normal text-xs">· {j.jourCourt}</span>
                </h3>
                <p className="text-xs text-white/75">{j.condition}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-display font-bold text-lg">{j.max}°</span>
              <span className="text-white/60 text-sm"> / {j.min}°</span>
            </div>
          </Card>
        ))}

      <p className="text-white/60 text-xs text-center mt-1">
        Prévisions en direct (Open-Meteo) — mises à jour à chaque ouverture de la page.
      </p>
    </PageShell>
  )
}
