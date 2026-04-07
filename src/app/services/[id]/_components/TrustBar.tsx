const TRUST_ITEMS = [
  {
    title: 'Livraison instantanée',
    color: '#F97316',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    title: 'Paiement sécurisé',
    color: '#2277C4',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
  {
    title: 'Accès immédiat',
    color: '#229422',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
]

export default function TrustBar() {
  return (
    <div className="pd-top-shell">
      <div className="pd-trust-bar">
        <div className="pd-trust-bar__inner">
          {TRUST_ITEMS.map(({ title, icon, color }) => (
            <div key={title} className="pd-trust-bar__item">
              <span className="pd-trust-bar__icon" style={{ color }}>{icon}</span>
              <p className="pd-trust-bar__title">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
