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
      <div className="hero-tilt-wrapper" style={{ marginBottom: '20px' }}>
        <h1
          className="hero-tilt-inner font-title"
          style={{ fontSize: 'clamp(40px,8vw,96px)', lineHeight: '1.05', letterSpacing: '-0.03em' }}
        >
          <span
            style={{
              background: 'linear-gradient(135deg, #2277C4 0%, #229422 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            +100 services premium
          </span>
          <br />
          <span style={{ color: 'var(--text-main)' }}>disponibles</span>
        </h1>
      </div>

      {/* Sous-titre */}
      <p
        className="relative font-light max-w-xl"
        style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '36px' }}
      >
        Abonnements, cartes cadeaux et jeux au meilleur prix.
      </p>


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
