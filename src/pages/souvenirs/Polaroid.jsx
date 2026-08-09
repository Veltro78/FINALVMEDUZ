import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase.js'
import PageShell from '../../components/PageShell.jsx'

const NAME_KEY = 'shlagos-polaroid-name'
const MAX_WIDTH = 480 // photo compressée côté téléphone avant envoi — reste léger dans Firestore

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
  const fileInputRef = useRef(null)

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
      setPreview(null)
      setPendingFile(null)
      setCaption('')
      if (fileInputRef.current) fileInputRef.current.value = ''
    } finally {
      setSending(false)
    }
  }

  return (
    <PageShell title="Mode Polaroid" emoji="📸">
      <p className="text-white/80 text-sm -mt-1">Toutes les photos du groupe, en direct.</p>

      <div className="glass-card rounded-3xl p-4 flex flex-col gap-3">
        <input
          type="text"
          placeholder="Ton prénom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl bg-white/15 px-3 py-2 text-sm text-white placeholder-white/50 outline-none"
        />

        {preview ? (
          <div className="relative">
            <img src={preview} alt="preview" className="w-full rounded-2xl" />
            <button
              onClick={() => {
                setPreview(null)
                setPendingFile(null)
                if (fileInputRef.current) fileInputRef.current.value = ''
              }}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white text-sm"
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="rounded-2xl border-2 border-dashed border-white/30 py-8 text-white/70 text-sm font-display font-semibold"
          >
            📷 Prendre / choisir une photo
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFile}
          className="hidden"
        />

        {preview && (
          <>
            <input
              type="text"
              placeholder="Une légende (optionnel)"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="rounded-xl bg-white/15 px-3 py-2 text-sm text-white placeholder-white/50 outline-none"
            />
            <button
              onClick={send}
              disabled={sending}
              className="rounded-full bg-gradient-to-br from-coral-400 to-purple-600 py-2.5 font-display font-bold text-white disabled:opacity-50"
            >
              {sending ? 'Envoi…' : 'Ajouter au mur'}
            </button>
          </>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-2">
        <AnimatePresence>
          {photos.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-2xl p-2"
            >
              <img src={p.image} alt={p.caption} className="w-full rounded-xl mb-2" />
              {p.caption && <p className="text-white text-xs font-display font-semibold">{p.caption}</p>}
              <p className="text-white/50 text-[10px] mt-0.5">{p.author}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {photos.length === 0 && (
        <p className="text-white/50 text-sm text-center mt-4">Aucune photo pour l'instant — sois le premier !</p>
      )}
    </PageShell>
  )
}
