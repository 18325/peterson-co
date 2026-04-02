import Link from 'next/link'

export const metadata = {
  title: 'Mentions légales — Peterson&Co',
}

export default function MentionsPage() {
  return (
    <main className="legal-page">
      <div className="legal-page__inner">
        <Link href="/" className="legal-page__back">← Retour à l&apos;accueil</Link>

        <h1 className="legal-page__title font-title">Mentions légales</h1>

        <section className="legal-page__section">
          <h2>Éditeur du site</h2>
          <p><strong>Nom du site :</strong> Peterson&amp;Co</p>
          <p><strong>Responsable du site :</strong> Peterson&amp;Co</p>
          <p><strong>Email :</strong> <a href="mailto:contact@petersonetco.com">contact@petersonetco.com</a></p>
        </section>

        <section className="legal-page__section">
          <h2>Propriété intellectuelle</h2>
          <p>Tous les contenus présents sur le site Peterson&amp;Co (textes, design, logo, éléments graphiques) sont protégés par les lois sur la propriété intellectuelle.</p>
        </section>

        <section className="legal-page__section">
          <h2>Limitation de responsabilité</h2>
          <p>Peterson&amp;Co agit comme une plateforme permettant l&apos;accès à des services numériques. Le site ne peut être tenu responsable des interruptions, modifications ou limitations des services proposés par les plateformes tierces.</p>
        </section>
      </div>
    </main>
  )
}
