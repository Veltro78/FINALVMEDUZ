import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase.js'
import PageShell from '../../components/PageShell.jsx'
import Portal from '../../components/Portal.jsx'
import { unlockAchievement } from '../../utils/achievements.js'

const NAME_KEY = 'shlagos-polaroid-name'
const MAX_WIDTH = 480 // photo compressée côté téléphone avant envoi — reste léger dans Firestore

// petites rotations fixes façon polaroid jeté sur une table, pas trop
// aléatoire pour rester propre visuellement
const TILT = [-3, 2, -2, 3, -1.5, 1.5]

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const scale = Math.min(1, MAX_WIDTH / img.width)
        const canvas = document.createElement('canvas')
        canvas.width = img.width * scale
        canvas.height = img.height * scale
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.55))
      }
      img.onerror = reject
      img.src = e.target.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function Polaroid() {
  const [photos, setPhotos] = useState([])
  const [name, setName] = useState(() => localStorage.getItem(NAME_KEY) || '')
  const [caption, setCaption] = useState('')
  const [pendingFile, setPendingFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [sending, setSending] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const cameraInputRef = useRef(null)
  const galleryInputRef = useRef(null)

  useEffect(() => {
    const q = query(collection(db, 'polaroids'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      setPhotos(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    })
    return () => unsub()
  }, [])

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setPendingFile(file)
    const compressed = await compressImage(file)
    setPreview(compressed)
  }

  function resetInputs() {
    if (cameraInputRef.current) cameraInputRef.current.value = ''
    if (galleryInputRef.current) galleryInputRef.current.value = ''
  }

  async function send() {
    if (!preview) return
    setSending(true)
    try {
      localStorage.setItem(NAME_KEY, name)
      await addDoc(collection(db, 'polaroids'), {
        image: preview,
        caption: caption.trim(),
        author: name.trim() || 'Un Shlago',
        createdAt: serverTimestamp()
      })
      unlockAchievement('premier-polaroid')
      setPreview(null)
      setPendingFile(null)
      setCaption('')
      resetInputs()
    } finally {
      setSending(false)
    }
  }

  return (
    <PageShell title="Mode Polaroid" emoji="📸">
      <p className="text-white/80 text-sm -mt-1">Toutes les photos du groupe, en direct.</p>

      <div className="glass-card rounded-3xl p-4 flex flex-col gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-white/60 text-[11px] font-display font-semibold uppercase tracking-wide pl-1">
            Ton prénom
          </span>
          <div className="flex items-center gap-2 rounded-2xl bg-white/12 px-3.5 py-2.5">
            <span className="text-base opacity-70">👤</span>
            <input
              type="text"
              placeholder="Leo, Bengal, Mathieu…"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent flex-1 text-sm text-white placeholder-white/40 outline-none"
            />
          </div>
        </label>

        {preview ? (
          <div className="relative bg-white rounded-2xl p-2.5 pb-8 shadow-lg mx-auto w-full max-w-[260px]">
            <img src={preview} alt="preview" className="w-full rounded-lg" />
            <button
              onClick={() => {
                setPreview(null)
                setPendingFile(null)
                resetInputs()
              }}
              className="absolute -top-2.5 -right-2.5 w-8 h-8 rounded-full bg-coral-500 text-white text-sm shadow-lg flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => cameraInputRef.current?.click()}
              className="rounded-2xl bg-gradient-to-br from-coral-400 to-coral-600 py-6 flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
            >
              <span className="text-2xl">📷</span>
              <span className="text-white text-xs font-display font-bold">Prendre une photo</span>
            </button>
            <button
              onClick={() => galleryInputRef.current?.click()}
              className="rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 py-6 flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
            >
              <span className="text-2xl">🖼️</span>
              <span className="text-white text-xs font-display font-bold">Depuis la galerie</span>
            </button>
          </div>
        )}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFile}
          className="hidden"
        />
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />

        {preview && (
          <>
            <label className="flex flex-col gap-1.5">
              <span className="text-white/60 text-[11px] font-display font-semibold uppercase tracking-wide pl-1">
                Légende (optionnel)
              </span>
              <div className="flex items-center gap-2 rounded-2xl bg-white/12 px-3.5 py-2.5">
                <span className="text-base opacity-70">✏️</span>
                <input
                  type="text"
                  placeholder="Un petit mot…"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="bg-transparent flex-1 text-sm text-white placeholder-white/40 outline-none"
                />
              </div>
            </label>
            <button
              onClick={send}
              disabled={sending}
              className="rounded-full bg-gradient-to-br from-coral-400 to-purple-600 py-3 font-display font-bold text-white disabled:opacity-50 shadow-[0_6px_18px_-6px_rgba(0,0,0,0.4)]"
            >
              {sending ? 'Envoi…' : '✨ Ajouter au mur'}
            </button>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-5 mt-3 px-1">
        <AnimatePresence>
          {photos.map((p, i) => (
            <motion.button
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.85, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: TILT[i % TILT.length] }}
              whileTap={{ scale: 0.95, rotate: 0 }}
              onClick={() => setLightbox(p)}
              className="bg-white rounded-md p-1.5 pb-4 shadow-[0_6px_16px_-4px_rgba(0,0,0,0.4)]"
            >
              <img src={p.image} alt={p.caption} className="w-full aspect-square object-cover rounded-sm" />
              {p.caption && (
                <p className="text-pool-900 text-[10px] font-display font-semibold mt-1.5 truncate">{p.caption}</p>
              )}
              <p className="text-pool-900/50 text-[9px] mt-0.5">{p.author}</p>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {photos.length === 0 && (
        <p className="text-white/50 text-sm text-center mt-4">Aucune photo pour l'instant — sois le premier !</p>
      )}

      <AnimatePresence>
        {lightbox && (
          <Portal>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
              className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: 'spring', duration: 0.4, bounce: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg p-3 pb-8 shadow-2xl max-w-sm w-full"
              >
                <img src={lightbox.image} alt={lightbox.caption} className="w-full rounded-sm" />
                {lightbox.caption && (
                  <p className="text-pool-900 text-sm font-display font-semibold mt-3">{lightbox.caption}</p>
                )}
                <p className="text-pool-900/50 text-xs mt-1">{lightbox.author}</p>
              </motion.div>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </PageShell>
  )
}
