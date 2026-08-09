import PageShell from '../../components/PageShell.jsx'
import Card from '../../components/Card.jsx'

const tips = [
  { emoji: '💧', title: 'Hydrate-toi', text: "De l'eau régulièrement, surtout en journée. Les stands d'eau gratuite sont là pour ça." },
  { emoji: '🍽️', title: 'Mange', text: "Un ventre plein encaisse mieux la journée et la soirée." },
  { emoji: '😴', title: 'Repose-toi', text: 'Prévoir des vraies pauses sommeil, même courtes, ça change tout.' },
  { emoji: '👯', title: 'Reste en groupe', text: "On garde un œil les uns sur les autres, surtout la nuit." },
  { emoji: '🚑', title: 'En cas de doute', text: "Les stands de secours et d'info sont là pour aider, sans jugement, à tout moment." }
]

export default function ReductionRisques() {
  return (
    <PageShell title="Réduction des risques" emoji="💊">
      <p className="text-white/85 text-sm mb-1">5 réflexes simples pour profiter à fond, sereinement.</p>
      {tips.map((t) => (
        <Card key={t.title} className="flex items-center gap-4">
          <span className="text-4xl shrink-0" aria-hidden="true">{t.emoji}</span>
          <div>
            <h3 className="font-display font-bold">{t.title}</h3>
            <p className="text-sm text-white/90">{t.text}</p>
          </div>
        </Card>
      ))}
    </PageShell>
  )
}
