import PageShell from '../components/PageShell.jsx'
import BigButton from '../components/BigButton.jsx'

export default function NotFound() {
  return (
    <PageShell title="Perdu en festival ?" emoji="🧭">
      <p className="text-white/85 text-sm mb-2">Cette page n'existe pas — retourne à l'accueil.</p>
      <BigButton to="/" icon="🏠" color="turquoise">
        Retour à l'accueil
      </BigButton>
    </PageShell>
  )
}
