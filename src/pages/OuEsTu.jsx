import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { collection, addDoc, onSnapshot, orderBy, query, limit, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.js'
import PageShell from '../components/PageShell.jsx'
import { shlagos } from '../data/shlagos.js'
import { unlockAchievement } from '../utils/achievements.js'

const MY_NAME_KEY = 'shlagos-my-name'

const locations = [
  { emoji: '🎡', label: 'Grande Roue' },
  { emoji: '🎤', label: 'Scène principale' },
  { emoji: '🍹', label: 'Bar' },
  { emoji: '🚻', label: 'Toilettes' },
  { emoji: '🚪', label: 'Entrée' },
  { emoji: '📍', label: 'Autre' }
]

function timeAgo(date) {
  if (!date) return ''
  const diffMin = Math.round((Date.now() - date.getTime()) / 60000)
  if (diffMin < 1) return "à l'instant"
  if (diffMin < 60) return `il y a ${diffMin} min`
  return `il y a ${Math.round(diffMin / 60)}h`
}

export default function OuEsTu() {
  const [myName, setMyName] = useState(() => localStorage.getItem(MY_NAME_KEY) || '')
  const [confirmed, setConfirmed] = useState(false)
  const [autreText, setAutreText] = useState('')
  const [showAutre, setShowAutre] = useState(false)
  const [sending, setSending] = useState(false)
  const [feed, setFeed] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'statuts'), orderBy('createdAt', 'desc'), limit(20))
    const unsub = onSnapshot(q, (snap) => {
      setFeed(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    })
    return () => unsub()
  }, [])

  function pickName(name) {
    localStorage.setItem(MY_NAME_KEY, name)
    setMyName(name)
  }

  async function sendLocation(label) {
    setSending(true)
    try {
      await addDoc(collection(db, 'statuts'), {
        message: `${myName} — REJOIGNEZ-MOI — Je suis près de : ${label}`,
        author: myName,
        createdAt: serverTimestamp()
      })
      unlockAchievement('on-te-retrouve')
      setShowAutre(false)
      setAutreText('')
      setConfirmed(false)
    } finally {
      setSending(false)
    }
  }

  return (
    <PageShell title="Où es-tu ?" emoji="📍">
      <p className="text-white/80 text-sm -mt-1">On est perdus → on se retrouve. Vite fait.</p>

      {!myName ? (
        <>
          <p className="text-white/70 text-sm font-display font-semibold mt-1">Qui es-tu ?</p>
          <div className="grid grid-cols-2 gap-2.5">
            {shlagos.map((s) => (
              <button
                key={s.id}
                onClick={() => pickName(s.prenom)}
                className="glass-card rounded-2xl py-3.5 flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
              >
                {s.photo ? (
                  <img src={s.photo} alt={s.prenom} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-display font-bold text-white">
                    {s.prenom.charAt(0)}
                  </div>
                )}
                <span className="text-white text-sm font-display font-semibold">{s.prenom}</span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between glass-card rounded-2xl px-4 py-2.5">
            <span className="text-white text-sm">
              T'es <span className="font-display font-bold">{myName}</span>
            </span>
            <button
              onClick={() => {
                localStorage.removeItem(MY_NAME_KEY)
                setMyName('')
                setConfirmed(false)
              }}
              className="text-white/60 text-xs underline underline-offset-2"
            >
              changer
            </button>
          </div>

          <AnimatePresence mode="wait">
            {!confirmed ? (
              <motion.button
                key="rejoignez"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setConfirmed(true)}
                className="rounded-full bg-gradient-to-br from-coral-500 to-coral-600 py-5 font-display font-extrabold text-white text-xl shadow-[0_8px_24px_-6px_rgba(232,72,47,0.6)] active:scale-95 transition-transform"
              >
                🔴 REJOIGNEZ-MOI
              </motion.button>
            ) : (
              <motion.div key="locations" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <p className="text-white text-sm font-display font-semibold mb-2 text-center">Je suis près de :</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {locations.map((loc) => (
                    <button
                      key={loc.label}
                      disabled={sending}
                      onClick={() => (loc.label === 'Autre' ? setShowAutre(true) : sendLocation(loc.label))}
                      className="glass-card rounded-2xl py-4 flex flex-col items-center gap-1 active:scale-95 transition-transform disabled:opacity-50"
                    >
                      <span className="text-2xl">{loc.emoji}</span>
                      <span className="text-white text-xs font-display font-semibold">{loc.label}</span>
                    </button>
                  ))}
                </div>

                {showAutre && (
                  <div className="flex gap-2 mt-2.5">
                    <input
                      autoFocus
                      type="text"
                      placeholder="Précise où…"
                      value={autreText}
                      onChange={(e) => setAutreText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && autreText.trim() && sendLocation(autreText.trim())}
                      className="flex-1 rounded-xl bg-white/15 px-3 py-2 text-sm text-white placeholder-white/50 outline-none"
                    />
                    <button
                      onClick={() => autreText.trim() && sendLocation(autreText.trim())}
                      disabled={!autreText.trim() || sending}
                      className="rounded-xl bg-coral-500 px-4 font-display font-bold text-white text-sm disabled:opacity-50"
                    >
                      OK
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      <div className="flex flex-col gap-2 mt-2">
        <AnimatePresence initial={false}>
          {feed.map((m) => (
            <motion.div
              key={m.id}
              layout
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl px-4 py-2.5 flex items-center gap-2"
            >
              <span className="text-white text-sm flex-1">{m.message}</span>
              <span className="text-white/50 text-[11px] shrink-0">
                {m.createdAt?.toDate && timeAgo(m.createdAt.toDate())}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        {feed.length === 0 && <p className="text-white/50 text-sm text-center mt-1">Personne n'a encore signalé sa position.</p>}
      </div>
    </PageShell>
  )
}
