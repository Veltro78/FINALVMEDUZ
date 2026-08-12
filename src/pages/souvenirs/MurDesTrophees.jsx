import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageShell from '../../components/PageShell.jsx'
import { trophees } from '../../data/trophees.js'
import { shlagos } from '../../data/shlagos.js'
import { getUnlockedIds } from '../../utils/achievements.js'
import Portal from '../../components/Portal.jsx'

export default function MurDesTrophees() {
  const [unlocked, setUnlocked] = useState(new Set())
  const [justUnlocked, setJustUnlocked] = useState(null)

  useEffect(() => {
    setUnlocked(getUnlockedIds())
    function onUnlock(e) {
      setUnlocked(getUnlockedIds())
      const t = trophees.find((tr) => tr.id === e.detail)
      if (t) {
        setJustUnlocked(t)
        setTimeout(() => setJustUnlocked(null), 2600)
      }
    }
    window.addEventListener('shlagos-achievement-unlocked', onUnlock)
    return () => window.removeEventListener('shlagos-achievement-unlocked', onUnlock)
  }, [])

  const count = unlocked.size

  return (
    <PageShell title="Mur des Trophées" emoji="🏅">
      <p className="text-white/80 text-sm -mt-1">
        {count} / {trophees.length} débloqués — se remplit tout seul en jouant.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {trophees.map((t, i) => {
          const isOn = unlocked.has(t.id)
          const person = t.photoId ? shlagos.find((s) => s.id === t.photoId) : null
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`glass-card rounded-3xl p-4 flex flex-col items-center text-center gap-2 ${
                isOn ? 'border border-sun-300/50' : 'opacity-50'
              }`}
            >
              <div className="relative w-16 h-16 flex items-center justify-center">
                {person && isOn ? (
                  <img
                    src={person.photo}
                    alt={person.prenom}
                    className="w-16 h-16 rounded-full object-cover border-2 border-sun-300"
                  />
                ) : (
                  <span className="text-4xl" style={{ filter: isOn ? 'none' : 'grayscale(1) brightness(0.5)' }}>
                    {t.emoji}
                  </span>
                )}
                {isOn && person && (
                  <span className="absolute -bottom-1 -right-1 text-lg">{t.emoji}</span>
                )}
              </div>
              <span className="font-display font-bold text-white text-xs leading-tight">
                {isOn ? t.titre : '???'}
              </span>
              <span className="text-white/60 text-[10px] leading-tight">
                {isOn ? t.desc : 'Encore à débloquer'}
              </span>
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {justUnlocked && (
          <Portal>
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-6 left-4 right-4 z-50 glass-card rounded-3xl p-4 flex items-center gap-3 border border-sun-300/60 max-w-sm mx-auto"
            >
              <span className="text-3xl">{justUnlocked.emoji}</span>
              <div>
                <p className="text-sun-300 text-[10px] font-display font-bold uppercase tracking-wide">
                  Trophée débloqué !
                </p>
                <p className="text-white font-display font-bold text-sm">{justUnlocked.titre}</p>
              </div>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    </PageShell>
  )
}
