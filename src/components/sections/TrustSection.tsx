const STATS = [
  { value: '2 000+', label: 'Clients satisfaits',   sub: 'et ça grandit chaque jour' },
  { value: '< 30 min', label: 'Délai de livraison', sub: 'directement sur WhatsApp' },
  { value: '6+', label: 'Services disponibles',     sub: 'streaming, gaming & plus' },
  { value: '24/7', label: 'Support actif',           sub: 'jamais sans réponse' },
]

const GUARANTEES = [
  {
    num: '01',
    title: 'Compte garanti',
    description: 'Si vos identifiants ne fonctionnent pas dans les 24h, on vous rembourse ou remplace immédiatement — sans question.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    color: '#27C42B',
  },
  {
    num: '02',
    title: 'Paiement 100% sécurisé',
    description: 'Wave, Orange Money, MTN MoMo — via CinetPay, agrégateur certifié. Vos données bancaires ne nous parviennent jamais.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    color: '#2A8CE8',
  },
  {
    num: '03',
    title: 'Livraison WhatsApp',
    description: 'Vos identifiants arrivent sur WhatsApp — pas dans une boîte mail perdue. Rapide, lisible, immédiat.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    color: '#25D366',
  },
  {
    num: '04',
    title: 'Prix transparents',
    description: 'Aucun frais caché, aucun abonnement automatique. Tu paies une fois, tu reçois ton accès pour la durée choisie.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    color: '#F5A623',
  },
]

export default function TrustSection() {
  return (
    <section id="confiance" className="trust">

      <div className="trust__inner">

        {/* ── Header ── */}
        <div className="trust__header">
          <p className="trust__eyebrow">04 · Pourquoi nous choisir</p>
          <h2 className="trust__title font-title">
            La confiance,<br />
            <span className="text-gradient">ça se mérite.</span>
          </h2>
          <p className="trust__subtitle">
            Des milliers de clients nous font confiance chaque mois. Voici pourquoi.
          </p>
        </div>

        {/* ── Stats banner ── */}
        <div className="trust__stats">
          {STATS.map((s, i) => (
            <div key={s.label} className="trust__stat">
              <span className="trust__stat-value">{s.value}</span>
              <span className="trust__stat-label">{s.label}</span>
              <span className="trust__stat-sub">{s.sub}</span>
              {i < STATS.length - 1 && <div className="trust__stat-divider" />}
            </div>
          ))}
        </div>

        {/* ── Garanties ── */}
        <div className="trust__grid">
          {GUARANTEES.map((g) => (
            <div key={g.title} className="trust__card">
              <div className="trust__card-num" style={{ color: g.color }}>{g.num}</div>
              <div className="trust__card-icon" style={{ color: g.color, background: `${g.color}18`, borderColor: `${g.color}30` }}>
                {g.icon}
              </div>
              <div className="trust__card-body">
                <h3 className="trust__card-title">{g.title}</h3>
                <p className="trust__card-desc">{g.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
