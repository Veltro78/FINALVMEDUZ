import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const glowColor = {
  coral: 'bg-coral-400',
  sun: 'bg-sun-400',
  purple: 'bg-purple-400',
  turquoise: 'bg-turquoise-400',
  tropical: 'bg-tropical-400',
  orange: 'bg-orange-400'
}

const gradientBg = {
  coral: 'from-coral-400 to-coral-600',
  sun: 'from-sun-400 to-sun-600',
  purple: 'from-purple-400 to-purple-600',
  turquoise: 'from-turquoise-400 to-turquoise-600',
  tropical: 'from-tropical-400 to-tropical-600',
  orange: 'from-orange-400 to-orange-600'
}

/**
 * A visually loud "don't miss this" card — soft pulsing halo behind a
 * vivid gradient tile, big emoji, bold title. Reserved for the handful of
 * standout/original features so they read as clearly more important than
 * the regular reference-content buttons.
 */
export default function FeatureCard({ to, emoji, title, subtitle, color = 'coral', badge }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <motion.span
        className={`absolute inset-0 rounded-3xl ${glowColor[color]} -z-10`}
        style={{ filter: 'blur(18px)' }}
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <Link
        to={to}
        className={`relative flex flex-col justify-between h-32 rounded-3xl p-4 bg-gradient-to-br ${gradientBg[color]} shadow-[0_10px_28px_-8px_rgba(0,0,0,0.5)] active:scale-[0.97] transition-transform overflow-hidden`}
      >
        {badge && (
          <span className="absolute top-2 right-2 bg-white/25 backdrop-blur text-white text-[9px] font-display font-bold px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
        <span className="text-3xl">{emoji}</span>
        <span>
          <span className="block font-display font-extrabold text-white text-sm leading-tight drop-shadow-sm">
            {title}
          </span>
          {subtitle && (
            <span className="block font-body text-white/85 text-[11px] mt-0.5 leading-tight">
              {subtitle}
            </span>
          )}
        </span>
      </Link>
    </motion.div>
  )
}
