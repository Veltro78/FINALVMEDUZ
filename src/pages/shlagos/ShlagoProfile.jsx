import { useParams, Navigate } from 'react-router-dom'
import PageShell from '../../components/PageShell.jsx'
import Card from '../../components/Card.jsx'
import { shlagos } from '../../data/shlagos.js'

const colorClasses = {
  turquoise: 'from-turquoise-400 to-turquoise-600',
  sun: 'from-sun-400 to-sun-600',
  coral: 'from-coral-400 to-coral-600',
  tropical: 'from-tropical-400 to-tropical-600',
  pool: 'from-pool-400 to-pool-600'
}

export default function ShlagoProfile() {
  const { id } = useParams()
  const person = shlagos.find((s) => s.id === id)

  if (!person) return <Navigate to="/shlagos" replace />

  return (
    <PageShell>
      <div className="flex flex-col items-center gap-3 mt-2 mb-2">
        {person.photo ? (
          <img
            src={person.photo}
            alt={person.prenom}
            className="w-28 h-28 rounded-full object-cover border-4 border-white/70 shadow-card"
          />
        ) : (
          <div
            className={`w-28 h-28 rounded-full bg-gradient-to-b ${colorClasses[person.couleur]} flex items-center justify-center text-5xl font-display font-extrabold text-white border-4 border-white/70 shadow-card`}
          >
            {person.prenom.charAt(0)}
          </div>
        )}
        <h2 className="font-display font-extrabold text-2xl text-white text-outline">{person.prenom}</h2>
        <span className="font-display text-sm px-3 py-1 rounded-full bg-white/25 text-white">
          {person.titre}
        </span>
        {person.instagram && (
          <a
            href={`https://instagram.com/${person.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-display font-semibold text-white bg-gradient-to-br from-coral-400 to-purple-600 px-4 py-1.5 rounded-full active:scale-95 transition-transform"
          >
            📸 @{person.instagram}
          </a>
        )}
      </div>

      <Card title="Portrait" emoji="🪪">
        <p className="text-sm text-white/90">{person.description}</p>
      </Card>

      {person.anecdotes.length > 0 && (
        <Card title="Anecdotes" emoji="🎬">
          <ul className="text-sm text-white/90 space-y-2 list-disc list-inside">
            {person.anecdotes.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </Card>
      )}
    </PageShell>
  )
}
