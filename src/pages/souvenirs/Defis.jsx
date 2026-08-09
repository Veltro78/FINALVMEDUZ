import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { doc, onSnapshot, setDoc, increment, collection } from 'firebase/firestore'
import { db } from '../../firebase.js'
import PageShell from '../../components/PageShell.jsx'
import Card from '../../components/Card.jsx'
import { shlagos } from '../../data/shlagos.js'
import { sfx } from '../../utils/sfx.js'

// 👉 Défis à points — en tapant sur un défi, tu choisis qui l'a fait, et
// ses points s'ajoutent au même classement partagé que "Classement des
// Shlagos" (synchronisé en direct entre tous les téléphones via Firestore).
const defis = [
  { texte: "Voir un(e) Espagnol(e) faire une branlette à un(e) autre Espagnol(e)", points: 15 },
  { texte: 'Servir un Grec derrière le bar', points: 7 },
  { texte: "Trouver le sosie de quelqu'un (noté /10 par tout le monde, +6 bonus si la moyenne dépasse 3)", points: 6 },
  { texte: "Faire un bus à quelqu'un", points: 1 },
  { texte: 'Tester une nouvelle drogue', points: 4 },
  { texte: 'Coucher avec quelqu\'un dans sa tente (+10 si c\'est la tente de quelqu\'un d\'autre)', points: 6 },
  { texte: 'Prendre une douche tout(e) nu(e)', points: 7 },
  { texte: 'Pécho quelqu\'un sur la mainstage', points: 4 },
  { texte: 'Un café-alcool au réveil (par tasse)', points: 2 },
  { texte: 'Vomir', points: -3 },
  { texte: 'Faire la bise à Sarah Landry', points: 20 },
  { texte: 'Quelqu\'un termine une bouteille entière', points: 2 },
  { texte: 'Ramener quelqu\'un au camp (+2 bonus si ça devient sérieux)', points: 2 },
  { texte: 'Créer une chenille de 10 personnes minimum', points: 3 },
  { texte: "Monter la tente de quelqu'un d'autre", points: 1 },
  { texte: 'Passer au stand Réduction des Risques', points: 10 },
  { texte: 'Un cul sec (max 5 comptabilisés)', points: 1 },
  { texte: 'Ramener un banc de la tente blanche jusqu\'au camp', points: 7 },
  { texte: 'Dormir ailleurs que dans son propre camp', points: 3 },
  { texte: "Pécho quelqu'un qui n'est ni français(e) ni espagnol(e)", points: 5 },
  { texte: 'Participer à la parade', points: 1 },
  { texte: 'Prendre une douche totalement habillé(e)', points: 1 },
  { texte: 'Ramener un(e) Français(e) au camp', points: 1 },
  { texte: 'Selfie avec un membre du staff', points: 1 },
  { texte: 'Selfie avec un artiste présent au festival', points: 8 },
  { texte: 'Faire une soirée entière sans aucune drogue dure', points: 10 },
  { texte: 'Courir tout(e) nu(e)', points: 1 },
  { texte: "Convaincre Gob que ses potes ont pris un truc qu'ils ont pas pris", points: 5 },
  { texte: "Tenir une conversation sérieuse avec Mathieu sans qu'il reparte sur un vieux débat", points: 5 },
  { texte: "Retrouver Ryfu et l'Espagnole 2h après l'avoir perdu de vue", points: 5 },
  { texte: 'Faire dormir Baby Shlagos avant minuit (mission quasi impossible)', points: 5 },
  { texte: "Survivre à un kick d'Angerfist sans réveiller Baby Shlagos d'angoisse", points: 5 }
]

const medals = ['🥇', '🥈', '🥉']

export default function Defis() {
  const [scores, setScores] = useState(() => Object.fromEntries(shlagos.map((s) => [s.id, 0])))
  const [doneBy, setDoneBy] = useState({}) // { index: shlagoId } — juste pour l'affichage de cette session
  const [pickerIndex, setPickerIndex] = useState(null)

  useEffect(() => {
    const unsubs = shlagos.map((s) =>
      onSnapshot(doc(collection(db, 'classement'), s.id), (snap) => {
        if (snap.exists()) setScores((prev) => ({ ...prev, [s.id]: snap.data().score || 0 }))
      })
    )
    return () => unsubs.forEach((u) => u())
  }, [])

  function assign(shlagoId) {
    const defi = defis[pickerIndex]
    setDoneBy((d) => ({ ...d, [pickerIndex]: shlagoId }))
    setScores((s) => ({ ...s, [shlagoId]: (s[shlagoId] || 0) + defi.points }))
    setDoc(doc(collection(db, 'classement'), shlagoId), { score: increment(defi.points) }, { merge: true })
    setPickerIndex(null)
    defi.points > 0 ? sfx.coin() : sfx.fail()
  }

  const ranked = [...shlagos].sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0))

  return (
    <PageShell title="Défis & Classement" emoji="🏆">
      <Card title="Classement en direct" emoji="🔴">
        <div className="flex flex-col gap-1.5">
          {ranked.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2 text-sm">
              <span className="w-5 text-center">{medals[i] || i + 1}</span>
              <span className="flex-1 font-display font-semibold">{s.prenom}</span>
              <span className="font-display font-bold">{scores[s.id] || 0} pts</span>
            </div>
          ))}
        </div>
      </Card>

      <p className="text-white/70 text-xs -mt-1 mb-1">Tape un défi pour dire qui l'a fait.</p>

      {defis.map((d, i) => {
        const who = doneBy[i] ? shlagos.find((s) => s.id === doneBy[i]) : null
        return (
          <motion.button
            key={i}
            whileTap={{ scale: 0.98 }}
            onClick={() => setPickerIndex(i)}
            className={`glass-card rounded-3xl p-4 text-left flex items-center gap-3 ${who ? 'bg-white/25' : ''}`}
          >
            <span className="text-xl shrink-0" aria-hidden="true">{who ? '✅' : '⬜️'}</span>
            <span className="text-sm flex-1 text-white/95">
              {d.texte}
              {who && <span className="block text-white/60 text-xs mt-0.5">Fait par {who.prenom}</span>}
            </span>
            <span className={`font-display font-bold text-sm shrink-0 ${d.points < 0 ? 'text-coral-300' : 'text-sun-300'}`}>
              {d.points > 0 ? '+' : ''}{d.points}
            </span>
          </motion.button>
        )
      })}

      <AnimatePresence>
        {pickerIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-4"
            onClick={() => setPickerIndex(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-3xl p-5 w-full max-w-sm"
            >
              <p className="font-display font-bold text-white text-center mb-4">Qui a fait ça ?</p>
              <div className="grid grid-cols-2 gap-2.5">
                {shlagos.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => assign(s.id)}
                    className="rounded-2xl bg-white/10 py-3 flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
                  >
                    {s.photo ? (
                      <img src={s.photo} alt={s.prenom} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-display font-bold text-white">
                        {s.prenom.charAt(0)}
                      </div>
                    )}
                    <span className="text-white text-xs font-display font-semibold">{s.prenom}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  )
}
