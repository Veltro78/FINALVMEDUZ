import { createPortal } from 'react-dom'

/**
 * Renders children directly onto document.body via a React portal.
 *
 * Why this exists: PageShell's page-transition animation (Framer Motion)
 * animates y/scale/blur, which applies a CSS `transform` to the page
 * container. A `transform` on an ancestor creates a new containing block
 * for any `position: fixed` descendant — so a "fixed" modal nested inside
 * an animated page ends up positioned relative to that page's scrollable
 * content instead of the actual viewport, which is why it could appear
 * off-screen until you scrolled. Portaling to <body> sidesteps this
 * entirely. Use this for any full-screen fixed overlay (modals, lightboxes,
 * popups) rendered from inside a page.
 */
export default function Portal({ children }) {
  return createPortal(children, document.body)
}
