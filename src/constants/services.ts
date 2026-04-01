import type { Service, Category } from '@/types'

export const SERVICES: Service[] = [

  // ─── STREAMING VIDÉO ────────────────────────────────────────────────────────

  {
    id: 'netflix',
    name: 'Netflix',
    category: 'Streaming Vidéo',
    emoji: '',
    image: '/assets/images/netflix.jpg',
    tagline: 'Films & séries en 4K Ultra HD — 1 écran ou compte privé',
    variants: [
      {
        id: 'netflix-1ecran',
        label: '1 Écran',
        description: 'Accédez à Netflix en qualité 4K Ultra HD sur un appareil. Profitez d\'un immense catalogue de films et séries, en ligne ou hors ligne, où que vous soyez.',
        features: ['Qualité 4K Ultra HD', 'Téléchargement offline', '1 appareil', 'Catalogue complet'],
        prices: [
          { duration: '1 mois', amount: 2500, currency: 'F CFA' },
          { duration: '2 mois', amount: 4500, currency: 'F CFA', popular: true },
          { duration: '3 mois', amount: 6500, currency: 'F CFA' },
        ],
      },
      {
        id: 'netflix-prive',
        label: 'Compte Privé',
        description: 'Compte Netflix privé créé spécialement pour vous avec votre adresse e-mail et mot de passe personnel. Choisissez l\'offre adaptée à vos besoins.',
        features: ['Compte à votre nom', 'E-mail & mot de passe perso', 'Téléphone, tablette & TV', 'Accès 100 % sécurisé'],
        prices: [
          { duration: 'Offre Mobile',    amount: 5500,  currency: 'F CFA' },
          { duration: 'Offre Essentiel', amount: 6500,  currency: 'F CFA' },
          { duration: 'Offre Standard',  amount: 8500,  currency: 'F CFA', popular: true },
          { duration: 'Offre Premium',   amount: 10500, currency: 'F CFA' },
        ],
      },
    ],
  },

  {
    id: 'prime',
    name: 'Prime Vidéo',
    category: 'Streaming Vidéo',
    emoji: '',
    image: '/assets/images/primevideo.jpg',
    tagline: 'Catalogue Amazon en 4K — 1 écran partagé ou compte privé',
    variants: [
      {
        id: 'prime-1ecran',
        label: '1 Écran',
        description: 'Accédez à Prime Vidéo en qualité 4K Ultra HD sur un appareil. Regardez vos contenus en ligne ou hors ligne, où que vous soyez.',
        features: ['Qualité 4K Ultra HD', 'Téléchargement offline', '1 appareil', 'Catalogue Prime complet'],
        prices: [
          { duration: '1 mois', amount: 2500, currency: 'F CFA' },
          { duration: '2 mois', amount: 4500, currency: 'F CFA', popular: true },
          { duration: '3 mois', amount: 6500, currency: 'F CFA' },
        ],
      },
      {
        id: 'prime-prive',
        label: 'Compte Privé',
        description: 'Compte Prime Vidéo privé créé avec votre propre adresse e-mail. 4 écrans simultanés, compatible téléphone, tablette et TV.',
        features: ['Compte à votre nom', '4 écrans simultanés', 'Téléphone, tablette & TV', 'Partage possible'],
        prices: [
          { duration: '1 mois', amount: 8500, currency: 'F CFA', popular: true },
        ],
      },
    ],
  },

  {
    id: 'disney',
    name: 'Disney+',
    category: 'Streaming Vidéo',
    emoji: '',
    image: '/assets/images/disney.jpg',
    tagline: 'Marvel, Star Wars, Pixar & Disney — VPN inclus',
    variants: [
      {
        id: 'disney-profil',
        label: 'Profil Partagé',
        description: 'Accès à un profil sur un compte Disney+ partagé. Profitez de l\'univers Marvel, Star Wars, Pixar et Disney. Utilisable sur téléphone, tablette, TV ou ordinateur. VPN inclus dans le tarif.',
        features: ['Marvel & Star Wars', 'Pixar & Disney complet', 'VPN inclus', 'Profil personnel'],
        prices: [
          { duration: '1 mois', amount: 5000,  currency: 'F CFA' },
          { duration: '2 mois', amount: 8500,  currency: 'F CFA', popular: true },
          { duration: '3 mois', amount: 12500, currency: 'F CFA' },
        ],
      },
    ],
  },

  {
    id: 'hbo',
    name: 'HBO Max',
    category: 'Streaming Vidéo',
    emoji: '',
    image: '/assets/images/hbo.jpg',
    tagline: 'Contenus exclusifs HBO & films premium — VPN inclus',
    variants: [
      {
        id: 'hbo-profil',
        label: 'Profil Partagé',
        description: 'Accès à un profil sur un compte HBO Max partagé. Films, séries et contenus exclusifs HBO. Utilisable sur téléphone, tablette, TV ou ordinateur. VPN inclus dans le tarif.',
        features: ['Contenus exclusifs HBO', 'Films & séries premium', 'VPN inclus', 'Profil personnel'],
        prices: [
          { duration: '1 mois', amount: 5000,  currency: 'F CFA' },
          { duration: '2 mois', amount: 8500,  currency: 'F CFA', popular: true },
          { duration: '3 mois', amount: 12500, currency: 'F CFA' },
        ],
      },
    ],
  },

  {
    id: 'crunchyroll',
    name: 'Crunchyroll',
    category: 'Streaming Vidéo',
    emoji: '',
    image: '/assets/images/crunchyroll.jpg',
    tagline: 'Le meilleur catalogue d\'animes en streaming',
    variants: [
      {
        id: 'crunchyroll-profil',
        label: 'Profil Partagé',
        description: 'Accès à un profil sur un compte Crunchyroll partagé. Vaste catalogue d\'animes, séries et contenus exclusifs. Utilisable sur téléphone, tablette, TV ou ordinateur.',
        features: ['Animes en simulcast', 'Catalogue exclusif', 'Téléphone, tablette & TV', 'Profil personnel'],
        prices: [
          { duration: '1 mois', amount: 2500, currency: 'F CFA' },
          { duration: '2 mois', amount: 4500, currency: 'F CFA', popular: true },
          { duration: '3 mois', amount: 6500, currency: 'F CFA' },
        ],
      },
    ],
  },

  // ─── PACK STREAMING ─────────────────────────────────────────────────────────

  {
    id: 'pack-netflix-prime',
    name: 'Pack Netflix + Prime',
    category: 'Pack Streaming',
    emoji: '',
    image: '/assets/images/netflix.jpg',
    secondImage: '/assets/images/primevideo.jpg',
    tagline: 'Netflix & Prime Vidéo réunis sur un seul appareil',
    variants: [
      {
        id: 'pack-netflix-prime-1ecran',
        label: '1 Écran',
        description: 'Accédez à Netflix ET Prime Vidéo en qualité 4K Ultra HD sur un seul appareil. Le meilleur des deux catalogues réunis, en ligne ou hors ligne.',
        features: ['Netflix 4K inclus', 'Prime Vidéo inclus', '1 appareil', 'En ligne & hors ligne'],
        prices: [
          { duration: '1 mois', amount: 4500,  currency: 'F CFA' },
          { duration: '2 mois', amount: 8000,  currency: 'F CFA', popular: true },
          { duration: '3 mois', amount: 12500, currency: 'F CFA' },
        ],
      },
    ],
  },

  {
    id: 'pack-netflix-crunchyroll',
    name: 'Pack Netflix + Crunchyroll',
    category: 'Pack Streaming',
    emoji: '',
    image: '/assets/images/netflix.jpg',
    secondImage: '/assets/images/crunchyroll.jpg',
    tagline: 'Netflix & Crunchyroll — films, séries et animes',
    variants: [
      {
        id: 'pack-netflix-crunchyroll-1ecran',
        label: '1 Écran',
        description: 'Accédez à Netflix ET Crunchyroll en qualité 4K Ultra HD sur un seul appareil. Films, séries et animes réunis pour une expérience de streaming complète.',
        features: ['Netflix 4K inclus', 'Crunchyroll inclus', '1 appareil', 'Animes & séries'],
        prices: [
          { duration: '1 mois', amount: 4500,  currency: 'F CFA' },
          { duration: '2 mois', amount: 8000,  currency: 'F CFA', popular: true },
          { duration: '3 mois', amount: 12500, currency: 'F CFA' },
        ],
      },
    ],
  },

  {
    id: 'pack-disney-hbo',
    name: 'Pack Disney+ + HBO Max',
    category: 'Pack Streaming',
    emoji: '',
    image: '/assets/images/disney.jpg',
    secondImage: '/assets/images/hbo.jpg',
    tagline: 'Disney+ & HBO Max réunis — VPN inclus',
    variants: [
      {
        id: 'pack-disney-hbo-1ecran',
        label: '1 Écran',
        description: 'Accédez à Disney+ ET HBO Max en qualité 4K Ultra HD. Marvel, Star Wars, Pixar et les exclusivités HBO réunis sur un seul appareil. VPN inclus dans le tarif.',
        features: ['Disney+ inclus', 'HBO Max inclus', 'VPN inclus', '1 appareil'],
        prices: [
          { duration: '1 mois', amount: 8500,  currency: 'F CFA' },
          { duration: '2 mois', amount: 12500, currency: 'F CFA', popular: true },
          { duration: '3 mois', amount: 15000, currency: 'F CFA' },
        ],
      },
    ],
  },

  // ─── MUSIQUE ────────────────────────────────────────────────────────────────

  {
    id: 'apple-music',
    name: 'Apple Music',
    category: 'Musique',
    emoji: '',
    image: '/assets/images/applemusic.jpg',
    tagline: '100M+ titres en audio spatial haute qualité',
    variants: [
      {
        id: 'apple-music-standard',
        label: 'Standard',
        description: 'Profitez d\'un large catalogue de chansons, playlists et albums exclusifs Apple Music. Audio Spatial, téléchargement hors ligne et playlists curatées.',
        features: ['100M+ titres', 'Audio Spatial', 'Playlists exclusives', 'Téléchargement offline'],
        prices: [
          { duration: '1 mois',  amount: 3500,  currency: 'F CFA' },
          { duration: '2 mois',  amount: 6500,  currency: 'F CFA' },
          { duration: '3 mois',  amount: 8500,  currency: 'F CFA' },
          { duration: '6 mois',  amount: 12500, currency: 'F CFA', popular: true },
          { duration: '1 an',    amount: 25000, currency: 'F CFA' },
        ],
      },
    ],
  },

  {
    id: 'spotify',
    name: 'Spotify Premium',
    category: 'Musique',
    emoji: '',
    image: '/assets/images/spotify.jpg',
    tagline: '100M+ titres sans pub — partagé ou compte privé',
    variants: [
      {
        id: 'spotify-partage',
        label: 'Partagé',
        description: 'Accès à un compte Spotify Premium partagé. Écoute illimitée sans publicité, en haute qualité audio, même hors ligne.',
        features: ['100M+ titres', 'Sans publicité', 'Écoute offline', 'Haute qualité audio'],
        prices: [
          { duration: '1 mois',  amount: 3500,  currency: 'F CFA' },
          { duration: '2 mois',  amount: 6500,  currency: 'F CFA' },
          { duration: '3 mois',  amount: 8500,  currency: 'F CFA' },
          { duration: '6 mois',  amount: 12500, currency: 'F CFA', popular: true },
          { duration: '1 an',    amount: 25000, currency: 'F CFA' },
        ],
      },
      {
        id: 'spotify-prive',
        label: 'Compte Privé',
        description: 'Compte Spotify Premium privé créé avec votre propre adresse e-mail. Accès personnel et sécurisé à toutes les fonctionnalités premium.',
        features: ['Compte à votre nom', 'E-mail & mot de passe perso', 'Sans publicité', 'Écoute offline'],
        prices: [
          { duration: '1 mois', amount: 5000, currency: 'F CFA', popular: true },
        ],
      },
    ],
  },

  {
    id: 'deezer',
    name: 'Deezer',
    category: 'Musique',
    emoji: '',
    image: '/assets/images/deezer.jpg',
    tagline: '90M+ titres en qualité FLAC — téléchargement offline',
    variants: [
      {
        id: 'deezer-standard',
        label: 'Standard',
        description: 'Profitez d\'un large catalogue de chansons, playlists et albums exclusifs Deezer en qualité FLAC. Téléchargement offline inclus.',
        features: ['90M+ titres', 'Qualité FLAC', 'Playlists curatées', 'Téléchargement offline'],
        prices: [
          { duration: '1 mois',  amount: 2500,  currency: 'F CFA' },
          { duration: '2 mois',  amount: 4500,  currency: 'F CFA' },
          { duration: '3 mois',  amount: 6500,  currency: 'F CFA' },
          { duration: '6 mois',  amount: 12000, currency: 'F CFA', popular: true },
          { duration: '1 an',    amount: 25000, currency: 'F CFA' },
        ],
      },
    ],
  },

  // ─── SÉCURITÉ & VPN ─────────────────────────────────────────────────────────

  {
    id: 'nordvpn',
    name: 'NordVPN',
    category: 'Sécurité & VPN',
    emoji: '',
    image: '/assets/images/nordvpn.jpg',
    tagline: 'Navigation sécurisée — partagé 1 appareil ou privé 10 appareils',
    variants: [
      {
        id: 'nordvpn-partage',
        label: 'Partagé',
        description: 'Accès à un compte NordVPN partagé. Profitez d\'une navigation sécurisée et privée, de serveurs rapides dans le monde entier. Protégez vos données sur 1 appareil.',
        features: ['1 appareil', 'Serveurs mondiaux', 'Navigation sécurisée', 'Données protégées'],
        prices: [
          { duration: '1 mois', amount: 2500,  currency: 'F CFA' },
          { duration: '2 mois', amount: 4500,  currency: 'F CFA' },
          { duration: '3 mois', amount: 6500,  currency: 'F CFA', popular: true },
          { duration: '1 an',   amount: 25000, currency: 'F CFA' },
        ],
      },
      {
        id: 'nordvpn-prive',
        label: 'Compte Privé',
        description: 'Compte NordVPN privé créé avec votre propre adresse e-mail. Profitez d\'une navigation sécurisée et privée sur jusqu\'à 10 appareils simultanément.',
        features: ['10 appareils', 'Compte à votre nom', 'Serveurs mondiaux', 'Navigation sécurisée'],
        prices: [
          { duration: '1 mois', amount: 11000, currency: 'F CFA', popular: true },
          { duration: '1 an',   amount: 50000, currency: 'F CFA' },
        ],
      },
    ],
  },

  {
    id: 'piavpn',
    name: 'PIA VPN',
    category: 'Sécurité & VPN',
    emoji: '',
    image: '/assets/images/piavpn.jpg',
    tagline: 'Private Internet Access — no-log certifié',
    variants: [
      {
        id: 'piavpn-partage',
        label: 'Partagé',
        description: 'Accès à un compte PIA VPN partagé. Navigation sécurisée et privée, serveurs rapides dans le monde entier. Protection de vos données sur 1 appareil.',
        features: ['1 appareil', 'No-log certifié', 'Serveurs mondiaux', 'Données protégées'],
        prices: [
          { duration: '1 mois', amount: 3500,  currency: 'F CFA' },
          { duration: '2 mois', amount: 6500,  currency: 'F CFA' },
          { duration: '3 mois', amount: 8500,  currency: 'F CFA', popular: true },
          { duration: '1 an',   amount: 25000, currency: 'F CFA' },
        ],
      },
      {
        id: 'piavpn-prive',
        label: 'Compte Privé',
        description: 'Compte PIA VPN privé créé avec votre propre adresse e-mail. Navigation sécurisée et privée sur jusqu\'à 10 appareils simultanément.',
        features: ['10 appareils', 'Compte à votre nom', 'No-log certifié', 'Serveurs mondiaux'],
        prices: [
          { duration: '1 mois', amount: 10000, currency: 'F CFA', popular: true },
          { duration: '1 an',   amount: 50000, currency: 'F CFA' },
        ],
      },
    ],
  },

  {
    id: 'avastvpn',
    name: 'Avast VPN',
    category: 'Sécurité & VPN',
    emoji: '',
    image: '/assets/images/avastvpn.jpg',
    tagline: 'Protection Avast — partagé ou privé 10 appareils',
    variants: [
      {
        id: 'avastvpn-partage',
        label: 'Partagé',
        description: 'Accès à un compte Avast VPN partagé. Navigation sécurisée et privée avec des serveurs rapides dans le monde entier. 1 appareil.',
        features: ['1 appareil', 'Protection complète', 'Serveurs rapides', 'Données protégées'],
        prices: [
          { duration: '1 mois', amount: 3500,  currency: 'F CFA' },
          { duration: '2 mois', amount: 6500,  currency: 'F CFA' },
          { duration: '3 mois', amount: 8500,  currency: 'F CFA', popular: true },
          { duration: '1 an',   amount: 25000, currency: 'F CFA' },
        ],
      },
      {
        id: 'avastvpn-prive',
        label: 'Compte Privé',
        description: 'Compte Avast VPN privé créé avec votre propre adresse e-mail. Protection complète sur jusqu\'à 10 appareils simultanément.',
        features: ['10 appareils', 'Compte à votre nom', 'Protection complète', 'Serveurs rapides'],
        prices: [
          { duration: '1 mois', amount: 10000, currency: 'F CFA', popular: true },
          { duration: '1 an',   amount: 50000, currency: 'F CFA' },
        ],
      },
    ],
  },

  {
    id: 'surfshark',
    name: 'Surfshark',
    category: 'Sécurité & VPN',
    emoji: '',
    image: '/assets/images/surfshark.jpg',
    tagline: 'Connexions illimitées — partagé ou privé 10 appareils',
    variants: [
      {
        id: 'surfshark-partage',
        label: 'Partagé',
        description: 'Accès à un compte Surfshark partagé. Surfez anonymement avec des serveurs rapides dans le monde entier. 1 appareil.',
        features: ['1 appareil', 'Navigation anonyme', 'Serveurs mondiaux', 'Données protégées'],
        prices: [
          { duration: '1 mois', amount: 3500,  currency: 'F CFA' },
          { duration: '2 mois', amount: 6500,  currency: 'F CFA' },
          { duration: '3 mois', amount: 8500,  currency: 'F CFA', popular: true },
          { duration: '1 an',   amount: 25000, currency: 'F CFA' },
        ],
      },
      {
        id: 'surfshark-prive',
        label: 'Compte Privé',
        description: 'Compte Surfshark privé créé avec votre propre adresse e-mail. Navigation anonyme et sécurisée sur jusqu\'à 10 appareils simultanément.',
        features: ['10 appareils', 'Compte à votre nom', 'Navigation anonyme', 'Serveurs mondiaux'],
        prices: [
          { duration: '1 mois', amount: 10000, currency: 'F CFA', popular: true },
          { duration: '1 an',   amount: 50000, currency: 'F CFA' },
        ],
      },
    ],
  },

  {
    id: 'mysterium',
    name: 'Mysterium VPN',
    category: 'Sécurité & VPN',
    emoji: '',
    image: '/assets/images/mysteriumvpn.jpg',
    tagline: 'VPN décentralisé — confidentialité maximale',
    variants: [
      {
        id: 'mysterium-partage',
        label: 'Partagé',
        description: 'Accès à un compte Mysterium VPN partagé. VPN décentralisé pour une confidentialité maximale, avec des serveurs rapides dans le monde entier. 1 appareil.',
        features: ['1 appareil', 'VPN décentralisé', 'Confidentialité max', 'Serveurs mondiaux'],
        prices: [
          { duration: '1 mois', amount: 5000,  currency: 'F CFA' },
          { duration: '2 mois', amount: 10000, currency: 'F CFA' },
          { duration: '3 mois', amount: 15000, currency: 'F CFA', popular: true },
          { duration: '1 an',   amount: 50000, currency: 'F CFA' },
        ],
      },
      {
        id: 'mysterium-prive',
        label: 'Compte Privé',
        description: 'Compte Mysterium VPN privé créé avec votre propre adresse e-mail. VPN décentralisé sur jusqu\'à 6 appareils simultanément.',
        features: ['6 appareils', 'Compte à votre nom', 'VPN décentralisé', 'Confidentialité max'],
        prices: [
          { duration: '1 mois', amount: 10000, currency: 'F CFA', popular: true },
          { duration: '1 an',   amount: 45000, currency: 'F CFA' },
        ],
      },
    ],
  },

  {
    id: 'protonvpn',
    name: 'Proton VPN',
    category: 'Sécurité & VPN',
    emoji: '',
    image: '/assets/images/protonvpn.jpg',
    tagline: 'VPN suisse zéro log — partagé ou privé 10 appareils',
    variants: [
      {
        id: 'protonvpn-partage',
        label: 'Partagé',
        description: 'Accès à un compte Proton VPN partagé. Le VPN suisse à politique zéro log. Navigation sécurisée et privée sur 1 appareil.',
        features: ['1 appareil', 'Zéro log garanti', 'Serveurs suisses', 'Données protégées'],
        prices: [
          { duration: '1 mois', amount: 3500,  currency: 'F CFA' },
          { duration: '2 mois', amount: 6500,  currency: 'F CFA' },
          { duration: '3 mois', amount: 8500,  currency: 'F CFA', popular: true },
          { duration: '1 an',   amount: 25000, currency: 'F CFA' },
        ],
      },
      {
        id: 'protonvpn-prive',
        label: 'Compte Privé',
        description: 'Compte Proton VPN privé créé avec votre propre adresse e-mail. Zéro log garanti sur jusqu\'à 10 appareils simultanément.',
        features: ['10 appareils', 'Compte à votre nom', 'Zéro log garanti', 'Serveurs suisses'],
        prices: [
          { duration: '1 mois', amount: 10000, currency: 'F CFA', popular: true },
          { duration: '1 an',   amount: 50000, currency: 'F CFA' },
        ],
      },
    ],
  },

  {
    id: 'cyberghost',
    name: 'CyberGhost',
    category: 'Sécurité & VPN',
    emoji: '',
    image: '/assets/images/cyberghost.jpg',
    tagline: 'Compte privé — 10 appareils, serveurs mondiaux',
    variants: [
      {
        id: 'cyberghost-prive',
        label: 'Compte Privé',
        description: 'Compte CyberGhost VPN privé créé avec votre propre adresse e-mail. Navigation sécurisée et privée avec des serveurs rapides partout dans le monde sur 10 appareils.',
        features: ['10 appareils', 'Compte à votre nom', 'Serveurs mondiaux', 'Navigation sécurisée'],
        prices: [
          { duration: '1 mois', amount: 11000, currency: 'F CFA', popular: true },
          { duration: '1 an',   amount: 50000, currency: 'F CFA' },
        ],
      },
    ],
  },

  {
    id: 'hideme',
    name: 'HIDE.me',
    category: 'Sécurité & VPN',
    emoji: '',
    image: '/assets/images/hideme.png',
    tagline: 'Compte privé — aucune journalisation, 10 appareils',
    variants: [
      {
        id: 'hideme-prive',
        label: 'Compte Privé',
        description: 'Compte HIDE.me privé créé avec votre propre adresse e-mail. Aucune journalisation de vos données, serveurs rapides partout dans le monde sur 10 appareils.',
        features: ['10 appareils', 'Compte à votre nom', 'Aucune journalisation', 'Serveurs rapides'],
        prices: [
          { duration: '1 mois', amount: 10000, currency: 'F CFA', popular: true },
          { duration: '1 an',   amount: 50000, currency: 'F CFA' },
        ],
      },
    ],
  },

  {
    id: 'expressvpn',
    name: 'ExpressVPN',
    category: 'Sécurité & VPN',
    emoji: '',
    image: '/assets/images/expressvpn.jpg',
    tagline: 'Le VPN le plus rapide — compte privé 10 appareils',
    variants: [
      {
        id: 'expressvpn-prive',
        label: 'Compte Privé',
        description: 'Compte ExpressVPN privé créé avec votre propre adresse e-mail. L\'un des VPN les plus rapides du marché, disponible dans 100+ pays sur 10 appareils.',
        features: ['10 appareils', 'Compte à votre nom', 'Vitesse maximale', '100+ pays'],
        prices: [
          { duration: '1 mois', amount: 11000, currency: 'F CFA', popular: true },
          { duration: '1 an',   amount: 50000, currency: 'F CFA' },
        ],
      },
    ],
  },

  {
    id: 'windscribe',
    name: 'Windscribe',
    category: 'Sécurité & VPN',
    emoji: '',
    image: '/assets/images/windscribe.jpg',
    tagline: 'Compte privé avec bloqueur de pubs — 10 appareils',
    variants: [
      {
        id: 'windscribe-prive',
        label: 'Compte Privé',
        description: 'Compte Windscribe privé créé avec votre propre adresse e-mail. Navigation sécurisée avec bloqueur de publicités intégré, sur 10 appareils.',
        features: ['10 appareils', 'Compte à votre nom', 'Bloqueur de pubs intégré', 'Serveurs mondiaux'],
        prices: [
          { duration: '1 mois', amount: 10000, currency: 'F CFA', popular: true },
          { duration: '1 an',   amount: 50000, currency: 'F CFA' },
        ],
      },
    ],
  },

  {
    id: 'ipvanish',
    name: 'IP Vanish',
    category: 'Sécurité & VPN',
    emoji: '',
    image: '/assets/images/ipvanish.jpg',
    tagline: 'Masquez votre IP — compte privé 10 appareils',
    variants: [
      {
        id: 'ipvanish-prive',
        label: 'Compte Privé',
        description: 'Compte IP Vanish privé créé avec votre propre adresse e-mail. Masquez votre identité en ligne et protégez vos données sur 10 appareils simultanément.',
        features: ['10 appareils', 'Compte à votre nom', 'IP masquée', '75+ pays'],
        prices: [
          { duration: '1 mois', amount: 11000, currency: 'F CFA', popular: true },
          { duration: '1 an',   amount: 50000, currency: 'F CFA' },
        ],
      },
    ],
  },

  // ─── APPLICATIONS ───────────────────────────────────────────────────────────

  {
    id: 'capcut',
    name: 'CapCut Pro',
    category: 'Applications',
    emoji: '',
    image: '/assets/images/capcutpro.jpg',
    tagline: 'Montage vidéo premium sans filigrane',
    variants: [
      {
        id: 'capcut-partage',
        label: 'Partagé',
        description: 'Accès à un compte CapCut Pro partagé. Toutes les fonctionnalités premium pour créer et éditer vos vidéos facilement, sur téléphone, tablette ou ordinateur.',
        features: ['Fonctionnalités premium', 'Sans filigrane', 'Téléphone, tablette & PC', 'Effets exclusifs'],
        prices: [
          { duration: '1 mois', amount: 5000,  currency: 'F CFA' },
          { duration: '2 mois', amount: 10000, currency: 'F CFA', popular: true },
          { duration: '3 mois', amount: 15000, currency: 'F CFA' },
        ],
      },
    ],
  },

  {
    id: 'snapchat-plus',
    name: 'Snapchat+',
    category: 'Applications',
    emoji: '',
    image: '/assets/images/snapchat.jpg',
    tagline: 'Filtres exclusifs, stories HD & options avancées',
    variants: [
      {
        id: 'snapchat-plus-1an',
        label: '1 An',
        description: 'Profitez des fonctionnalités premium Snapchat : filtres et lenses exclusifs, stories illimitées, sauvegarde en haute qualité, voir qui a consulté vos stories, et options avancées de confidentialité.',
        features: ['Filtres & lenses exclusifs', 'Voir qui consulte', 'Sauvegarde HD', 'Personnalisation avancée'],
        prices: [
          { duration: '1 an', amount: 10000, currency: 'F CFA', popular: true },
        ],
      },
    ],
  },

  {
    id: 'canva',
    name: 'Canva Pro',
    category: 'Applications',
    emoji: '',
    image: undefined,
    tagline: 'Design pro — templates premium & outils IA',
    variants: [
      {
        id: 'canva-partage',
        label: 'Partagé',
        description: 'Accès à un compte Canva Pro partagé. Créez des designs professionnels, présentations et contenus visuels avec des milliers de templates premium, sur téléphone, tablette ou ordinateur.',
        features: ['Templates premium', 'Suppression de fond', 'Outils IA intégrés', 'Exports illimités'],
        prices: [
          { duration: '3 mois', amount: 8500,  currency: 'F CFA' },
          { duration: '6 mois', amount: 15000, currency: 'F CFA', popular: true },
          { duration: '1 an',   amount: 23000, currency: 'F CFA' },
        ],
      },
    ],
  },

  // ─── INTELLIGENCE ARTIFICIELLE ──────────────────────────────────────────────

  {
    id: 'chatgpt',
    name: 'ChatGPT Pro',
    category: 'Intelligence Artificielle',
    emoji: '',
    image: '/assets/images/chatgpt.jpg',
    tagline: 'IA dernière génération — compte privé, accès illimité',
    variants: [
      {
        id: 'chatgpt-prive',
        label: 'Compte Privé',
        description: 'Compte ChatGPT Pro privé créé avec votre propre adresse e-mail. Fonctionnalités avancées de l\'IA, accès rapide et illimité aux réponses, sur téléphone, tablette ou ordinateur.',
        features: ['Compte à votre nom', 'Accès illimité', 'Modèle dernière génération', 'Téléphone & PC'],
        prices: [
          { duration: '1 mois', amount: 5500,  currency: 'F CFA', popular: true },
          { duration: '2 mois', amount: 10000, currency: 'F CFA' },
          { duration: '3 mois', amount: 15000, currency: 'F CFA' },
        ],
      },
    ],
  },

  {
    id: 'claude',
    name: 'Claude AI',
    category: 'Intelligence Artificielle',
    emoji: '',
    image: '/assets/images/claudeai.jpg',
    tagline: 'IA Anthropic — analyse, rédaction & code illimités',
    variants: [
      {
        id: 'claude-prive',
        label: 'Compte Privé',
        description: 'Compte Claude AI privé créé avec votre propre adresse e-mail. IA avancée pour l\'analyse, la rédaction et le code. Accès rapide et illimité sur téléphone, tablette ou ordinateur.',
        features: ['Compte à votre nom', 'Accès illimité', 'Analyse & rédaction & code', 'Téléphone & PC'],
        prices: [
          { duration: '1 mois', amount: 13500, currency: 'F CFA', popular: true },
        ],
      },
    ],
  },

  {
    id: 'gemini',
    name: 'Gemini AI',
    category: 'Intelligence Artificielle',
    emoji: '',
    image: '/assets/images/geminiai.jpg',
    tagline: 'IA multimodale Google — compte privé, accès illimité',
    variants: [
      {
        id: 'gemini-prive',
        label: 'Compte Privé',
        description: 'Compte Google Gemini privé créé avec votre propre adresse e-mail. IA multimodale de Google avec un accès rapide et illimité aux réponses, sur téléphone, tablette ou ordinateur.',
        features: ['Compte à votre nom', 'Accès illimité', 'IA multimodale Google', 'Téléphone & PC'],
        prices: [
          { duration: '1 mois', amount: 7500, currency: 'F CFA', popular: true },
        ],
      },
    ],
  },
]

// Catégories dans l'ordre d'affichage
export const CATEGORIES: Category[] = [
  'Tous',
  'Streaming Vidéo',
  'Pack Streaming',
  'Musique',
  'Sécurité & VPN',
  'Applications',
  'Intelligence Artificielle',
]
