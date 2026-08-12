// 👉 photoId (optionnel) référence un id de src/data/shlagos.js — la
// photo de la personne apparaît sur le trophée une fois débloqué, pour
// une touche perso/humour.
export const trophees = [
  { id: 'premier-jeton', titre: 'Premier Jeton', desc: "Ramasse ton premier jeton dans Shlago Adventure", emoji: '🔷' },
  { id: 'niveau-camp', titre: 'Le Camp conquis', desc: 'Termine le niveau "Le Camp"', emoji: '🏕️' },
  { id: 'niveau-rave', titre: 'Survivant de la Rave', desc: 'Termine le niveau "La Rave de Nuit"', emoji: '🌙' },
  { id: 'niveau-comeback', titre: 'Le Comeback réussi', desc: 'Termine le niveau "Le Comeback"', emoji: '🥵' },
  { id: 'legende-adventure', titre: 'Légende du Festival', desc: 'Termine les 3 niveaux de Shlago Adventure', emoji: '👑' },
  { id: 'bruiteur-pro', titre: 'Bruiteur Professionnel', desc: 'Écoute les 5 sons de la Boîte à Prout', emoji: '💨', photoId: 'shlago-4' },
  { id: 'premier-polaroid', titre: 'Premier Polaroid', desc: 'Poste ta première photo dans le mur commun', emoji: '📸' },
  { id: 'capsule-scellee', titre: 'Capsule Scellée', desc: 'Crée ta première capsule temporelle', emoji: '🔒' },
  { id: 'on-te-retrouve', titre: 'On te retrouve', desc: 'Utilise "On se retrouve" pour la première fois', emoji: '📍', photoId: 'shlago-5' },
  { id: 'premier-defi', titre: "L'Historique s'écrit", desc: 'Valide ton premier défi', emoji: '🏆' },
  { id: 'quiz-parfait', titre: 'Tu Nous Connais Par Cœur', desc: 'Réponds juste à 5 questions de suite dans "Qui a dit ça ?"', emoji: '🧠' }
]
