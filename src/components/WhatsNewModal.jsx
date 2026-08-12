import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CHANGELOG_VERSION, changelog } from '../data/changelog.js'
import Portal from './Portal.jsx'

const SEEN_KEY = 'shlagos-seen-version'

export default function WhatsNewModal() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem(SEEN_KEY)
    if (seen !== CHANGELOG_VERSION) setShow(true)
  }, [])

  function close() {
    localStorage.setItem(SEEN_KEY, CHANGELOG_VERSION)
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <Portal>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/65 flex items-center justify-center p-5"
            onClick={close}
          >
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-3xl p-6 w-full max-w-sm text-center"
            >
              <span className="text-4xl">✨</span>
              <h2 className="font-display font-extrabold text-white text-xl mt-2 mb-4">Nouveautés</h2>

              <ul className="flex flex-col gap-2.5 text-left mb-5">
                {changelog.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    className="text-white/90 text-sm leading-snug"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>

              <p className="font-display font-bold text-sun-300 text-sm mb-5">
                Profitez bien de votre festival ! 🦑
              </p>

              <button
                onClick={close}
                className="w-full rounded-full bg-gradient-to-br from-coral-400 to-purple-600 py-3 font-display font-bold text-white"
              >
                C'est noté !
              </button>
            </motion.div>
          </motion.div>
        </Portal>
      )}
    </AnimatePresence>
  )
}
