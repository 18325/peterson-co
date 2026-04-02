// src/components/sections/HowItWorks.tsx

const STEPS = [
  {
    number: '01',
    title: 'Choisissez',
    description: 'Parcourez notre catalogue : Netflix, Spotify, Disney+, Canva Pro et bien plus. Cliquez sur un service pour voir les offres et tarifs.',
    color: '#3A9AEC',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Payez',
    description: 'Réglez via Wave, Mobile Money, Moov Money ou carte bancaire. Paiement chiffré, aucune donnée bancaire stockée.',
    color: '#4488FF',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Recevez',
    description: 'Vos identifiants vous sont envoyés directement sur WhatsApp en moins de 30 min. En cas de problème, le support répond sous 1h.',
    color: '#5FC987',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <line x1="9" y1="10" x2="15" y2="10"/>
        <line x1="9" y1="14" x2="13" y2="14"/>
      </svg>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section
      id="comment"
      className="px-6 py-24"
      style={{ backgroundColor: 'var(--bg-elevated)' }}
    >
      {/* Filtre SVG goo — requis pour l'effet morph */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          <filter id="morphGoo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div className="max-w-6xl mx-auto">

        {/* En-tête */}
        <div className="text-center mb-16">
          <p style={{ fontSize: '17px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: 'var(--cyan)', marginBottom: '12px' }}>
            03 · Comment ça marche
          </p>
          <h2
            className="font-title"
            style={{ fontSize: 'clamp(36px, 6vw, 64px)', color: 'var(--text-main)', lineHeight: 1, marginBottom: '16px' }}
          >
            Simple. Rapide. Garanti.
          </h2>
          <p className="max-w-lg mx-auto font-light" style={{ color: 'var(--text-muted)', fontSize: '17px' }}>
            Trois étapes suffisent pour accéder à vos plateformes préférées.
          </p>
        </div>

        {/* Étapes */}
        <div className="hiw-grid">
          {STEPS.map((step) => (
            <div key={step.number} className="hiw-step">

              {/* Carte morph */}
              <div className="morph-card" style={{ '--step-color': step.color } as React.CSSProperties}>
                <div className="morph-blob morph-blob-1" />
                <div className="morph-blob morph-blob-2" />
                <div className="morph-blob morph-blob-3" />
                <div className="morph-content">
                  <div className="morph-icon">{step.icon}</div>
                  <div className="morph-count">{step.number}</div>
                  <div className="morph-label">{step.title}</div>
                </div>
              </div>

              {/* Description sous la carte */}
              <p className="hiw-step__desc">{step.description}</p>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
