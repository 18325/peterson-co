import Link from 'next/link'

export const metadata = {
  title: 'Politique de confidentialité — Peterson&Co',
}

export default function ConfidentialitePage() {
  return (
    <main className="legal-page">
      <div className="legal-page__inner">
        <Link href="/" className="legal-page__back">← Retour à l&apos;accueil</Link>

        <h1 className="legal-page__title font-title">Politique de confidentialité</h1>

        <section className="legal-page__section">
          <h2>1. Collecte des informations</h2>
          <p>Lors de l&apos;utilisation du site Peterson&amp;Co, certaines informations peuvent être collectées :</p>
          <ul>
            <li>Adresse email</li>
            <li>Informations de connexion</li>
            <li>Données techniques (adresse IP, navigateur, appareil)</li>
          </ul>
        </section>

        <section className="legal-page__section">
          <h2>2. Utilisation des données</h2>
          <p>Ces informations sont utilisées pour :</p>
          <ul>
            <li>Gérer les comptes utilisateurs</li>
            <li>Améliorer les services proposés</li>
            <li>Assurer la sécurité du site</li>
          </ul>
        </section>

        <section className="legal-page__section">
          <h2>3. Protection des données</h2>
          <p>Nous mettons en place des mesures de sécurité pour protéger les données personnelles contre tout accès non autorisé.</p>
        </section>

        <section className="legal-page__section">
          <h2>4. Cookies</h2>
          <p>Le site Peterson&amp;Co peut utiliser des cookies pour améliorer l&apos;expérience utilisateur et analyser l&apos;utilisation du site.</p>
        </section>

        <section className="legal-page__section">
          <h2>5. Droits des utilisateurs</h2>
          <p>Les utilisateurs peuvent demander l&apos;accès, la modification ou la suppression de leurs données personnelles en contactant : <a href="mailto:contact@petersonetco.com">contact@petersonetco.com</a>.</p>
        </section>
      </div>
    </main>
  )
}
