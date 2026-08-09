import PageShell from '../../components/PageShell.jsx'
import Card from '../../components/Card.jsx'

const faqs = [
  { emoji: '📿', q: 'Bracelet', a: 'Bracelet en tissu avec puce NFC, nominatif (retrait avec ta CNI). Retrait : jeudi 10h-22h, puis vendredi à dimanche 10h-03h.' },
  { emoji: '💳', q: 'Cashless', a: "Recharge en ligne sur medusasunbeach.com (rubrique Recarga) pour éviter la queue, ou sur place à l'arrivée." },
  { emoji: '🔁', q: 'Réaccès', a: "Le réaccès au recinto de conciertos (entrées/sorties illimitées le même jour) est inclus dans le Kit Festivalero, ou 15€/jour (30€/3 jours) sur place. Pas besoin de réaccès pour River Town Resort (zone camping)." },
  { emoji: '🔞', q: 'Mineurs', a: "Accès à partir de 16 ans révolus le jour de l'entrée, avec autorisation parentale + photocopie de la CNI du parent signataire à présenter au retrait du bracelet." },
  { emoji: '🚌', q: 'Transport', a: 'Bus officiels + navettes depuis plusieurs villes, train jusqu\'à Cullera (20 min à pied du site), parking payant à réserver à l\'avance juste à côté du site (~19€).' },
  { emoji: '🍔', q: 'Food', a: "Food trucks sur place (carte, espèces ou bracelet selon le stand), options sans gluten disponibles. Nourriture/boisson extérieure interdite dans le recinto (sauf zone camping, hors verre et canettes)." },
  { emoji: '💡', q: 'Conseils', a: 'Casquette, crème solaire, gourde, batterie externe, chaussures confortables — le site prévient : grosses chaleurs, prévois de quoi tenir toute la journée.' }
]

export default function Faq() {
  return (
    <PageShell title="FAQ Medusa" emoji="❓">
      {faqs.map((f) => (
        <Card key={f.q} title={f.q} emoji={f.emoji}>
          <p className="text-sm text-white/90">{f.a}</p>
        </Card>
      ))}
      <p className="text-white/60 text-xs text-center mt-1">
        Infos à vérifier sur le site officiel du Medusa Festival avant de partir.
      </p>
    </PageShell>
  )
}
