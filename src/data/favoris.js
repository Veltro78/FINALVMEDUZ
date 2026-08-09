// 👉 Artistes favoris — dates ISO calculées à partir du planning déjà
// intégré (lineupSchedule.js). Les sets qui commencent après minuit
// tombent sur la date calendaire du lendemain (le festival tourne de
// ~16h à ~6h du matin), c'est pris en compte ci-dessous.
//
// Note honnête : pas de vraies photos d'artistes ici (droits d'image +
// je n'ai pas accès à des banques de photos officielles) — avatar
// coloré à la place, comme pour les Shlagos. Tu peux ajouter une vraie
// photo plus tard en remplissant `photo: '/photos-artistes/xxx.jpg'`.

export const favoris = [
  { artist: 'Fatima Hajji', day: 'Vendredi', stage: 'Resonance', color: 'sun', time: '20:00', datetime: '2026-08-14T20:00:00+02:00', photo: '/photos-artistes/fatima-hajji.jpg' },
  { artist: 'Pawlowski', day: 'Vendredi', stage: 'Resonance', color: 'sun', time: '22:00', datetime: '2026-08-14T22:00:00+02:00', photo: '/photos-artistes/pawlowski.jpg' },
  { artist: 'Nico Moreno', day: 'Vendredi', stage: 'Resonance', color: 'sun', time: '00:00', datetime: '2026-08-15T00:00:00+02:00', photo: '/photos-artistes/nico-moreno.jpg' },
  { artist: 'Dimitri Vegas', day: 'Vendredi', stage: 'Apsaras', color: 'coral', time: '01:30', datetime: '2026-08-15T01:30:00+02:00', photo: '/photos-artistes/dimitri-vegas.jpg' },
  { artist: 'Vendex', day: 'Vendredi', stage: 'Resonance', color: 'sun', time: '02:00', datetime: '2026-08-15T02:00:00+02:00', photo: '/photos-artistes/vendex.jpg' },
  { artist: 'Fantasm', day: 'Vendredi', stage: 'Resonance', color: 'sun', time: '04:00', datetime: '2026-08-15T04:00:00+02:00', photo: '/photos-artistes/fantasm.jpg', note: 'Orthographié "Fantasm" sur l\'affiche officielle' },
  { artist: 'Partyraiser', day: 'Vendredi', stage: 'Arcade Land', color: 'purple', time: '04:45', datetime: '2026-08-15T04:45:00+02:00', photo: '/photos-artistes/partyraiser.jpg' },
  { artist: 'Adrián Mills', day: 'Samedi', stage: 'Arcade Land — Rockola', color: 'purple', time: '02:00', datetime: '2026-08-16T02:00:00+02:00', photo: '/photos-artistes/adrian-mills.jpg' },
  { artist: 'Carl Cox', day: 'Samedi', stage: 'Resonance', color: 'sun', time: '03:00', datetime: '2026-08-16T03:00:00+02:00', photo: '/photos-artistes/carl-cox.jpg' },
  { artist: 'Neophyte', day: 'Samedi', stage: 'Beach Club', color: 'tropical', time: '02:00', datetime: '2026-08-16T02:00:00+02:00', photo: '/photos-artistes/neophyte.jpg' },
  { artist: 'Timmy Trumpet', day: 'Dimanche', stage: 'Apsaras', color: 'coral', time: '01:30', datetime: '2026-08-17T01:30:00+02:00', photo: '/photos-artistes/timmy-trumpet.jpg' },
  { artist: 'Holy Priest', day: 'Dimanche', stage: 'Apsaras', color: 'coral', time: '02:45', datetime: '2026-08-17T02:45:00+02:00', photo: '/photos-artistes/holy-priest.jpg' },
  { artist: 'Sara Landry', day: 'Dimanche', stage: 'Resonance', color: 'sun', time: '05:00', datetime: '2026-08-17T05:00:00+02:00', photo: '/photos-artistes/sara-landry.jpg' },
  { artist: 'Angerfist', day: 'Dimanche', stage: 'Arcade Land — Masters of Hardcore', color: 'purple', time: '00:30', datetime: '2026-08-17T00:30:00+02:00', photo: '/photos-artistes/angerfist.jpg' },
  { artist: 'Mad Dog', day: 'Dimanche', stage: 'Arcade Land — Masters of Hardcore', color: 'purple', time: '01:30', datetime: '2026-08-17T01:30:00+02:00', photo: '/photos-artistes/mad-dog.jpg' },
  { artist: 'Anime', day: 'Dimanche', stage: 'Arcade Land — Masters of Hardcore', color: 'purple', time: '02:30', datetime: '2026-08-17T02:30:00+02:00', photo: '/photos-artistes/anime.jpg' },
  { artist: 'N-Vitral', day: 'Dimanche', stage: 'Arcade Land — Masters of Hardcore', color: 'purple', time: '03:30', datetime: '2026-08-17T03:30:00+02:00', photo: '/photos-artistes/n-vitral.jpg', note: 'Affiché "N-Vitral presents Bombsquad"' },
  { artist: 'Lil Texas', day: 'Dimanche', stage: 'Arcade Land — Masters of Hardcore', color: 'purple', time: '04:00', datetime: '2026-08-17T04:00:00+02:00', photo: '/photos-artistes/lil-texas.jpg' }
].sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
