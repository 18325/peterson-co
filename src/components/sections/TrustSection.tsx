const STATS = [
  { value: '2 000+', label: 'Clients satisfaits' },
  { value: '< 30 min', label: 'Délai de livraison' },
  { value: '6+', label: 'Services disponibles' },
  { value: '24/7', label: 'Support WhatsApp' },
]

const GUARANTEES = [
  {
    title: 'Compte garanti',
    description:
      'Si vos identifiants ne fonctionnent pas dans les 24h, on vous rembourse ou on remplace immédiatement.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    color: 'var(--success)',
  },
  {
    title: 'Paiement 100% sécurisé',
    description:
      'Wave, Orange Money, MTN MoMo — tous via CinetPay, agrégateur certifié. Vos données bancaires ne nous parviennent jamais.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    color: 'var(--cyan)',
  },
  {
    title: 'Livraison WhatsApp',
    description:
      'Vos identifiants sont envoyés directement sur WhatsApp, pas dans une boîte mail introuvable. Rapide et lisible.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    color: '#4488FF',
  },
  {
    title: 'Prix transparents',
    description:
      'Aucun frais caché, aucun abonnement automatique. Tu paies une fois, tu reçois ton accès pour la durée choisie.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    color: 'var(--gold)',
  },
]

export default function TrustSection() {
  return (
    <section id="confiance" className="px-6 py-24 max-w-6xl mx-auto">

      {/* En-tête */}
      <div className="text-center mb-16">
        <p style={{ fontSize: '17px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: 'var(--cyan)', marginBottom: '12px' }}>
          04 · Pourquoi nous choisir
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
          Fiabilité & Transparence
        </h2>
        <p
          className="max-w-lg mx-auto font-light"
          style={{ color: 'var(--text-muted)', fontSize: '17px' }}
        >
          Des milliers de clients nous font confiance chaque mois. Voici pourquoi.
        </p>
      </div>

      {/* Stats */}
      <div
        className="grid gap-4 mb-12"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}
      >
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="card p-6 text-center"
          >
            <div
              className="font-title mb-2"
              style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                color: 'var(--cyan)',
                lineHeight: 1,
              }}
            >
              {stat.value}
            </div>
            <div
              className="text-sm font-medium"
              style={{ color: 'var(--text-muted)' }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Garanties */}
      <div
        className="grid gap-6"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
      >
        {GUARANTEES.map((g) => (
          <div
            key={g.title}
            className="card p-6 flex flex-col gap-4"
          >
            {/* Icône */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: `${g.color}18`,
                border: `1px solid ${g.color}44`,
                color: g.color,
              }}
            >
              {g.icon}
            </div>

            <div>
              <h3
                className="font-semibold text-base mb-2"
                style={{ color: 'var(--text-main)' }}
              >
                {g.title}
              </h3>
              <p
                className="text-sm font-light leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                {g.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
