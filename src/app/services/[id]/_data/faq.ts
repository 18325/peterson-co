export const CATEGORY_FAQ: Record<string, Array<{ q: string; a: string }>> = {
  'Streaming Vidéo': [
    { q: 'Comment accéder au service après commande ?', a: 'Vous recevez vos identifiants de connexion directement sur WhatsApp en moins de 30 minutes. Il suffit de les saisir dans l\'application correspondante.' },
    { q: 'Sur combien d\'appareils puis-je me connecter ?', a: 'Cela dépend de l\'offre choisie. L\'offre 1 écran = 1 appareil simultané. Le compte privé permet jusqu\'à 4 écrans selon le plan.' },
    { q: 'Que faire si mon accès ne fonctionne plus ?', a: 'Contactez-nous immédiatement sur WhatsApp. Nous garantissons votre accès et résolvons tout problème dans les plus brefs délais, sans frais supplémentaires.' },
    { q: 'Puis-je regarder en qualité 4K ?', a: 'Oui, selon l\'offre sélectionnée. Les offres Standard et Premium incluent la 4K Ultra HD sur les appareils compatibles.' },
  ],
  'Pack Streaming': [
    { q: 'Comment fonctionnent les packs combinés ?', a: 'Vous recevez les accès des deux services dans le même message WhatsApp. Chaque service s\'active indépendamment sur son application.' },
    { q: 'Les deux services ont-ils la même durée ?', a: 'Oui, les deux abonnements du pack démarrent en même temps et ont la même durée de validité.' },
    { q: 'Puis-je renouveler un seul service du pack ?', a: 'Absolument. Vous pouvez renouveler chaque service séparément ou reconduire le pack complet à prix réduit.' },
  ],
  'Musique': [
    { q: 'Comment activer mon abonnement musical ?', a: 'Après confirmation, vous recevez vos accès sur WhatsApp. Ouvrez l\'application, connectez-vous avec les identifiants fournis et profitez de la musique sans publicité.' },
    { q: 'Puis-je écouter hors-ligne ?', a: 'Oui, tous nos abonnements musique incluent le téléchargement pour écoute offline sur vos appareils.' },
    { q: 'La qualité audio est-elle garantie ?', a: 'Oui, nos abonnements incluent la qualité audio maximale du service (Lossless, HiFi, ou Premium selon la plateforme).' },
  ],
  'Sécurité & VPN': [
    { q: 'Comment installer le VPN après commande ?', a: 'Nous vous envoyons un guide d\'installation complet sur WhatsApp avec votre clé de licence. L\'installation prend moins de 5 minutes.' },
    { q: 'Combien d\'appareils puis-je protéger simultanément ?', a: 'Selon le service VPN, entre 5 et 10 appareils simultanés. Nous précisons le nombre exact dans l\'offre.' },
    { q: 'Mon adresse IP sera-t-elle masquée ?', a: 'Oui, le VPN masque votre IP et chiffre votre connexion. Vous pouvez choisir le pays du serveur de connexion.' },
  ],
  'Applications': [
    { q: 'Comment activer l\'application Pro ?', a: 'Vous recevez un code ou des accès directs via WhatsApp. L\'activation est immédiate et vous guidons si nécessaire.' },
    { q: 'L\'abonnement inclut-il toutes les fonctionnalités Premium ?', a: 'Oui, vous bénéficiez de l\'intégralité des fonctionnalités de l\'offre Premium ou Pro de l\'application.' },
  ],
  'Intelligence Artificielle': [
    { q: 'Comment accéder à l\'IA après commande ?', a: 'Vous recevez vos identifiants sur WhatsApp. Connectez-vous sur le site ou l\'application de l\'IA avec ces accès.' },
    { q: 'Les limites d\'utilisation sont-elles levées ?', a: 'Oui, avec l\'abonnement Premium vous bénéficiez des limites étendues (GPT-4, génération d\'images, plugins, etc.) selon le plan.' },
    { q: 'Puis-je utiliser l\'IA sur mobile et PC ?', a: 'Oui, tous nos abonnements IA sont compatibles mobile, tablette et ordinateur. Accès multi-appareils inclus.' },
  ],
}

export const DEFAULT_FAQ = [
  { q: 'Comment se passe la livraison ?', a: 'Vous recevez vos accès directement sur WhatsApp en moins de 30 minutes après confirmation de votre paiement.' },
  { q: 'Le paiement est-il sécurisé ?', a: 'Oui, nous acceptons Wave, Orange Money, MTN MoMo et Visa. Toutes les transactions sont protégées.' },
  { q: 'Et si mon accès ne fonctionne pas ?', a: 'Nous garantissons votre compte. Contactez-nous sur WhatsApp et nous résolvons le problème immédiatement et sans frais.' },
]
