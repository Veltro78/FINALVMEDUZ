import PageShell from '../../components/PageShell.jsx'
import Card from '../../components/Card.jsx'

// 👉 Playlist YouTube avec tous les vlogs (Medusa 2025 et les raves précédentes).
const PLAYLIST_ID = 'PLR3XgB377oGozrJhKQSv7uv8N9qtI1MY8'
const PLAYLIST_URL = `https://youtube.com/playlist?list=${PLAYLIST_ID}`
const EMBED_URL = `https://www.youtube.com/embed/videoseries?list=${PLAYLIST_ID}`

export default function Vlogs() {
  return (
    <PageShell title="Vlogs" emoji="🎥">
      <p className="text-white/85 text-sm mb-1">
        Tous les vlogs des raves précédentes, Medusa 2025 compris.
      </p>

      <Card className="p-0 overflow-hidden">
        <div className="aspect-video w-full">
          <iframe
            className="w-full h-full"
            src={EMBED_URL}
            title="Playlist Vlogs Shlagos"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Card>

      <a
        href={PLAYLIST_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-white/90 text-pool-800 font-display font-bold text-sm px-4 py-2 active:scale-95 transition-transform self-start"
      >
        Ouvrir dans YouTube ↗
      </a>
    </PageShell>
  )
}
