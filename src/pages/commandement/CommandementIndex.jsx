import PageShell from '../../components/PageShell.jsx'
import BigButton from '../../components/BigButton.jsx'

export default function CommandementIndex() {
  return (
    <PageShell title="Centre de Commandement" emoji="🗺️">
      <BigButton to="/commandement/plan" icon="map">
        Plan du Festival
      </BigButton>
      <BigButton to="/commandement/meteo" icon="☀️">
        Météo
      </BigButton>
      <BigButton to="/commandement/espagnol" icon="🇪🇸" color="orange" subtitle="Le strict nécessaire pour survivre">
        Traducteur Espagnol
      </BigButton>
      <BigButton
        icon="💳"
        color="tropical"
        subtitle="Recharger le bracelet festival"
        onClick={() => window.open('https://www.medusasunbeach.com/recarga-2026', '_blank', 'noopener,noreferrer')}
      >
        Cashless
      </BigButton>
      <BigButton to="/commandement/faq" icon="question">
        FAQ Medusa
      </BigButton>
      <BigButton to="/commandement/risques" icon="firstaid">
        Réduction des risques
      </BigButton>
    </PageShell>
  )
}
