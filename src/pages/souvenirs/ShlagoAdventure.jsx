import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import PageShell from '../../components/PageShell.jsx'
import { sfx } from '../../utils/sfx.js'
import { levels } from '../../data/levels.js'
import { unlockAchievement, isUnlocked } from '../../utils/achievements.js'

const GRAVITY = 0.6
const JUMP_FORCE = -12
const MOVE_SPEED = 4
const CANVAS_W = 800
const CANVAS_H = 400
const GROUND_Y = 340

const palmXs = [120, 480, 900, 1350, 1750, 2150, 2550, 2900]
const tikiXs = [700, 1600, 2450]
const tentXs = [400, 1300, 2200, 3000]
const cloudXs = [200, 650, 1150, 1650, 2150, 2650, 3100]

function drawClouds(ctx, camX, opacity = 0.5) {
  ctx.fillStyle = `rgba(255,255,255,${opacity})`
  for (const cx of cloudXs) {
    const sx = cx - camX * 0.35
    if (sx < -80 || sx > CANVAS_W + 80) continue
    const sy = 70 + (cx % 3) * 18
    ctx.beginPath()
    ctx.ellipse(sx, sy, 26, 14, 0, 0, Math.PI * 2)
    ctx.ellipse(sx + 22, sy + 4, 20, 11, 0, 0, Math.PI * 2)
    ctx.ellipse(sx - 20, sy + 5, 18, 10, 0, 0, Math.PI * 2)
    ctx.fill()
  }
}

function drawGroundTexture(ctx, groundColor, level) {
  // brins d'herbe / motif décoratif le long du sol pour casser le plat
  ctx.fillStyle = 'rgba(255,255,255,0.18)'
  for (let x = 20; x < level.width; x += 34) {
    ctx.beginPath()
    ctx.moveTo(x, GROUND_Y)
    ctx.lineTo(x + 5, GROUND_Y - 9)
    ctx.lineTo(x + 10, GROUND_Y)
    ctx.closePath()
    ctx.fill()
  }
}

function drawDayDecor(ctx, camX) {
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
  for (const px of palmXs) {
    const sx = px - camX * 0.55
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
  ctx.strokeStyle = 'rgba(255,255,255,0.4)'
  ctx.lineWidth = 2
  ctx.beginPath()
  for (let x = 0 - camX * 0.85; x < CANVAS_W; x += 90) {
    ctx.moveTo(x, 20)
    ctx.quadraticCurveTo(x + 45, 45, x + 90, 20)
  }
  ctx.stroke()
}

function drawNightDecor(ctx, camX, t) {
  // cabine DJ silhouette lointaine
  const boothX = 1100 - camX * 0.3
  ctx.fillStyle = 'rgba(0,0,0,0.4)'
  ctx.fillRect(boothX - 40, GROUND_Y - 90, 80, 90)
  // lasers qui balaient
  const sweep = Math.sin(t / 500) * 200
  ctx.strokeStyle = 'rgba(184, 138, 240, 0.35)'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(boothX, GROUND_Y - 90)
  ctx.lineTo(boothX + sweep, 0)
  ctx.stroke()
  ctx.strokeStyle = 'rgba(255, 111, 125, 0.3)'
  ctx.beginPath()
  ctx.moveTo(boothX, GROUND_Y - 90)
  ctx.lineTo(boothX - sweep, 0)
  ctx.stroke()
  // strobes en haut d'écran
  const strobeOn = Math.floor(t / 150) % 4 === 0
  if (strobeOn) {
    ctx.fillStyle = 'rgba(255,255,255,0.12)'
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)
  }
  // silhouettes de foule
  for (const px of palmXs) {
    const sx = px - camX * 0.7
    if (sx < -40 || sx > CANVAS_W + 40) continue
    ctx.fillStyle = 'rgba(0,0,0,0.5)'
    ctx.beginPath()
    ctx.arc(sx, GROUND_Y - 20, 12, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillRect(sx - 8, GROUND_Y - 20, 16, 20)
  }
}

function drawMorningDecor(ctx, camX) {
  for (const tx of tentXs) {
    const sx = tx - camX * 0.7
    if (sx < -60 || sx > CANVAS_W + 60) continue
    ctx.fillStyle = 'rgba(255,255,255,0.25)'
    ctx.beginPath()
    ctx.moveTo(sx - 28, GROUND_Y - 5)
    ctx.lineTo(sx, GROUND_Y - 45)
    ctx.lineTo(sx + 28, GROUND_Y - 5)
    ctx.closePath()
    ctx.fill()
  }
  // mouettes
  for (const gx of [300, 900, 1600, 2300]) {
    const sx = gx - camX * 0.4
    if (sx < -40 || sx > CANVAS_W + 40) continue
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(sx - 8, 60)
    ctx.quadraticCurveTo(sx, 50, sx + 8, 60)
    ctx.stroke()
  }
  // gobelets qui traînent
  for (const cx of [500, 1400, 2600]) {
    const sx = cx - camX
    if (sx < -20 || sx > CANVAS_W + 20) continue
    ctx.fillStyle = 'rgba(255,255,255,0.4)'
    ctx.fillRect(sx - 5, GROUND_Y - 12, 10, 12)
  }
}

export default function ShlagoAdventure() {
  const canvasRef = useRef(null)
  const stateRef = useRef(null)
  const [levelIndex, setLevelIndex] = useState(null) // null = écran de sélection
  const [ui, setUi] = useState({ tokens: 0, status: 'playing' })
  const [resetKey, setResetKey] = useState(0)

  const level = levelIndex !== null ? levels[levelIndex] : null

  useEffect(() => {
    if (!level) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    canvas.width = CANVAS_W * dpr
    canvas.height = CANVAS_H * dpr
    ctx.scale(dpr, dpr)

    const state = {
      player: { x: level.startX, y: level.startY, w: 28, h: 34, vx: 0, vy: 0, onGround: false, facing: 1 },
      tokens: level.tokens.map((c) => ({ ...c, taken: false })),
      beers: level.beers.map((b) => ({ ...b, taken: false })),
      enemies: level.enemies.map((e) => ({ ...e, dir: 1 })),
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
      p.x = level.startX
      p.y = level.startY
      p.vx = 0
      p.vy = 0
      sfx.fail()
    }

    function update(t) {
      const p = state.player
      if (!state.won) {
        p.vx = state.keys.left ? -MOVE_SPEED : state.keys.right ? MOVE_SPEED : 0
        if (state.keys.left) p.facing = -1
        if (state.keys.right) p.facing = 1

        p.vy += GRAVITY
        if (p.vy > 15) p.vy = 15

        p.x += p.vx
        for (const pl of level.platforms) {
          if (rectsOverlap(p, pl)) {
            if (p.vx > 0) p.x = pl.x - p.w
            else if (p.vx < 0) p.x = pl.x + pl.w
          }
        }
        if (p.x < 0) p.x = 0

        p.y += p.vy
        p.onGround = false
        for (const pl of level.platforms) {
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

        if (p.y > CANVAS_H + 100) respawn()

        for (const en of state.enemies) {
          if (en.speed > 0) {
            en.x += en.speed * en.dir
            if (en.x < en.minX || en.x + en.w > en.maxX) en.dir *= -1
          }
          if (rectsOverlap(p, en)) respawn()
        }

        for (const c of state.tokens) {
          if (!c.taken && Math.abs(p.x + p.w / 2 - c.x) < 22 && Math.abs(p.y + p.h / 2 - c.y) < 22) {
            c.taken = true
            sfx.coin()
            setUi((u) => ({ ...u, tokens: u.tokens + 1 }))
            unlockAchievement('premier-jeton')
          }
        }
        for (const b of state.beers) {
          if (!b.taken && Math.abs(p.x + p.w / 2 - b.x) < 22 && Math.abs(p.y + p.h / 2 - b.y) < 22) {
            b.taken = true
            sfx.fanfare()
            setUi((u) => ({ ...u, tokens: u.tokens + 3 }))
          }
        }

        if (p.x + p.w >= level.flagX && !state.won) {
          state.won = true
          sfx.fanfare()
          setUi((u) => ({ ...u, status: 'won' }))
          if (level.id === 'camp') unlockAchievement('niveau-camp')
          if (level.id === 'rave') unlockAchievement('niveau-rave')
          if (level.id === 'comeback') unlockAchievement('niveau-comeback')
          if (['niveau-camp', 'niveau-rave', 'niveau-comeback'].every((id) => isUnlocked(id))) {
            unlockAchievement('legende-adventure')
          }
        }
      }

      const camX = Math.max(0, Math.min(p.x - CANVAS_W / 2, level.width - CANVAS_W))

      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_H)
      skyGrad.addColorStop(0, level.sky[0])
      skyGrad.addColorStop(1, level.sky[1])
      ctx.fillStyle = skyGrad
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

      ctx.fillStyle = level.sunColor
      ctx.beginPath()
      ctx.arc(680 - camX * 0.15, 55, 34, 0, Math.PI * 2)
      ctx.fill()

      if (level.decor === 'day') drawDayDecor(ctx, camX)
      else if (level.decor === 'night') drawNightDecor(ctx, camX, t || 0)
      else if (level.decor === 'morning') drawMorningDecor(ctx, camX)
      drawClouds(ctx, camX, level.decor === 'night' ? 0.15 : 0.5)

      ctx.save()
      ctx.translate(-camX, 0)

      for (const pl of level.platforms) {
        const isGround = pl.y === GROUND_Y
        ctx.fillStyle = isGround ? level.groundColor : level.platformColor
        ctx.beginPath()
        ctx.roundRect(pl.x, pl.y, pl.w, pl.h, isGround ? 0 : 10)
        ctx.fill()
        // ombre douce sous la plateforme
        ctx.fillStyle = 'rgba(0,0,0,0.15)'
        ctx.fillRect(pl.x, pl.y + pl.h - 4, pl.w, 4)
        // liseré brillant sur le dessus
        ctx.fillStyle = 'rgba(255,255,255,0.3)'
        ctx.fillRect(pl.x, pl.y, pl.w, 4)
      }
      drawGroundTexture(ctx, level.groundColor, level)

      const bob = Math.sin((t || 0) / 300) * 3 // léger flottement pour jetons/bières

      for (const c of state.tokens) {
        if (c.taken) continue
        const y = c.y + bob
        ctx.save()
        ctx.shadowColor = '#38c6e6'
        ctx.shadowBlur = 10
        ctx.fillStyle = '#5fd6f0'
        ctx.beginPath()
        ctx.moveTo(c.x, y - 11)
        ctx.lineTo(c.x + 10, y + 8)
        ctx.lineTo(c.x - 10, y + 8)
        ctx.closePath()
        ctx.fill()
        ctx.strokeStyle = '#0d6d63'
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.fillStyle = 'rgba(255,255,255,0.5)'
        ctx.beginPath()
        ctx.moveTo(c.x, y - 7)
        ctx.lineTo(c.x + 4, y + 2)
        ctx.lineTo(c.x - 4, y + 2)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }

      for (const b of state.beers) {
        if (b.taken) continue
        const y = b.y + bob * 0.6
        ctx.save()
        ctx.translate(b.x, y)
        ctx.rotate(Math.sin((t || 0) / 400) * 0.08)
        ctx.fillStyle = '#ffcf3f'
        ctx.fillRect(-9, -12, 16, 22)
        ctx.strokeStyle = '#f5a000'
        ctx.lineWidth = 2
        ctx.strokeRect(-9, -12, 16, 22)
        ctx.beginPath()
        ctx.arc(10, -1, 7, -Math.PI * 0.5, Math.PI * 0.5)
        ctx.stroke()
        ctx.fillStyle = '#fff'
        ctx.fillRect(-9, -12, 16, 5)
        // petites bulles de mousse
        ctx.fillStyle = 'rgba(255,255,255,0.8)'
        ctx.beginPath()
        ctx.arc(-3, -14, 2, 0, Math.PI * 2)
        ctx.arc(2, -15, 1.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      for (const en of state.enemies) {
        const bounceY = en.y + Math.abs(Math.sin((t || 0) / 200 + en.x)) * -3
        ctx.save()
        ctx.shadowColor = 'rgba(0,0,0,0.4)'
        ctx.shadowBlur = 6
        ctx.fillStyle = en.color
        ctx.beginPath()
        ctx.roundRect(en.x, bounceY, en.w, en.h, 9)
        ctx.fill()
        ctx.restore()
        // sourcils fâchés
        ctx.strokeStyle = '#08303f'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(en.x + 4, bounceY + 8)
        ctx.lineTo(en.x + 10, bounceY + 10)
        ctx.moveTo(en.x + en.w - 4, bounceY + 8)
        ctx.lineTo(en.x + en.w - 10, bounceY + 10)
        ctx.stroke()
        // yeux
        ctx.fillStyle = '#08303f'
        ctx.beginPath()
        ctx.arc(en.x + en.w / 2 - 4, bounceY + 13, 2.2, 0, Math.PI * 2)
        ctx.arc(en.x + en.w / 2 + 4, bounceY + 13, 2.2, 0, Math.PI * 2)
        ctx.fill()
        // bouche mécontente
        ctx.beginPath()
        ctx.arc(en.x + en.w / 2, bounceY + 24, 4, Math.PI, Math.PI * 2)
        ctx.stroke()
        ctx.fillStyle = '#fff'
        ctx.font = 'bold 10px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(en.label, en.x + en.w / 2, bounceY - 6)
      }

      ctx.fillStyle = '#e83a52'
      ctx.fillRect(level.flagX, GROUND_Y - 120, 6, 120)
      ctx.beginPath()
      ctx.moveTo(level.flagX + 6, GROUND_Y - 120)
      ctx.lineTo(level.flagX + 46, GROUND_Y - 105)
      ctx.lineTo(level.flagX + 6, GROUND_Y - 90)
      ctx.closePath()
      ctx.fill()

      // ombre au sol sous le joueur
      ctx.fillStyle = 'rgba(0,0,0,0.2)'
      ctx.beginPath()
      ctx.ellipse(p.x + p.w / 2, Math.min(p.y + p.h + 4, GROUND_Y + 2), 14, 4, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.save()
      ctx.translate(p.x + p.w / 2, p.y + p.h / 2)
      ctx.scale(p.facing, 1)

      // petites jambes qui pédalent quand ça marche
      const legSwing = p.onGround && p.vx !== 0 ? Math.sin((t || 0) / 60) * 6 : 0
      ctx.strokeStyle = '#0b4a5e'
      ctx.lineWidth = 4
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(-6, p.h / 2 - 2)
      ctx.lineTo(-6 + legSwing, p.h / 2 + 8)
      ctx.moveTo(6, p.h / 2 - 2)
      ctx.lineTo(6 - legSwing, p.h / 2 + 8)
      ctx.stroke()

      // corps
      const bodyGrad = ctx.createLinearGradient(0, -p.h / 2, 0, p.h / 2)
      bodyGrad.addColorStop(0, '#ff8a94')
      bodyGrad.addColorStop(1, '#e8485a')
      ctx.fillStyle = bodyGrad
      ctx.beginPath()
      ctx.roundRect(-p.w / 2, -p.h / 2, p.w, p.h, 10)
      ctx.fill()
      ctx.fillStyle = 'rgba(255,255,255,0.25)'
      ctx.beginPath()
      ctx.roundRect(-p.w / 2 + 3, -p.h / 2 + 3, p.w - 6, 6, 4)
      ctx.fill()

      // lunettes de soleil façon festival
      ctx.fillStyle = '#08303f'
      ctx.beginPath()
      ctx.roundRect(-2, -9, 11, 7, 3)
      ctx.fill()
      ctx.fillStyle = 'rgba(56,198,230,0.7)'
      ctx.beginPath()
      ctx.roundRect(0, -7.5, 7, 4, 2)
      ctx.fill()

      // sourire
      ctx.strokeStyle = '#08303f'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(2, 2, 4, 0.15 * Math.PI, 0.85 * Math.PI)
      ctx.stroke()

      ctx.restore()

      ctx.restore()

      state.raf = requestAnimationFrame(update)
    }

    state.raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(state.raf)
  }, [resetKey, level])

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
  function backToLevels() {
    setLevelIndex(null)
    setUi({ tokens: 0, status: 'playing' })
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

  if (levelIndex === null) {
    return (
      <PageShell title="Shlago Adventure" emoji="🎮">
        <p className="text-white/80 text-sm -mt-1 text-center">Choisis ton niveau.</p>
        <p className="text-sun-300 text-xs font-display font-bold text-center -mt-2 mb-1">
          🎯 Objectif : chope un max de jetons 🔷 avant le drapeau !
        </p>
        <div className="flex flex-col gap-3">
          {levels.map((lvl, i) => (
            <motion.button
              key={lvl.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setUi({ tokens: 0, status: 'playing' }); setLevelIndex(i) }}
              className="glass-card rounded-3xl p-4 flex items-center gap-3 text-left"
            >
              <span className="text-3xl">{lvl.emoji}</span>
              <span className="flex-1">
                <span className="block font-display font-bold text-white">{lvl.name}</span>
                <span className="block text-white/60 text-xs mt-0.5">{lvl.subtitle}</span>
              </span>
              <span className="text-2xl text-white/60">›</span>
            </motion.button>
          ))}
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell title={level.name} emoji={level.emoji}>
      <p className="text-white/80 text-sm -mt-1 text-center">
        Ramasse les jetons, évite les ennemis, rejoins le drapeau.
      </p>

      <div className="relative rounded-3xl overflow-hidden glass-card">
        <canvas ref={canvasRef} style={{ width: '100%', height: 'auto', display: 'block' }} />

        {ui.status === 'won' && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3">
            <p className="text-3xl">🏆</p>
            <p className="font-display font-extrabold text-white text-xl">Gagné !</p>
            <p className="text-white/80 text-sm">🔷 {ui.tokens} jetons récoltés</p>
            <div className="flex gap-2">
              <button
                onClick={restart}
                className="rounded-full bg-gradient-to-br from-coral-400 to-purple-600 px-5 py-2.5 font-display font-bold text-white text-sm"
              >
                Rejouer
              </button>
              <button
                onClick={backToLevels}
                className="rounded-full bg-white/15 px-5 py-2.5 font-display font-bold text-white text-sm"
              >
                Niveaux
              </button>
            </div>
          </div>
        )}

        <div className="absolute top-2 left-2 bg-black/50 backdrop-blur rounded-full px-3 py-1 text-white text-xs font-display font-bold">
          🔷 {ui.tokens}
        </div>
        <button
          onClick={backToLevels}
          className="absolute top-2 right-2 bg-black/50 backdrop-blur rounded-full w-7 h-7 flex items-center justify-center text-white text-xs"
        >
          ✕
        </button>
      </div>

      <div className="glass-card rounded-3xl px-5 py-4 mt-3 flex items-center justify-between gap-4">
        <div className="flex gap-3">
          <button
            onPointerDown={(e) => { e.preventDefault(); e.currentTarget.setPointerCapture(e.pointerId); setKey('left', true) }}
            onPointerUp={(e) => { e.preventDefault(); setKey('left', false) }}
            onPointerCancel={() => setKey('left', false)}
            onContextMenu={(e) => e.preventDefault()}
            style={{ touchAction: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none' }}
            className="w-16 h-16 rounded-2xl bg-white/12 flex items-center justify-center active:bg-white/25 active:scale-95 transition-all select-none"
            aria-label="Gauche"
          >
            <span
              className="block w-0 h-0 border-y-[11px] border-y-transparent border-r-[16px] border-r-white"
              style={{ marginRight: 3 }}
            />
          </button>
          <button
            onPointerDown={(e) => { e.preventDefault(); e.currentTarget.setPointerCapture(e.pointerId); setKey('right', true) }}
            onPointerUp={(e) => { e.preventDefault(); setKey('right', false) }}
            onPointerCancel={() => setKey('right', false)}
            onContextMenu={(e) => e.preventDefault()}
            style={{ touchAction: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none' }}
            className="w-16 h-16 rounded-2xl bg-white/12 flex items-center justify-center active:bg-white/25 active:scale-95 transition-all select-none"
            aria-label="Droite"
          >
            <span
              className="block w-0 h-0 border-y-[11px] border-y-transparent border-l-[16px] border-l-white"
              style={{ marginLeft: 3 }}
            />
          </button>
        </div>

        <button
          onPointerDown={(e) => { e.preventDefault(); jump() }}
          onContextMenu={(e) => e.preventDefault()}
          style={{ touchAction: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none' }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-turquoise-400 to-turquoise-600 flex items-center justify-center shadow-[0_8px_20px_-6px_rgba(13,148,136,0.7)] active:scale-90 transition-transform select-none"
          aria-label="Sauter"
        >
          <span
            className="block w-0 h-0 border-x-[13px] border-x-transparent border-b-[18px] border-b-white"
            style={{ marginBottom: 3 }}
          />
        </button>
      </div>

      <p className="text-white/50 text-xs text-center mt-3">
        Sur ordi : flèches pour bouger, espace pour sauter.
      </p>
    </PageShell>
  )
}
