import { useEffect, useRef, useState } from 'react'
import PageShell from '../../components/PageShell.jsx'
import { sfx } from '../../utils/sfx.js'

const GRAVITY = 0.6
const JUMP_FORCE = -12
const MOVE_SPEED = 4
const CANVAS_W = 800
const CANVAS_H = 400
const GROUND_Y = 340

// Niveau : plateformes, jetons (triangles bleus), bonus bières, ennemis
// (private jokes des Shlagos), drapeau d'arrivée.
const LEVEL_WIDTH = 3200
const platforms = [
  { x: 0, y: GROUND_Y, w: LEVEL_WIDTH, h: 60 }, // sol
  { x: 300, y: 260, w: 140, h: 20 },
  { x: 520, y: 200, w: 120, h: 20 },
  { x: 720, y: 280, w: 100, h: 20 },
  { x: 950, y: 220, w: 140, h: 20 },
  { x: 1200, y: 300, w: 100, h: 20 },
  { x: 1400, y: 240, w: 120, h: 20 },
  { x: 1650, y: 180, w: 100, h: 20 },
  { x: 1900, y: 260, w: 160, h: 20 },
  { x: 2150, y: 200, w: 100, h: 20 },
  { x: 2400, y: 280, w: 140, h: 20 },
  { x: 2650, y: 220, w: 120, h: 20 },
  { x: 2900, y: 300, w: 200, h: 20 }
]
const tokensInit = [
  { x: 350, y: 220 }, { x: 560, y: 160 }, { x: 760, y: 240 },
  { x: 1000, y: 180 }, { x: 1240, y: 260 }, { x: 1440, y: 200 },
  { x: 1690, y: 140 }, { x: 1960, y: 220 }, { x: 2190, y: 160 },
  { x: 2450, y: 240 }, { x: 2690, y: 180 }, { x: 2950, y: 260 },
  { x: 3050, y: 260 }
]
// Bonus bières (3 points au lieu d'1), placées un peu proches des ennemis
// pour un vrai risque/récompense.
const beersInit = [
  { x: 640, y: 290 }, { x: 2050, y: 290 }, { x: 2760, y: 190 }
]
// Ennemis = private jokes du groupe. Simple patrouille gauche-droite,
// contact = respawn (façon "il te prend la tête / il te suit partout").
const enemiesInit = [
  { id: 'bengal', label: 'Bengal', x: 610, y: GROUND_Y - 34, w: 26, h: 34, minX: 560, maxX: 780, speed: 2.6, dir: 1, color: '#f5a000' },
  { id: 'mathieu', label: 'Mathieu', x: 1320, y: GROUND_Y - 34, w: 28, h: 34, minX: 1320, maxX: 1320, speed: 0, dir: 1, color: '#e83a52' },
  { id: 'gob', label: 'Gob', x: 2000, y: GROUND_Y - 34, w: 26, h: 34, minX: 1900, maxX: 2220, speed: 3.4, dir: 1, color: '#1f9e57' }
]
const FLAG_X = 3120
const START_X = 40
const START_Y = 250

// Décors de fond en parallax (dessinés avant la translation caméra pour
// donner une impression de profondeur — festival oblige : palmiers,
// grande roue, guirlandes, tentes).
const palmXs = [120, 480, 900, 1350, 1750, 2150, 2550, 2900]
const tikiXs = [700, 1600, 2450]

export default function ShlagoAdventure() {
  const canvasRef = useRef(null)
  const stateRef = useRef(null)
  const [ui, setUi] = useState({ tokens: 0, status: 'playing' }) // playing | won
  const [resetKey, setResetKey] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    canvas.width = CANVAS_W * dpr
    canvas.height = CANVAS_H * dpr
    ctx.scale(dpr, dpr)

    const state = {
      player: { x: START_X, y: START_Y, w: 28, h: 34, vx: 0, vy: 0, onGround: false, facing: 1 },
      tokens: tokensInit.map((c) => ({ ...c, taken: false })),
      beers: beersInit.map((b) => ({ ...b, taken: false })),
      enemies: enemiesInit.map((e) => ({ ...e })),
      keys: { left: false, right: false },
      won: false,
      raf: null
    }
    stateRef.current = state

    function rectsOverlap(a, b) {
      return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
    }

    function respawn() {
      const p = state.player
      p.x = START_X
      p.y = START_Y
      p.vx = 0
      p.vy = 0
      sfx.fail()
    }

    function update() {
      const p = state.player
      if (!state.won) {
        p.vx = state.keys.left ? -MOVE_SPEED : state.keys.right ? MOVE_SPEED : 0
        if (state.keys.left) p.facing = -1
        if (state.keys.right) p.facing = 1

        p.vy += GRAVITY
        if (p.vy > 15) p.vy = 15

        // mouvement X + collisions plateformes
        p.x += p.vx
        for (const pl of platforms) {
          if (rectsOverlap(p, pl)) {
            if (p.vx > 0) p.x = pl.x - p.w
            else if (p.vx < 0) p.x = pl.x + pl.w
          }
        }
        if (p.x < 0) p.x = 0

        // mouvement Y + collisions plateformes
        p.y += p.vy
        p.onGround = false
        for (const pl of platforms) {
          if (rectsOverlap(p, pl)) {
            if (p.vy > 0) {
              p.y = pl.y - p.h
              p.vy = 0
              p.onGround = true
            } else if (p.vy < 0) {
              p.y = pl.y + pl.h
              p.vy = 0
            }
          }
        }

        // chute dans le vide -> respawn
        if (p.y > CANVAS_H + 100) respawn()

        // ennemis : patrouille + collision
        for (const en of state.enemies) {
          if (en.speed > 0) {
            en.x += en.speed * en.dir
            if (en.x < en.minX || en.x + en.w > en.maxX) en.dir *= -1
          }
          if (rectsOverlap(p, en)) respawn()
        }

        // jetons
        for (const c of state.tokens) {
          if (!c.taken && Math.abs(p.x + p.w / 2 - c.x) < 22 && Math.abs(p.y + p.h / 2 - c.y) < 22) {
            c.taken = true
            sfx.coin()
            setUi((u) => ({ ...u, tokens: u.tokens + 1 }))
          }
        }
        // bières bonus
        for (const b of state.beers) {
          if (!b.taken && Math.abs(p.x + p.w / 2 - b.x) < 22 && Math.abs(p.y + p.h / 2 - b.y) < 22) {
            b.taken = true
            sfx.fanfare()
            setUi((u) => ({ ...u, tokens: u.tokens + 3 }))
          }
        }

        // drapeau
        if (p.x + p.w >= FLAG_X && !state.won) {
          state.won = true
          sfx.fanfare()
          setUi((u) => ({ ...u, status: 'won' }))
        }
      }

      // caméra
      const camX = Math.max(0, Math.min(p.x - CANVAS_W / 2, LEVEL_WIDTH - CANVAS_W))

      // ---------- rendu ----------
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_H)
      skyGrad.addColorStop(0, '#38c6e6')
      skyGrad.addColorStop(1, '#0c6584')
      ctx.fillStyle = skyGrad
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

      // soleil
      ctx.fillStyle = '#ffcf3f'
      ctx.beginPath()
      ctx.arc(680 - camX * 0.15, 55, 34, 0, Math.PI * 2)
      ctx.fill()

      // grande roue en arrière-plan lointain (parallax léger)
      const wheelX = 1500 - camX * 0.25
      ctx.strokeStyle = 'rgba(255,255,255,0.35)'
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.arc(wheelX, 140, 70, 0, Math.PI * 2)
      ctx.stroke()
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2
        ctx.beginPath()
        ctx.moveTo(wheelX, 140)
        ctx.lineTo(wheelX + Math.cos(a) * 70, 140 + Math.sin(a) * 70)
        ctx.stroke()
      }

      // palmiers en parallax moyen
      const palmParallax = 0.55
      for (const px of palmXs) {
        const sx = px - camX * palmParallax
        if (sx < -60 || sx > CANVAS_W + 60) continue
        ctx.fillStyle = '#5c3419'
        ctx.fillRect(sx - 4, GROUND_Y - 70, 8, 70)
        ctx.fillStyle = '#1f9e57'
        for (let i = 0; i < 5; i++) {
          const a = (i / 4) * Math.PI * 0.9 - Math.PI * 0.45
          ctx.beginPath()
          ctx.ellipse(sx + Math.cos(a) * 22, GROUND_Y - 70 + Math.sin(a) * 14 - 10, 22, 9, a, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // tiki huts en parallax proche
      for (const tx of tikiXs) {
        const sx = tx - camX * 0.85
        if (sx < -60 || sx > CANVAS_W + 60) continue
        ctx.fillStyle = '#7a4a26'
        ctx.beginPath()
        ctx.moveTo(sx - 34, GROUND_Y - 40)
        ctx.lineTo(sx, GROUND_Y - 85)
        ctx.lineTo(sx + 34, GROUND_Y - 40)
        ctx.closePath()
        ctx.fill()
        ctx.fillStyle = 'rgba(0,0,0,0.15)'
        ctx.fillRect(sx - 26, GROUND_Y - 40, 52, 40)
      }

      // guirlandes lumineuses
      ctx.strokeStyle = 'rgba(255,255,255,0.4)'
      ctx.lineWidth = 2
      ctx.beginPath()
      for (let x = 0 - camX * 0.85; x < CANVAS_W; x += 90) {
        ctx.moveTo(x, 20)
        ctx.quadraticCurveTo(x + 45, 45, x + 90, 20)
      }
      ctx.stroke()

      ctx.save()
      ctx.translate(-camX, 0)

      // plateformes
      for (const pl of platforms) {
        ctx.fillStyle = pl.y === GROUND_Y ? '#149457' : '#7c3fd4'
        ctx.beginPath()
        ctx.roundRect(pl.x, pl.y, pl.w, pl.h, 8)
        ctx.fill()
        ctx.fillStyle = 'rgba(255,255,255,0.25)'
        ctx.fillRect(pl.x, pl.y, pl.w, 4)
      }

      // jetons — triangles bleus (jetons cashless du festival)
      for (const c of state.tokens) {
        if (c.taken) continue
        ctx.fillStyle = '#38c6e6'
        ctx.beginPath()
        ctx.moveTo(c.x, c.y - 11)
        ctx.lineTo(c.x + 10, c.y + 8)
        ctx.lineTo(c.x - 10, c.y + 8)
        ctx.closePath()
        ctx.fill()
        ctx.strokeStyle = '#0d6d63'
        ctx.lineWidth = 2
        ctx.stroke()
      }

      // bières bonus
      for (const b of state.beers) {
        if (b.taken) continue
        ctx.fillStyle = '#ffcf3f'
        ctx.fillRect(b.x - 9, b.y - 12, 16, 22)
        ctx.strokeStyle = '#f5a000'
        ctx.lineWidth = 2
        ctx.strokeRect(b.x - 9, b.y - 12, 16, 22)
        ctx.strokeStyle = '#f5a000'
        ctx.beginPath()
        ctx.arc(b.x + 10, b.y - 1, 7, -Math.PI * 0.5, Math.PI * 0.5)
        ctx.stroke()
        ctx.fillStyle = '#fff'
        ctx.fillRect(b.x - 9, b.y - 12, 16, 5)
      }

      // ennemis (private jokes)
      for (const en of state.enemies) {
        ctx.fillStyle = en.color
        ctx.beginPath()
        ctx.roundRect(en.x, en.y, en.w, en.h, 8)
        ctx.fill()
        ctx.fillStyle = '#08303f'
        ctx.beginPath()
        ctx.arc(en.x + en.w / 2 - 4, en.y + 10, 2.2, 0, Math.PI * 2)
        ctx.arc(en.x + en.w / 2 + 4, en.y + 10, 2.2, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#fff'
        ctx.font = 'bold 10px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(en.label, en.x + en.w / 2, en.y - 6)
      }

      // drapeau
      ctx.fillStyle = '#e83a52'
      ctx.fillRect(FLAG_X, GROUND_Y - 120, 6, 120)
      ctx.beginPath()
      ctx.moveTo(FLAG_X + 6, GROUND_Y - 120)
      ctx.lineTo(FLAG_X + 46, GROUND_Y - 105)
      ctx.lineTo(FLAG_X + 6, GROUND_Y - 90)
      ctx.closePath()
      ctx.fill()

      // joueur (petit Shlago rond)
      ctx.save()
      ctx.translate(p.x + p.w / 2, p.y + p.h / 2)
      ctx.scale(p.facing, 1)
      ctx.fillStyle = '#ff6f7d'
      ctx.beginPath()
      ctx.roundRect(-p.w / 2, -p.h / 2, p.w, p.h, 10)
      ctx.fill()
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.arc(4, -6, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#08303f'
      ctx.beginPath()
      ctx.arc(6, -6, 2.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      ctx.restore()

      state.raf = requestAnimationFrame(update)
    }

    state.raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(state.raf)
  }, [resetKey])

  function setKey(key, val) {
    if (stateRef.current) stateRef.current.keys[key] = val
  }
  function jump() {
    const p = stateRef.current?.player
    if (p && p.onGround) {
      p.vy = JUMP_FORCE
      p.onGround = false
      sfx.jump()
    }
  }
  function restart() {
    setUi({ tokens: 0, status: 'playing' })
    setResetKey((k) => k + 1)
  }

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'ArrowLeft') setKey('left', true)
      if (e.key === 'ArrowRight') setKey('right', true)
      if (e.key === ' ' || e.key === 'ArrowUp') jump()
    }
    function onKeyUp(e) {
      if (e.key === 'ArrowLeft') setKey('left', false)
      if (e.key === 'ArrowRight') setKey('right', false)
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  return (
    <PageShell title="Shlago Adventure" emoji="🎮">
      <p className="text-white/80 text-sm -mt-1 text-center">
        Ramasse les jetons, évite Bengal/Mathieu/Gob, rejoins le drapeau.
      </p>

      <div className="relative rounded-3xl overflow-hidden glass-card">
        <canvas ref={canvasRef} style={{ width: '100%', height: 'auto', display: 'block' }} />

        {ui.status === 'won' && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3">
            <p className="text-3xl">🏆</p>
            <p className="font-display font-extrabold text-white text-xl">Gagné !</p>
            <p className="text-white/80 text-sm">🔷 {ui.tokens} jetons récoltés</p>
            <button
              onClick={restart}
              className="rounded-full bg-gradient-to-br from-coral-400 to-purple-600 px-6 py-2.5 font-display font-bold text-white"
            >
              Rejouer
            </button>
          </div>
        )}

        <div className="absolute top-2 left-2 bg-black/50 backdrop-blur rounded-full px-3 py-1 text-white text-xs font-display font-bold">
          🔷 {ui.tokens}
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex gap-2">
          <button
            onTouchStart={(e) => { e.preventDefault(); setKey('left', true) }}
            onTouchEnd={(e) => { e.preventDefault(); setKey('left', false) }}
            onMouseDown={() => setKey('left', true)}
            onMouseUp={() => setKey('left', false)}
            onMouseLeave={() => setKey('left', false)}
            className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-2xl text-white active:bg-white/30 select-none"
          >
            ◀
          </button>
          <button
            onTouchStart={(e) => { e.preventDefault(); setKey('right', true) }}
            onTouchEnd={(e) => { e.preventDefault(); setKey('right', false) }}
            onMouseDown={() => setKey('right', true)}
            onMouseUp={() => setKey('right', false)}
            onMouseLeave={() => setKey('right', false)}
            className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-2xl text-white active:bg-white/30 select-none"
          >
            ▶
          </button>
        </div>
        <button
          onTouchStart={(e) => { e.preventDefault(); jump() }}
          onClick={jump}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-turquoise-400 to-turquoise-600 flex items-center justify-center text-2xl text-white active:scale-90 transition-transform select-none"
        >
          ⬆
        </button>
      </div>

      <p className="text-white/50 text-xs text-center mt-3">
        Sur ordi : flèches pour bouger, espace pour sauter.
      </p>
    </PageShell>
  )
}
