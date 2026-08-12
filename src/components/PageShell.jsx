import { motion } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'

// Softer, slightly slower motion so content eases in rather than snapping —
// staggered so title/logo settle just ahead of the body content. A subtle
// blur on enter/exit reads as more premium than a flat opacity cut.
const pageVariants = {
  initial: { opacity: 0, y: 18, scale: 0.99, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: 'blur(3px)',
    transition: { duration: 0.25, ease: 'easeIn' }
  }
}

const contentVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
}

const itemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
}

function NavBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/' || location.pathname === '/accueil'

  if (isHome) return null

  return (
    <motion.div
      className="flex items-center justify-between px-4 pt-3"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
    >
      <button
        onClick={() => navigate(-1)}
        className="glass-card flex items-center gap-1.5 rounded-full px-4 py-2 text-white font-display font-semibold text-sm active:scale-95 transition-transform"
      >
        <span aria-hidden="true">←</span> Retour
      </button>
      <Link
        to="/"
        className="glass-card flex items-center gap-1.5 rounded-full px-4 py-2 text-white font-display font-semibold text-sm active:scale-95 transition-transform"
      >
        🏠 Accueil
      </Link>
    </motion.div>
  )
}

/**
 * Wraps every page. The background itself lives in the persistent
 * <AppBackground> component so it crossfades independently of page
 * content — this shell only handles nav, title, and the content's own
 * gentle staggered entrance.
 */
export default function PageShell({
  children,
  title,
  emoji,
  showLogo = false,
  logoSize = 'sm',
  onLogoLongPress
}) {
  const longPressTimer = { current: null }
  function startPress() {
    if (!onLogoLongPress) return
    longPressTimer.current = setTimeout(onLogoLongPress, 1500)
  }
  function cancelPress() {
    if (longPressTimer.current) clearTimeout(longPressTimer.current)
  }

  return (
    <div className="app-shell flex flex-col">
      <NavBar />

      <motion.main
        className="flex-1 flex flex-col px-4 pb-8 pt-4 max-w-md mx-auto w-full"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {showLogo && (
          <div
            className="mb-4 mt-1"
            onPointerDown={startPress}
            onPointerUp={cancelPress}
            onPointerLeave={cancelPress}
          >
            <Logo size={logoSize} />
          </div>
        )}

        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-display font-extrabold text-2xl sm:text-3xl text-white text-outline mb-4 flex items-center gap-2"
          >
            {emoji && <span aria-hidden="true">{emoji}</span>} {title}
          </motion.h2>
        )}

        <motion.div
          className="flex-1 flex flex-col gap-3"
          variants={contentVariants}
          initial="initial"
          animate="animate"
        >
          {Array.isArray(children)
            ? children.map((child, i) => (
                <motion.div key={i} variants={itemVariants}>
                  {child}
                </motion.div>
              ))
            : children}
        </motion.div>
      </motion.main>

      <footer className="text-center pb-4 pt-2">
        <span className="text-white/70 text-xs font-body">Made with ❤️ by Shlagos</span>
      </footer>
    </div>
  )
}
