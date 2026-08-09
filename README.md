# 🌴🦑 Le Medusa des Shlagos — Édition 2026

PWA React + Vite + Tailwind + Framer Motion pour le groupe des Shlagos au Medusa Festival.

## Lancer le projet en local

```bash
npm install
npm run dev
```

Ouvre ensuite l'URL affichée (par défaut `http://localhost:5173`) sur ton ordi, ou sur ton
iPhone si tu es sur le même Wi-Fi (Vite affichera aussi une adresse réseau du type
`http://192.168.x.x:5173`).

## Build de production

```bash
npm run build
npm run preview   # pour tester le build localement
```

Le dossier `dist/` contient l'app statique prête à déployer.

## Déployer (gratuit, en 2 minutes)

L'app est 100% statique : n'importe quel hébergeur statique fonctionne.

- **Vercel** : `npx vercel` (ou connecte le repo GitHub sur vercel.com)
- **Netlify** : glisse-dépose le dossier `dist/` sur app.netlify.com/drop
- **GitHub Pages** : push le repo, active Pages sur le dossier `dist/` via une action

Une fois en ligne en HTTPS, ouvre le lien sur iPhone (Safari) → bouton **Partager** →
**Sur l'écran d'accueil**. L'app s'installe comme une vraie app, avec icône et sans barre
de navigateur.

## Personnaliser

Tout ce qui est marqué **👉 À PERSONNALISER** dans le code est fait pour être modifié
sans toucher au reste de l'architecture :

| Quoi | Fichier |
|---|---|
| Les 6 profils Shlagos (photos, textes, anecdotes) | `src/data/shlagos.js` |
| Photos de profil | dépose-les dans `public/photos/` et référence-les dans `shlagos.js` |
| Line-up par jour (lien officiel + coups de cœur) | `src/data/lineup.js` |
| Checklist valise / camping | `src/pages/KitShlago.jsx` |
| Défis du groupe | `src/pages/souvenirs/Defis.jsx` |
| Citations cultes | `src/pages/souvenirs/Citations.jsx` |
| Dictionnaire du Shlago | `src/pages/souvenirs/Dictionnaire.jsx` |
| Plan du festival (image) | dépose `plan-medusa.jpg` dans `public/` |
| Photos souvenirs 2025 | dépose-les dans `public/photos-2025/` puis liste-les dans `src/pages/souvenirs/Photos.jsx` |

## Architecture

```
src/
  components/     → composants partagés (bouton, carte, décor, header, page shell)
  data/           → données modifiables (shlagos, line-up)
  pages/          → une page = un fichier, organisées par section
App.jsx           → toutes les routes
main.jsx          → point d'entrée + HashRouter (compatible tout hébergement statique)
```

La direction artistique (fond piscine/tropical, logo, boutons glossy, police, palette)
est centralisée dans `src/index.css`, `tailwind.config.js` et les composants partagés
(`PageShell`, `BigButton`, `Logo`, `SceneDecor`) — donc chaque nouvelle page hérite
automatiquement du même style sans rien redéfinir.

## Icônes

Des icônes PWA ont été générées automatiquement (`public/icons/`). Pour les remplacer par
un vrai logo dessiné : régénère `icon-192.png`, `icon-512.png` et `apple-touch-icon.png`
aux mêmes dimensions.
