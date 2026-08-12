import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/apple-touch-icon.png', 'icons/favicon.png'],
      manifest: {
        name: 'Le Medusa des Shlagos — Édition 2026',
        short_name: 'Shlagos 2026',
        description: "L'app officieuse (mais officielle) des Shlagos pour le Medusa Festival 2026",
        theme_color: '#0891B2',
        background_color: '#0E7490',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        // Précache seulement le noyau léger de l'appli (JS/CSS/HTML/icônes)
        // — rapide et fiable à installer. Les gros médias (photos, sons,
        // fonds) ne sont PAS précachés d'un bloc : ça fait courir le risque
        // qu'une installation échoue à mi-chemin sur un réseau capricieux
        // et laisse l'appli dans un état cassé. À la place, ils sont mis en
        // cache automatiquement au fil de l'eau (dès qu'ils sont vus une
        // fois) via les règles de cache runtime ci-dessous.
        globPatterns: ['**/*.{js,css,html,svg,json}'],
        globIgnores: ['**/photos-artistes/**', '**/photos-2025/**', '**/sounds/**'],
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpe?g|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'medusa-images',
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 90 }
            }
          },
          {
            urlPattern: /\.(?:wav|mp3)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'medusa-sounds',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 90 }
            }
          }
        ],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true
      }
    })
  ],
  server: {
    host: true
  }
})
