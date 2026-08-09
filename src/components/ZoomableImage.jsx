import { useRef, useState, useCallback } from 'react'

/**
 * A real pinch-to-zoom + pan + double-tap image viewer, built on the
 * Pointer Events API (works for touch on iOS Safari). No dependency.
 *
 * - One finger drag pans (once zoomed in).
 * - Two fingers pinch to zoom, anchored on the pinch midpoint.
 * - Double-tap toggles between fit and 2.5x zoom, anchored on the tap.
 */
export default function ZoomableImage({ src, alt }) {
  const containerRef = useRef(null)
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 })
  const pointers = useRef(new Map())
  const gesture = useRef(null) // { mode: 'pan' | 'pinch', ... }
  const lastTap = useRef(0)

  const clamp = useCallback((t) => {
    const el = containerRef.current
    if (!el) return t
    const rect = el.getBoundingClientRect()
    const scale = Math.min(Math.max(t.scale, 1), 5)
    // keep the image from being dragged fully off-screen
    const maxX = (rect.width * (scale - 1)) / 2
    const maxY = (rect.height * (scale - 1)) / 2
    return {
      scale,
      x: Math.min(Math.max(t.x, -maxX), maxX),
      y: Math.min(Math.max(t.y, -maxY), maxY)
    }
  }, [])

  const resetIfIdentity = useCallback((t) => {
    if (t.scale <= 1.02) return { scale: 1, x: 0, y: 0 }
    return t
  }, [])

  function onPointerDown(e) {
    containerRef.current?.setPointerCapture(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (pointers.current.size === 1) {
      const now = Date.now()
      if (now - lastTap.current < 280) {
        // double-tap
        setTransform((t) => (t.scale > 1 ? { scale: 1, x: 0, y: 0 } : clamp({ scale: 2.5, x: 0, y: 0 })))
        lastTap.current = 0
        gesture.current = null
        return
      }
      lastTap.current = now
      gesture.current = { mode: 'pan', startX: e.clientX, startY: e.clientY, origin: transform }
    } else if (pointers.current.size === 2) {
      const pts = [...pointers.current.values()]
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y)
      gesture.current = { mode: 'pinch', startDist: dist, origin: transform }
    }
  }

  function onPointerMove(e) {
    if (!pointers.current.has(e.pointerId)) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    const g = gesture.current
    if (!g) return

    if (g.mode === 'pan' && pointers.current.size === 1) {
      if (transform.scale <= 1) return
      const dx = e.clientX - g.startX
      const dy = e.clientY - g.startY
      setTransform(clamp({ ...g.origin, x: g.origin.x + dx, y: g.origin.y + dy }))
    } else if (g.mode === 'pinch' && pointers.current.size === 2) {
      const pts = [...pointers.current.values()]
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y)
      const ratio = dist / g.startDist
      setTransform(clamp({ ...g.origin, scale: g.origin.scale * ratio }))
    }
  }

  function onPointerUp(e) {
    pointers.current.delete(e.pointerId)
    if (pointers.current.size === 0) {
      setTransform((t) => resetIfIdentity(t))
      gesture.current = null
    } else if (pointers.current.size === 1) {
      const [[, p]] = pointers.current
      gesture.current = { mode: 'pan', startX: p.x, startY: p.y, origin: transform }
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[3/4] overflow-hidden rounded-3xl glass-card touch-none select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="w-full h-full object-contain"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transition: gesture.current ? 'none' : 'transform 0.2s ease-out'
        }}
      />
      {transform.scale <= 1 && (
        <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none">
          <span className="text-[11px] text-white/80 bg-black/30 rounded-full px-3 py-1">
            Pince pour zoomer · Double-tap pour agrandir
          </span>
        </div>
      )}
    </div>
  )
}
