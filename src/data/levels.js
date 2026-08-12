const GROUND_Y = 340

// Chaque niveau est indépendant : ses propres plateformes, jetons, bonus
// bières, ennemis (private jokes), décors et palette de couleurs.
export const levels = [
  {
    id: 'camp',
    name: 'Le Camp',
    subtitle: 'Jour · Facile',
    emoji: '🏕️',
    width: 3200,
    flagX: 3120,
    startX: 40,
    startY: 250,
    sky: ['#38c6e6', '#0c6584'],
    sunColor: '#ffcf3f',
    groundColor: '#149457',
    platformColor: '#7c3fd4',
    platforms: [
      { x: 0, y: GROUND_Y, w: 3200, h: 60 },
      { x: 300, y: 260, w: 140, h: 20 }, { x: 520, y: 200, w: 120, h: 20 },
      { x: 720, y: 280, w: 100, h: 20 }, { x: 950, y: 220, w: 140, h: 20 },
      { x: 1200, y: 300, w: 100, h: 20 }, { x: 1400, y: 240, w: 120, h: 20 },
      { x: 1650, y: 180, w: 100, h: 20 }, { x: 1900, y: 260, w: 160, h: 20 },
      { x: 2150, y: 200, w: 100, h: 20 }, { x: 2400, y: 280, w: 140, h: 20 },
      { x: 2650, y: 220, w: 120, h: 20 }, { x: 2900, y: 300, w: 200, h: 20 }
    ],
    tokens: [
      { x: 350, y: 220 }, { x: 560, y: 160 }, { x: 760, y: 240 }, { x: 1000, y: 180 },
      { x: 1240, y: 260 }, { x: 1440, y: 200 }, { x: 1690, y: 140 }, { x: 1960, y: 220 },
      { x: 2190, y: 160 }, { x: 2450, y: 240 }, { x: 2690, y: 180 }, { x: 2950, y: 260 }, { x: 3050, y: 260 }
    ],
    beers: [{ x: 640, y: 290 }, { x: 2050, y: 290 }, { x: 2760, y: 190 }],
    enemies: [
      { id: 'bengal', label: 'Bengal', x: 610, y: GROUND_Y - 34, w: 26, h: 34, minX: 560, maxX: 780, speed: 2.6, color: '#f5a000' },
      { id: 'mathieu', label: 'Mathieu', x: 1320, y: GROUND_Y - 34, w: 28, h: 34, minX: 1320, maxX: 1320, speed: 0, color: '#e83a52' },
      { id: 'gob', label: 'Gob', x: 2000, y: GROUND_Y - 34, w: 26, h: 34, minX: 1900, maxX: 2220, speed: 3.4, color: '#1f9e57' }
    ],
    decor: 'day' // palmiers, grande roue, tiki huts, guirlandes
  },
  {
    id: 'rave',
    name: 'La Rave de Nuit',
    subtitle: 'Nuit · Moyen',
    emoji: '🌙',
    width: 2800,
    flagX: 2720,
    startX: 40,
    startY: 250,
    sky: ['#2a1550', '#120826'],
    sunColor: '#c9a8ff',
    groundColor: '#3d1a5c',
    platformColor: '#e83a52',
    platforms: [
      { x: 0, y: GROUND_Y, w: 2800, h: 60 },
      { x: 260, y: 250, w: 110, h: 20 }, { x: 450, y: 190, w: 100, h: 20 },
      { x: 640, y: 260, w: 130, h: 20 }, { x: 860, y: 200, w: 100, h: 20 },
      { x: 1060, y: 150, w: 100, h: 20 }, { x: 1280, y: 220, w: 120, h: 20 },
      { x: 1500, y: 280, w: 100, h: 20 }, { x: 1700, y: 190, w: 140, h: 20 },
      { x: 1950, y: 240, w: 100, h: 20 }, { x: 2150, y: 170, w: 120, h: 20 },
      { x: 2400, y: 260, w: 160, h: 20 }
    ],
    tokens: [
      { x: 300, y: 210 }, { x: 490, y: 150 }, { x: 680, y: 220 }, { x: 900, y: 160 },
      { x: 1100, y: 110 }, { x: 1320, y: 180 }, { x: 1540, y: 240 }, { x: 1750, y: 150 },
      { x: 1990, y: 200 }, { x: 2190, y: 130 }, { x: 2440, y: 220 }, { x: 2560, y: 220 }
    ],
    beers: [{ x: 700, y: 290 }, { x: 1550, y: 290 }, { x: 2200, y: 290 }],
    enemies: [
      { id: 'ryfu', label: 'Ryfu', x: 500, y: GROUND_Y - 34, w: 26, h: 34, minX: 440, maxX: 700, speed: 3.6, color: '#7c3fd4' },
      { id: 'baby', label: 'Baby Shlagos', x: 1300, y: GROUND_Y - 34, w: 30, h: 34, minX: 1300, maxX: 1300, speed: 0, color: '#ff7a1a' },
      { id: 'leo', label: 'Leo', x: 1900, y: GROUND_Y - 34, w: 26, h: 34, minX: 1820, maxX: 2050, speed: 2.8, color: '#0d9488' }
    ],
    decor: 'night' // lasers, strobes, DJ booth
  },
  {
    id: 'comeback',
    name: 'Le Comeback',
    subtitle: 'Lendemain · Difficile',
    emoji: '🥵',
    width: 3400,
    flagX: 3320,
    startX: 40,
    startY: 250,
    sky: ['#ffb37a', '#e8617a'],
    sunColor: '#fff2c9',
    groundColor: '#c9762f',
    platformColor: '#0d6d63',
    platforms: [
      { x: 0, y: GROUND_Y, w: 3400, h: 60 },
      { x: 260, y: 260, w: 100, h: 20 }, { x: 440, y: 210, w: 90, h: 20 },
      { x: 620, y: 260, w: 90, h: 20 }, { x: 800, y: 200, w: 100, h: 20 },
      { x: 1000, y: 260, w: 90, h: 20 }, { x: 1180, y: 190, w: 90, h: 20 },
      { x: 1360, y: 240, w: 90, h: 20 }, { x: 1540, y: 170, w: 90, h: 20 },
      { x: 1720, y: 230, w: 90, h: 20 }, { x: 1900, y: 160, w: 90, h: 20 },
      { x: 2080, y: 220, w: 90, h: 20 }, { x: 2260, y: 280, w: 90, h: 20 },
      { x: 2440, y: 200, w: 90, h: 20 }, { x: 2620, y: 250, w: 90, h: 20 },
      { x: 2800, y: 190, w: 90, h: 20 }, { x: 2980, y: 260, w: 90, h: 20 },
      { x: 3160, y: 300, w: 160, h: 20 }
    ],
    tokens: [
      { x: 305, y: 220 }, { x: 485, y: 170 }, { x: 665, y: 220 }, { x: 845, y: 160 },
      { x: 1045, y: 220 }, { x: 1225, y: 150 }, { x: 1405, y: 200 }, { x: 1585, y: 130 },
      { x: 1765, y: 190 }, { x: 1945, y: 120 }, { x: 2125, y: 180 }, { x: 2305, y: 240 },
      { x: 2485, y: 160 }, { x: 2665, y: 210 }, { x: 2845, y: 150 }, { x: 3025, y: 220 }, { x: 3220, y: 260 }
    ],
    beers: [{ x: 900, y: 290 }, { x: 1900, y: 290 }, { x: 2800, y: 290 }],
    enemies: [
      { id: 'comedown', label: 'Comedown', x: 700, y: GROUND_Y - 34, w: 30, h: 34, minX: 620, maxX: 900, speed: 3.8, color: '#7c3fd4' },
      { id: 'gueule-de-bois', label: 'Gueule de bois', x: 1600, y: GROUND_Y - 34, w: 30, h: 34, minX: 1600, maxX: 1600, speed: 0, color: '#e83a52' },
      { id: 'plus-jamais-ca', label: 'Plus jamais ça', x: 2300, y: GROUND_Y - 34, w: 26, h: 34, minX: 2200, maxX: 2500, speed: 4.2, color: '#1f9e57' },
      { id: 'derniere-biere', label: 'Dernière bière', x: 2900, y: GROUND_Y - 34, w: 26, h: 34, minX: 2820, maxX: 3050, speed: 3.2, color: '#f5a000' }
    ],
    decor: 'morning' // tentes en vrac, gobelets, mouettes
  }
]
