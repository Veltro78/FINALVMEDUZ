import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase.js'
import PageShell from '../../components/PageShell.jsx'

const NAME_KEY = 'shlagos-polaroid-name' // même pseudo que le mode Polaroid

export default function CapsuleTemporelle() {
  const [capsules, setCapsules] = useState([])
  const [now, setNow] = useState(Date.now())
  const [name, setName] = useState(() => localStorage.getItem(NAME_KEY) || '')
  const [message, setMessage] = useState('')
  const [unlockDate, setUnlockDate] = useState('')
  const [sending, setSending] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const q = query(collection(db, 'capsules'), orderBy('unlockAt', 'asc'))
    const unsub = onSnapshot(q, (snap) => {
      setCapsules(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30000)
    return () => clearInterval(t)
  }, [])

  async function send() {
    if (!message.trim() || !unlockDate) return
    setSending(true)
    try {
      localStorage.setItem(NAME_KEY, name)
      await addDoc(collection(db, 'capsules'), {
        message: message.trim(),
        author: name.trim() || 'Un Shlago',
        unlockAt: new Date(unlockDate).getTime(),
        createdAt: serverTimestamp()
      })
      setMessage('')
      setUnlockDate('')
      setShowForm(false)
    } finally {
      setSending(false)
    }
  }

  return (
    <PageShell title="Capsule Temporelle" emoji="🔒">
      <p className="text-white/80 text-sm -mt-1">
        Écris un message, choisis une date — il reste scellé jusque-là pour tout le monde.
      </p>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="rounded-full bg-gradient-to-br from-purple-500 to-coral-500 py-3 font-display font-bold text-white"
        >
          + Créer une capsule
        </button>
      ) : (
        <div className="glass-card rounded-3xl p-4 flex flex-col gap-3">
          <input
            type="text"
            placeholder="Ton prénom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl bg-white/15 px-3 py-2 text-sm text-white placeholder-white/50 outline-none"
          />
          <textarea
            placeholder="Ton message…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="rounded-xl bg-white/15 px-3 py-2 text-sm text-white placeholder-white/50 outline-none resize-none"
          />
          <label className="text-white/70 text-xs font-display font-semibold">
            Date de déblocage
            <input
              type="datetime-local"
              value={unlockDate}
              onChange={(e) => setUnlockDate(e.target.value)}
              className="mt-1 w-full rounded-xl bg-white/15 px-3 py-2 text-sm text-white outline-none"
            />
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 rounded-full bg-white/15 py-2.5 font-display font-semibold text-white text-sm"
            >
              Annuler
            </button>
            <button
              onClick={send}
              disabled={sending || !message.trim() || !unlockDate}
              className="flex-1 rounded-full bg-gradient-to-br from-coral-400 to-purple-600 py-2.5 font-display font-bold text-white text-sm disabled:opacity-50"
            >
              {sending ? 'Scellage…' : 'Sceller 🔒'}
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 mt-2">
        <AnimatePresence>
          {capsules.map((c) => {
            const unlocked = now >= c.unlockAt
            return (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`glass-card rounded-2xl p-4 ${unlocked ? 'border border-sun-300/50' : ''}`}
              >
                {unlocked ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', duration: 0.6 }}
                  >
                    <p className="text-sun-300 text-xs font-display font-bold mb-1">🔓 Débloquée !</p>
                    <p className="text-white text-sm leading-snug">{c.message}</p>
                    <p className="text-white/50 text-[11px] mt-2">— {c.author}</p>
                  </motion.div>
                ) : (
                  <div className="text-center py-2">
                    <span className="text-2xl">🔒</span>
                    <p className="text-white/70 text-xs mt-1">
                      Capsule de {c.author} — s'ouvre le{' '}
                      {new Date(c.unlockAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>

        {capsules.length === 0 && (
          <p className="text-white/50 text-sm text-center mt-2">Aucune capsule pour l'instant.</p>
        )}
      </div>
    </PageShell>
  )
}
