// src/components/sections/HowItWorks.tsx

const STEPS = [
  {
    number: '01',
    title: 'Choisissez votre service',
    description:
      'Parcourez notre catalogue : Netflix, Spotify, Disney+, Canva Pro et bien plus. Cliquez sur un service pour voir les offres et tarifs.',
    color: '#3A9AEC',
  },
  {
    number: '02',
    title: 'Payez en toute sécurité',
    description:
      'Réglez via Wave, Orange Money, MTN MoMo ou carte bancaire. Paiement chiffré, aucune donnée bancaire stockée.',
    color: '#4488FF',
  },
  {
    number: '03',
    title: 'Recevez en moins de 30 min',
    description:
      'Vos identifiants vous sont envoyés directement sur WhatsApp et par email. En cas de problème, le support répond sous 1h.',
    color: '#5FC987',
  },
]

export default function HowItWorks() {
  return (
    <section
      id="comment"
      className="px-6 py-24"
      style={{ backgroundColor: 'var(--bg-elevated)' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* En-tête */}
        <div className="text-center mb-16">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--cyan)' }}
          >
            03 · Comment ça marche
          </p>
          <h2
            className="font-title"
            style={{
              fontSize: 'clamp(36px, 6vw, 64px)',
              color: 'var(--text-main)',
              lineHeight: 1,
              marginBottom: '16px',
            }}
          >
            Simple. Rapide. Garanti.
          </h2>
          <p
            className="max-w-lg mx-auto font-light"
            style={{ color: 'var(--text-muted)', fontSize: '17px' }}
          >
            Trois étapes suffisent pour accéder à vos plateformes préférées.
          </p>
        </div>

        {/* Étapes */}
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
        >
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="step-card-wrapper"
              style={{ '--step-color': step.color } as React.CSSProperties}
            >
              <div className="step-card-inner">

                {/* Numéro en filigrane */}
                <span
                  className="font-title absolute -top-2 -right-2 select-none pointer-events-none"
                  style={{
                    fontSize: '100px',
                    lineHeight: 1,
                    color: step.color,
                    opacity: 0.07,
                    letterSpacing: '-2px',
                  }}
                >
                  {step.number}
                </span>

                {/* Pastille numéro */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}, ${step.color}88)`,
                    color: '#FFFFFF',
                  }}
                >
                  {step.number}
                </div>

                {/* Contenu */}
                <h3
                  className="font-title text-xl"
                  style={{ color: 'var(--text-main)' }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm font-light leading-relaxed"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {step.description}
                </p>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
