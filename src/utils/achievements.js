const KEY = 'shlagos-achievements-v1'

function readSet() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

function writeSet(set) {
  try {
    localStorage.setItem(KEY, JSON.stringify([...set]))
  } catch {
    // ignore
  }
}

export function unlockAchievement(id) {
  const set = readSet()
  if (set.has(id)) return false // déjà débloqué
  set.add(id)
  writeSet(set)
  window.dispatchEvent(new CustomEvent('shlagos-achievement-unlocked', { detail: id }))
  return true
}

export function isUnlocked(id) {
  return readSet().has(id)
}

export function getUnlockedIds() {
  return readSet()
}
