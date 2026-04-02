import Link from 'next/link'

export const metadata = {
  title: "Conditions d'utilisation — Peterson&Co",
}

export default function ConditionsPage() {
  return (
    <main className="legal-page">
      <div className="legal-page__inner">
        <Link href="/" className="legal-page__back">← Retour à l&apos;accueil</Link>

        <h1 className="legal-page__title font-title">Conditions d&apos;utilisation</h1>

        <section className="legal-page__section">
          <h2>1. Objet</h2>
          <p>Les présentes conditions d&apos;utilisation régissent l&apos;accès et l&apos;utilisation du site Peterson&amp;Co, une plateforme permettant de proposer l&apos;accès à des abonnements numériques partagés.</p>
        </section>

        <section className="legal-page__section">
          <h2>2. Acceptation des conditions</h2>
          <p>En accédant au site Peterson&amp;Co, l&apos;utilisateur accepte pleinement les présentes conditions d&apos;utilisation. Si vous n&apos;acceptez pas ces conditions, vous devez cesser immédiatement d&apos;utiliser le site.</p>
        </section>

        <section className="legal-page__section">
          <h2>3. Description du service</h2>
          <p>Peterson&amp;Co propose aux utilisateurs l&apos;accès à différents services numériques et abonnements partagés tels que plateformes de streaming, services en ligne ou contenus numériques via des accès ou profils dédiés.</p>
        </section>

        <section className="legal-page__section">
          <h2>4. Compte utilisateur</h2>
          <p>Certaines fonctionnalités peuvent nécessiter la création d&apos;un compte. L&apos;utilisateur s&apos;engage à fournir des informations exactes et à garder ses identifiants confidentiels.</p>
        </section>

        <section className="legal-page__section">
          <h2>5. Utilisation du service</h2>
          <p>L&apos;utilisateur s&apos;engage à utiliser le site de manière légale et à ne pas revendre ou partager les accès fournis sans autorisation.</p>
        </section>

        <section className="legal-page__section">
          <h2>6. Suspension ou résiliation</h2>
          <p>Peterson&amp;Co se réserve le droit de suspendre ou supprimer un compte en cas de non-respect des présentes conditions.</p>
        </section>

        <section className="legal-page__section">
          <h2>7. Modification des conditions</h2>
          <p>Les conditions d&apos;utilisation peuvent être modifiées à tout moment afin d&apos;améliorer le service ou de se conformer aux réglementations.</p>
        </section>
      </div>
    </main>
  )
}
