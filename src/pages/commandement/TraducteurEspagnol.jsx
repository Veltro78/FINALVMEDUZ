import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageShell from '../../components/PageShell.jsx'
import { phrases } from '../../data/phrases.js'

const chipColor = {
  turquoise: 'bg-turquoise-500',
  coral: 'bg-coral-500',
  sun: 'bg-sun-500',
  tropical: 'bg-tropical-500',
  purple: 'bg-purple-500'
}

export default function TraducteurEspagnol() {
  const [catIndex, setCatIndex] = useState(0)
  const cat = phrases[catIndex]

  return (
    <PageShell title="Traducteur Espagnol" emoji="🇪🇸">
      <p className="text-white/80 text-sm -mt-1">
        Le strict nécessaire pour survivre (et s'amuser) en Espagne.
      </p>

      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
        {phrases.map((c, i) => (
          <button
            key={c.categorie}
            onClick={() => setCatIndex(i)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-display font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              i === catIndex ? chipColor[c.couleur] + ' text-white' : 'glass-card text-white/85'
            }`}
          >
            <span>{c.emoji}</span> {c.categorie}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={cat.categorie}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-2.5"
        >
          {cat.items.map((p, i) => (
            <motion.div
              key={p.fr}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="glass-card rounded-2xl px-4 py-3"
            >
              <p className="text-white/70 text-xs mb-1">{p.fr}</p>
              <p className="font-display font-bold text-white text-base leading-snug">{p.es}</p>
              <p className="text-sun-300 text-xs mt-1 italic">🔊 {p.phon}</p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </PageShell>
  )
}
