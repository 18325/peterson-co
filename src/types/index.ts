// src/types/index.ts

export type ServicePrice = {
  duration: string
  amount: number
  currency: string
  popular?: boolean
}

export type ServiceVariant = {
  id: string
  label: string        // ex: "1 Écran", "Compte Privé", "Partagé", "Privé"
  description: string
  features: string[]
  prices: ServicePrice[]
}

export type Service = {
  id: string
  name: string
  category: string
  emoji: string        // fallback si pas d'image
  image?: string       // chemin dans /public, ex: '/assets/images/netflix.jpg'
  secondImage?: string // pour les packs : logo du second service
  tagline: string      // phrase courte affichée sur la carte
  variants: ServiceVariant[]
}

export type Category = string
