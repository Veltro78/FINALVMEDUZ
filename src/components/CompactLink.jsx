import { Link } from 'react-router-dom'

/**
 * A quiet, compact row — for reference/secondary content (FAQ, Dictionnaire,
 * old photo dumps, etc.) that should still be reachable but shouldn't
 * compete visually with the featured cards.
 */
export default function CompactLink({ to, emoji, children }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 bg-white/8 active:bg-white/15 transition-colors"
    >
      <span className="text-base opacity-80 shrink-0">{emoji}</span>
      <span className="font-body text-white/75 text-[13px] flex-1">{children}</span>
      <span className="text-white/35 text-base shrink-0">›</span>
    </Link>
  )
}
