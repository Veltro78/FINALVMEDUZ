let ctx = null
function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function tone({ freq = 440, duration = 0.15, type = 'sine', volume = 0.3, freqEnd = null, delay = 0 }) {
  const c = getCtx()
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, c.currentTime + delay)
  if (freqEnd) osc.frequency.exponentialRampToValueAtTime(freqEnd, c.currentTime + delay + duration)
  gain.gain.setValueAtTime(volume, c.currentTime + delay)
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + duration)
  osc.connect(gain)
  gain.connect(c.destination)
  osc.start(c.currentTime + delay)
  osc.stop(c.currentTime + delay + duration)
}

function noise({ duration = 0.2, volume = 0.2 }) {
  const c = getCtx()
  const bufferSize = c.sampleRate * duration
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
  const src = c.createBufferSource()
  src.buffer = buffer
  const gain = c.createGain()
  gain.gain.setValueAtTime(volume, c.currentTime)
  src.connect(gain)
  gain.connect(c.destination)
  src.start()
}

export const sfx = {
  click: () => tone({ freq: 700, duration: 0.06, type: 'square', volume: 0.15 }),
  boing: () => tone({ freq: 200, freqEnd: 600, duration: 0.25, type: 'sine', volume: 0.3 }),
  coin: () => {
    tone({ freq: 988, duration: 0.08, type: 'square', volume: 0.25 })
    tone({ freq: 1319, duration: 0.15, type: 'square', volume: 0.25, delay: 0.08 })
  },
  jump: () => tone({ freq: 300, freqEnd: 700, duration: 0.15, type: 'triangle', volume: 0.25 }),
  laser: () => tone({ freq: 1200, freqEnd: 80, duration: 0.2, type: 'sawtooth', volume: 0.2 }),
  honk: () => tone({ freq: 180, duration: 0.35, type: 'square', volume: 0.3 }),
  drum: () => noise({ duration: 0.15, volume: 0.4 }),
  fanfare: () => {
    ;[523, 659, 784, 1047].forEach((f, i) => tone({ freq: f, duration: 0.18, type: 'square', volume: 0.25, delay: i * 0.12 }))
  },
  fail: () => tone({ freq: 400, freqEnd: 100, duration: 0.4, type: 'sawtooth', volume: 0.25 }),
  ding: () => tone({ freq: 1500, duration: 0.12, type: 'sine', volume: 0.2 }),
  hardstyle: () => {
    tone({ freq: 60, duration: 0.12, type: 'square', volume: 0.4 })
    tone({ freq: 55, duration: 0.1, type: 'square', volume: 0.35, delay: 0.12 })
  },
  // ---------- Boîte à prout ----------
  proutCourt: () => tone({ freq: 110, freqEnd: 60, duration: 0.18, type: 'sawtooth', volume: 0.35 }),
  proutLong: () => tone({ freq: 90, freqEnd: 40, duration: 0.7, type: 'sawtooth', volume: 0.3 }),
  proutAigu: () => tone({ freq: 260, freqEnd: 90, duration: 0.3, type: 'square', volume: 0.28 }),
  proutGrave: () => tone({ freq: 55, freqEnd: 30, duration: 0.5, type: 'sawtooth', volume: 0.4 }),
  proutRafale: () => {
    ;[0, 0.12, 0.22, 0.3].forEach((d) => tone({ freq: 100 + Math.random() * 40, freqEnd: 50, duration: 0.1, type: 'sawtooth', volume: 0.3, delay: d }))
  },
  proutSqueak: () => tone({ freq: 400, freqEnd: 700, duration: 0.15, type: 'square', volume: 0.2 })
}

// 👉 Easter egg "Mode Rave" — joue /sounds/anthem.mp3 si le fichier existe
// (à toi de le déposer toi-même, voir README dans /public/sounds/), sinon
// retombe sur une boucle de kicks synthétisés pour ne jamais rien casser.
export function playAnthemOrFallback(durationMs = 10000) {
  const audio = new Audio('/sounds/anthem.mp3')
  let usedReal = false
  let fallbackInterval = null

  function startFallback() {
    if (usedReal || fallbackInterval) return
    fallbackInterval = setInterval(() => sfx.hardstyle(), 350)
  }

  audio.addEventListener('canplay', () => { usedReal = true })
  audio.addEventListener('error', startFallback)
  audio.play().then(() => { usedReal = true }).catch(startFallback)

  const stopTimer = setTimeout(() => {
    audio.pause()
    if (fallbackInterval) clearInterval(fallbackInterval)
  }, durationMs)

  // fonction de nettoyage si on veut couper plus tôt
  return () => {
    clearTimeout(stopTimer)
    audio.pause()
    if (fallbackInterval) clearInterval(fallbackInterval)
  }
}
