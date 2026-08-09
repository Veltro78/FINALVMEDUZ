import PageShell from '../../components/PageShell.jsx'
import ZoomableImage from '../../components/ZoomableImage.jsx'

export default function PlanFestival() {
  return (
    <PageShell title="Plan du Festival" emoji="📍">
      <p className="text-white/85 text-sm mb-1">
        Plan officiel du site (Playa de Cullera). Pince pour zoomer, glisse pour te déplacer.
      </p>
      <ZoomableImage src="/plan-medusa.jpg" alt="Plan officiel du Medusa Festival" />
    </PageShell>
  )
}
