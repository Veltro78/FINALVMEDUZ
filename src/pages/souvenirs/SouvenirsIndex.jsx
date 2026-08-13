import PageShell from '../../components/PageShell.jsx'
import BigButton from '../../components/BigButton.jsx'
import Highlight from '../../components/Highlight.jsx'

export default function SouvenirsIndex() {
  return (
    <PageShell title="Souvenirs & Jeux" emoji="🍹">
      <Highlight color="coral" badge="🔥">
        <BigButton to="/souvenirs/polaroid" icon="camera" subtitle="Le mur photo du groupe, en direct">
          Mode Polaroid
        </BigButton>
      </Highlight>
      <Highlight color="turquoise" badge="🎮">
        <BigButton to="/souvenirs/aventure" icon="🎮" color="turquoise" subtitle="3 niveaux de plateforme">
          Shlago Adventure
        </BigButton>
      </Highlight>
      <BigButton to="/souvenirs/prout" icon="💨" color="orange" subtitle="Avec vos vraies têtes">
        Boîte à Prout
      </BigButton>
      <Highlight color="sun" badge="⭐">
        <BigButton to="/souvenirs/trophees" icon="🏅" color="sun" subtitle="Se remplit en jouant">
          Mur des Trophées
        </BigButton>
      </Highlight>
      <BigButton to="/souvenirs/capsule" icon="backpack" color="tropical" subtitle="Scellée jusqu'à une date">
        Capsule Temporelle
      </BigButton>
      <BigButton to="/souvenirs/jeu" icon="backpack" color="purple" subtitle="Un dé, un défi rapide">
        Le Jeu du Schlag
      </BigButton>
      <BigButton to="/souvenirs/defis" icon="trophy">
        Défis &amp; Classement
      </BigButton>
      <BigButton to="/souvenirs/qui-a-dit-ca" icon="chat" color="sun">
        Qui a dit ça ?
      </BigButton>
      <BigButton to="/souvenirs/photos" icon="camera">
        Photos Medusa 2025
      </BigButton>
      <BigButton to="/souvenirs/vlogs" icon="music" color="coral">
        Vlogs
      </BigButton>
      <BigButton to="/souvenirs/citations" icon="chat">
        Citations cultes
      </BigButton>
      <BigButton to="/souvenirs/dictionnaire" icon="book">
        Dictionnaire du Shlago
      </BigButton>
    </PageShell>
  )
}
