import { motion } from 'framer-motion'

// 👉 À PERSONNALISER : remplace ces emojis par de vraies images une fois
// générées. Passe `src: '/splash-floaters/xxx.png'` au lieu de `emoji: '...'`
// et le composant les affichera automatiquement en <img>.
const floaters = [
  { emoji: '🌴', size: 46, top: '8%', left: '10%', duration: 7, delay: 0 },
  { emoji: '🦩', size: 40, top: '14%', left: '78%', duration: 8.5, delay: 0.6 },
  { emoji: '🌊', size: 38, top: '30%', left: '4%', duration: 6.5, delay: 1.1 },
  { emoji: '🎧', size: 34, top: '68%', left: '85%', duration: 7.5, delay: 0.3 },
  { emoji: '🍹', size: 32, top: '78%', left: '12%', duration: 9, delay: 1.4 },
  { emoji: '🦑', size: 42, top: '20%', left: '48%', duration: 8, delay: 0.9 },
  { emoji: '☀️', size: 36, top: '58%', left: '90%', duration: 6.8, delay: 0.2 },
  { emoji: '💧', size: 26, top: '85%', left: '55%', duration: 7.2, delay: 1.7 }
]

export default function SplashFloaters() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floaters.map((f, i) => (
        <motion.div
          key={i}
          className="absolute opacity-70"
          style={{ top: f.top, left: f.left, fontSize: f.size }}
          initial={{ y: 0, x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: [0, -18, 0, 14, 0],
            x: [0, 10, 0, -10, 0],
            rotate: [0, 6, 0, -6, 0],
            opacity: 0.7
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {f.src ? (
            <img src={f.src} alt="" className="w-full h-full object-contain drop-shadow-lg" />
          ) : (
            <span className="drop-shadow-lg" aria-hidden="true">{f.emoji}</span>
          )}
        </motion.div>
      ))}
    </div>
  )
}
