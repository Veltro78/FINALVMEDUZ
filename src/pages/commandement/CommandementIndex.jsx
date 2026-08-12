import PageShell from '../../components/PageShell.jsx'
import BigButton from '../../components/BigButton.jsx'
import CompactLink from '../../components/CompactLink.jsx'

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

      <p className="text-white/50 text-[11px] font-display font-semibold uppercase tracking-wide mt-4 mb-1">
        Infos pratiques
      </p>
      <div className="flex flex-col gap-1">
        <CompactLink to="/commandement/faq" emoji="❓">FAQ Medusa</CompactLink>
        <CompactLink to="/commandement/risques" emoji="💊">Réduction des risques</CompactLink>
      </div>
    </PageShell>
  )
}
