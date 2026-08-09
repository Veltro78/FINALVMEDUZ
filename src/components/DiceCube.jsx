import { motion } from 'framer-motion'

const SIZE = 96
const HALF = SIZE / 2

// Motifs de points pour chaque face (grille 3x3, true = point visible)
const pipPatterns = {
  1: [[false, false, false], [false, true, false], [false, false, false]],
  2: [[true, false, false], [false, false, false], [false, false, true]],
  3: [[true, false, false], [false, true, false], [false, false, true]],
  4: [[true, false, true], [false, false, false], [true, false, true]],
  5: [[true, false, true], [false, true, false], [true, false, true]],
  6: [[true, false, true], [true, false, true], [true, false, true]]
}

function Face({ n, transform }) {
  return (
    <div
      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white to-slate-100 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8)] grid grid-cols-3 grid-rows-3 gap-1 p-3"
      style={{ transform, backfaceVisibility: 'hidden' }}
    >
      {pipPatterns[n].flat().map((on, i) => (
        <div key={i} className="flex items-center justify-center">
          {on && <span className="w-[14%] aspect-square rounded-full bg-pool-900" style={{ width: '55%', height: '55%' }} />}
        </div>
      ))}
    </div>
  )
}

/**
 * Real 3D die: six faces arranged in a cube via CSS transforms, tumbling
 * through multiple rotations when `rolling` is true.
 */
export default function DiceCube({ rolling, onClick }) {
  return (
    <div
      onClick={onClick}
      role="button"
      className="cursor-pointer"
      style={{ perspective: 700 }}
    >
      <motion.div
        className="relative"
        style={{ width: SIZE, height: SIZE, transformStyle: 'preserve-3d' }}
        animate={
          rolling
            ? { rotateX: [0, 360, 720, 1080], rotateY: [0, 540, 1080, 1440] }
            : { rotateX: 20, rotateY: -25 }
        }
        transition={rolling ? { duration: 0.9, ease: 'easeInOut' } : { duration: 0.5 }}
      >
        <Face n={1} transform={`translateZ(${HALF}px)`} />
        <Face n={6} transform={`rotateY(180deg) translateZ(${HALF}px)`} />
        <Face n={2} transform={`rotateY(90deg) translateZ(${HALF}px)`} />
        <Face n={5} transform={`rotateY(-90deg) translateZ(${HALF}px)`} />
        <Face n={3} transform={`rotateX(90deg) translateZ(${HALF}px)`} />
        <Face n={4} transform={`rotateX(-90deg) translateZ(${HALF}px)`} />
      </motion.div>
    </div>
  )
}
