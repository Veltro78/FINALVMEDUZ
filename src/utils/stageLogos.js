// Logos officiels des scènes (récupérés sur le site du festival).
// getStageLogo() fait un match souple sur le nom de la scène tel qu'il
// apparaît dans lineupSchedule.js (qui inclut parfois un suffixe, genre
// "Dharma — Universo Makina"), donc pas besoin de garder les deux textes
// parfaitement synchronisés.
const logos = {
  'masters of hardcore': '/icons/stages/moh.png',
  apsaras: '/icons/stages/apsaras.png',
  resonance: '/icons/stages/resonance.png',
  'arcade land': '/icons/stages/arcade-land.png',
  beyond: '/icons/stages/beyond.png',
  dharma: '/icons/stages/dharma.png',
  'beach club': '/icons/stages/beach-club.png',
  vertigo: '/icons/stages/the-club-vertigo.png',
  church: '/icons/stages/church-club.png',
  poliakov: '/icons/stages/poliakov-stage.png'
}

export function getStageLogo(stageName = '') {
  const key = stageName.toLowerCase()
  const match = Object.keys(logos).find((k) => key.includes(k))
  return match ? logos[match] : null
}
