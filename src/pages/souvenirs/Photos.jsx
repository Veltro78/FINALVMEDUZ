import { useState } from 'react'
import PageShell from '../../components/PageShell.jsx'

// Photos souvenirs du Medusa Festival 2025.
const photoFiles = Array.from({ length: 20 }, (_, i) =>
  `photo-${String(i + 1).padStart(2, '0')}.jpeg`
)

export default function Photos() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <PageShell title="Photos Medusa 2025" emoji="📸">
      <div className="grid grid-cols-2 gap-3">
        {photoFiles.map((file) => (
          <button
            key={file}
            onClick={() => setLightbox(file)}
            className="rounded-2xl overflow-hidden glass-card aspect-square"
          >
            <img src={`/photos-2025/${file}`} alt="Souvenir Medusa 2025" className="w-full h-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <img src={`/photos-2025/${lightbox}`} alt="Souvenir" className="max-h-full max-w-full rounded-2xl" />
        </div>
      )}
    </PageShell>
  )
}
