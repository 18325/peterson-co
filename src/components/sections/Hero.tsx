'use client'

import Image from 'next/image'
import { HERO_LOGOS } from '@/constants/config'

export default function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center px-6 overflow-hidden hero-mesh"
    >
      {/* Titre */}
      <div className="hero-tilt-wrapper">
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
        className="hero-subtitle relative font-light max-w-xl"
      >
        Abonnements, cartes cadeaux et jeux au meilleur prix.
      </p>

      {/* ── Cross screens ── */}
      <div className="hero-screen-stage">
        <div className="hero-screen-cross">
          <div className="hero-screen hero-screen--primary hero-screen--video">
            <video
              className="hero-screen__video"
              src="/assets/videos/video1.mp4"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
          </div>

          <div className="hero-screen hero-screen--side hero-screen--left hero-screen--video">
            <video
              className="hero-screen__video"
              src="/assets/videos/video2.mp4"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
          </div>

          <div className="hero-screen hero-screen--side hero-screen--right hero-screen--video">
            <video
              className="hero-screen__video"
              src="/assets/videos/video3.mp4"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
          </div>

          <div className="hero-screen hero-screen--logos" style={{ '--logo-count': HERO_LOGOS.length } as React.CSSProperties}>
            <div className="hero-screen__glow" aria-hidden="true" />
            <div className="hero-screen__flow" aria-label="Services populaires">
              {HERO_LOGOS.map((logo, index) => (
                <div
                  key={logo.alt}
                  className="hero-flow-card"
                  style={{ '--logo-index': index } as React.CSSProperties}
                >
                  <div className="hero-flow-card__inner">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={180}
                      height={180}
                      className="hero-flow-card__image"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
