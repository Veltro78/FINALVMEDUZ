import PageShell from '../../components/PageShell.jsx'
import BigButton from '../../components/BigButton.jsx'

export default function SouvenirsIndex() {
  return (
    <PageShell title="Souvenirs & Jeux" emoji="🍹">
      <p className="text-white/70 text-xs font-display font-semibold uppercase tracking-wide -mt-1 mb-1">
        Jeux
      </p>
      <BigButton to="/souvenirs/jeu" icon="backpack" color="purple" subtitle="Un dé, un défi rapide">
        Le Jeu du Schlag
      </BigButton>
      <BigButton to="/souvenirs/aventure" icon="🎮" color="turquoise" subtitle="Petit jeu de plateforme solo">
        Shlago Adventure
      </BigButton>
      <BigButton to="/souvenirs/defis" icon="trophy">
        Défis & Classement
      </BigButton>
      <BigButton to="/souvenirs/qui-a-dit-ca" icon="chat" color="sun" subtitle="Devine qui a dit quoi">
        Qui a dit ça ?
      </BigButton>

      <p className="text-white/70 text-xs font-display font-semibold uppercase tracking-wide mt-3 mb-1">
        Souvenirs
      </p>
      <BigButton to="/souvenirs/polaroid" icon="camera" subtitle="Le mur photo du groupe, en direct">
        Mode Polaroid
      </BigButton>
      <BigButton to="/souvenirs/capsule" icon="backpack" color="tropical" subtitle="Message scellé, révélé plus tard">
        Capsule Temporelle
      </BigButton>
      <BigButton to="/souvenirs/photos" icon="camera">
        Photos Medusa 2025
      </BigButton>
      <BigButton to="/souvenirs/vlogs" icon="music" color="coral">
        Vlogs
      </BigButton>

      <p className="text-white/70 text-xs font-display font-semibold uppercase tracking-wide mt-3 mb-1">
        Dossiers
      </p>
      <BigButton to="/souvenirs/citations" icon="chat">
        Citations cultes
      </BigButton>
      <BigButton to="/souvenirs/dictionnaire" icon="book">
        Dictionnaire du Shlago
      </BigButton>
    </PageShell>
  )
}
