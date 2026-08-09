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
  }
}
