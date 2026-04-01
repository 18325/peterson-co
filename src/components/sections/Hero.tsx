'use client'

import Image from 'next/image'
import { HERO_LOGOS } from '@/constants/config'

export default function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center px-6 overflow-hidden hero-mesh"
      style={{ minHeight: '100vh', paddingTop: '80px' }}
    >
      {/* Titre */}
      <div className="hero-tilt-wrapper" style={{ marginBottom: '28px' }}>
        <h1
          className="hero-tilt-inner font-title"
          style={{ fontSize: 'clamp(52px,9vw,110px)', lineHeight: '1.0', letterSpacing: '-0.03em' }}
        >
          <span style={{ color: 'var(--text-main)' }}>Vos abonnements</span>
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #2277C4 0%, #229422 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Premium
          </span>
          <br />
          <span style={{ color: 'var(--text-main)' }}>à petit prix</span>
        </h1>
      </div>

      {/* Sous-titre */}
      <p
        className="relative font-light max-w-xl"
        style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '44px' }}
      >
        Netflix, Spotify, Disney+, VPN et bien plus. Paiement via{' '}
        <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>Wave, Orange Money, PayPal</span>
        {' '}ou carte bancaire. Reçois tes identifiants directement sur WhatsApp.
      </p>

      {/* CTAs */}
      <div className="relative flex flex-wrap gap-4 justify-center mb-14">
        <a href="#services" className="btn-primary text-base px-8 py-3">
          Voir les services →
        </a>
        <a href="#comment" className="btn-ghost text-sm px-8 py-3">
          Comment ça marche ?
        </a>
      </div>

      {/* ── Carousel 3D ── */}
      <div className="relative w-full" style={{ height: '260px' }}>
        <div className="carousel-3d">
          {HERO_LOGOS.map((logo) => (
            <div key={logo.alt} className="carousel-3d__item">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={110}
                height={110}
                className="w-full h-full object-contain p-3"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
