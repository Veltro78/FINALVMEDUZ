import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageShell from '../../components/PageShell.jsx'
import Portal from '../../components/Portal.jsx'

// Photos souvenirs du Medusa Festival 2025.
const photoFiles = Array.from({ length: 20 }, (_, i) =>
  `photo-${String(i + 1).padStart(2, '0')}.jpeg`
)

const ACCENTS = ['ring-coral-400', 'ring-turquoise-400', 'ring-sun-400', 'ring-purple-400', 'ring-tropical-400']

export default function Photos() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <PageShell title="Photos Medusa 2025" emoji="📸">
      <div className="grid grid-cols-2 gap-3">
        {photoFiles.map((file, i) => (
          <motion.button
            key={file}
            whileTap={{ scale: 0.94 }}
            onClick={() => setLightbox(file)}
            className={`rounded-2xl overflow-hidden glass-card aspect-square ring-2 ring-offset-2 ring-offset-transparent ${ACCENTS[i % ACCENTS.length]}`}
          >
            <img
              src={`/photos-2025/${file}`}
              alt="Souvenir Medusa 2025"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <Portal>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-6"
              onClick={() => setLightbox(null)}
            >
              <motion.img
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.88, opacity: 0 }}
                transition={{ type: 'spring', duration: 0.4, bounce: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                src={`/photos-2025/${lightbox}`}
                alt="Souvenir"
                className="max-h-full max-w-full rounded-2xl shadow-2xl"
              />
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </PageShell>
  )
}
