import { Component } from 'react'

async function hardRepair() {
  try {
    if ('caches' in window) {
      const keys = await caches.keys()
      await Promise.all(keys.map((k) => caches.delete(k)))
    }
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations()
      await Promise.all(regs.map((r) => r.unregister()))
    }
  } catch {
    // même si le nettoyage échoue partiellement, on recharge quand même
  } finally {
    window.location.reload()
  }
}

/**
 * Filet de sécurité : si un composant plante au rendu (bug, donnée
 * corrompue, etc.), on affiche un écran clair avec un bouton qui répare
 * tout seul — vide le cache, désinscrit le Service Worker, recharge.
 * Zéro manip technique à distance à expliquer à qui que ce soit.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // gardé pour un futur diagnostic si besoin (visible dans la console)
    console.error('ErrorBoundary a intercepté :', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div
        style={{
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 18,
          padding: 24,
          textAlign: 'center',
          background: 'linear-gradient(180deg, #38c6e6 0%, #0a5f80 100%)',
          color: 'white',
          fontFamily: 'system-ui, sans-serif'
        }}
      >
        <span style={{ fontSize: 44 }}>🦑</span>
        <h1 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>Petit souci technique</h1>
        <p style={{ fontSize: 14, opacity: 0.85, maxWidth: 280, margin: 0 }}>
          Appuie sur le bouton pour réparer l'appli automatiquement — ça prend deux secondes.
        </p>
        <button
          onClick={hardRepair}
          style={{
            border: 'none',
            borderRadius: 999,
            padding: '14px 28px',
            fontSize: 15,
            fontWeight: 700,
            color: 'white',
            background: 'linear-gradient(135deg, #ff6f7d, #7c3fd4)',
            boxShadow: '0 8px 20px -6px rgba(0,0,0,0.5)'
          }}
        >
          🔧 Réparer l'appli
        </button>
      </div>
    )
  }
}
