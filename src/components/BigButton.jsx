import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Real glossy icon badges (generated to match the logo's art style).
const iconFiles = {
  map: '/icons/buttons/map.png',
  headphones: '/icons/buttons/headphones.png',
  people: '/icons/buttons/people.png',
  backpack: '/icons/buttons/backpack.png',
  camera: '/icons/buttons/camera.png',
  tent: '/icons/buttons/tent.png',
  question: '/icons/buttons/question.png',
  firstaid: '/icons/buttons/firstaid.png',
  music: '/icons/buttons/music.png',
  trophy: '/icons/buttons/trophy.png',
  chat: '/icons/buttons/chat.png',
  book: '/icons/buttons/book.png'
}

// Each icon gets a color family so the button itself is a vivid gradient
// pill matching its badge — colorful and fun, not a flat white card.
const iconColor = {
  map: 'turquoise',
  headphones: 'coral',
  people: 'sun',
  backpack: 'purple',
  camera: 'orange',
  tent: 'tropical',
  question: 'sun',
  firstaid: 'coral',
  music: 'turquoise',
  trophy: 'coral',
  chat: 'sun',
  book: 'tropical'
}

const gradients = {
  turquoise: 'from-turquoise-400 to-turquoise-600',
  coral: 'from-coral-400 to-coral-600',
  sun: 'from-sun-400 to-sun-600',
  purple: 'from-purple-400 to-purple-600',
  orange: 'from-orange-400 to-orange-600',
  tropical: 'from-tropical-400 to-tropical-600',
  pool: 'from-pool-400 to-pool-600'
}

const shadowColor = {
  turquoise: 'shadow-[0_6px_18px_-4px_rgba(13,148,136,0.55)]',
  coral: 'shadow-[0_6px_18px_-4px_rgba(232,72,47,0.55)]',
  sun: 'shadow-[0_6px_18px_-4px_rgba(245,163,0,0.55)]',
  purple: 'shadow-[0_6px_18px_-4px_rgba(124,63,212,0.55)]',
  orange: 'shadow-[0_6px_18px_-4px_rgba(255,122,26,0.55)]',
  tropical: 'shadow-[0_6px_18px_-4px_rgba(31,158,87,0.55)]',
  pool: 'shadow-[0_6px_18px_-4px_rgba(10,79,102,0.55)]'
}

/**
 * The single button style used across the whole app: a vivid glossy
 * gradient pill (colored per section) with a real icon badge inset on a
 * white disc for contrast, bold playful title, and a chevron. Fun but
 * clean — icon, text, and chevron always share the same baseline grid.
 */
export default function BigButton({
  children,
  icon,
  to,
  onClick,
  subtitle,
  color,
  className = ''
}) {
  const Comp = to ? Link : 'button'
  const iconSrc = iconFiles[icon]
  const resolvedColor = color || iconColor[icon] || 'pool'

  return (
    <motion.div whileTap={{ scale: 0.97 }} className="w-full">
      <Comp
        to={to}
        onClick={onClick}
        className={`w-full flex items-center gap-3.5 rounded-full pl-2.5 pr-5 py-2.5 bg-gradient-to-br ${gradients[resolvedColor]} ${shadowColor[resolvedColor]} text-left ${className}`}
      >
        {iconSrc ? (
          <span className="w-12 h-12 shrink-0 rounded-full bg-white flex items-center justify-center p-1 shadow-inner">
            <img src={iconSrc} alt="" className="w-full h-full object-contain rounded-full" aria-hidden="true" />
          </span>
        ) : icon ? (
          <span className="w-12 h-12 shrink-0 rounded-full bg-white/25 flex items-center justify-center text-2xl" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <span className="flex-1 min-w-0">
          <span className="block font-display font-semibold text-[17px] leading-snug text-white drop-shadow-sm">
            {children}
          </span>
          {subtitle && (
            <span className="block font-body text-[11.5px] leading-tight text-white/85 mt-0.5">
              {subtitle}
            </span>
          )}
        </span>
        <span className="text-2xl text-white/75 font-bold shrink-0" aria-hidden="true">›</span>
      </Comp>
    </motion.div>
  )
}
