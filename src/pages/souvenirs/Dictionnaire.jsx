import PageShell from '../../components/PageShell.jsx'
import Card from '../../components/Card.jsx'

// 👉 À PERSONNALISER : le vrai lexique du groupe, ses expressions et private jokes.
const mots = [
  { mot: 'Shlago', def: "Membre officiel de la meute. S'utilise au singulier comme au pluriel." },
  { mot: 'Faire un Medusa', def: 'Enchaîner deux activités incompatibles sans transition (ex : piscine puis sieste puis rave).' },
  { mot: 'Mode Shlago', def: 'État post-3ème jour de festival : fatigue extrême, motivation intacte.' },
  { mot: 'Bout de taz', def: "Ce qu'il manque à Bengal pour être fonctionnel avant midi." },
  { mot: 'Solidarité chimique', def: "Principe sacré de Gob : jamais seul, jamais sobre tout seul non plus." },
  { mot: "L'Espagnole", def: "Raison officielle pour laquelle Ryfu a disparu du groupe pendant 4h." },
  { mot: 'Dette de sommeil', def: "Ce que Baby Shlagos réclame à voix haute dès 23h passées." },
  { mot: 'Débat Mathieu', def: "Discussion relancée 5 jours après avoir été soi-disant réglée." }
]

export default function Dictionnaire() {
  return (
    <PageShell title="Dictionnaire du Shlago" emoji="📖">
      {mots.map((m) => (
        <Card key={m.mot} title={m.mot} emoji="✨">
          <p className="text-sm text-white/90">{m.def}</p>
        </Card>
      ))}
      <p className="text-white/60 text-xs text-center mt-1">
        Complétez au fil du séjour dans{' '}
        <code className="bg-black/20 px-1 rounded">src/pages/souvenirs/Dictionnaire.jsx</code>.
      </p>
    </PageShell>
  )
}
