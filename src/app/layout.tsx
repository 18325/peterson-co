import { ThemeProvider } from 'next-themes'
import type { Metadata } from 'next'
// Metadata est un TYPE Next.js — TypeScript vérifie que tu ne mets pas
// n'importe quoi dans metadata (ex: un chiffre à la place d'une string)
import './globals.css'
import SplashScreen from '@/components/SplashScreen'
import CartDrawer from '@/components/CartDrawer'
import { CartProvider } from '@/context/CartContext'

export const metadata: Metadata = {
  title: 'Peterson&Co — Abonnements Premium',
  description: 'Netflix, Spotify, Disney+ et plus à prix réduit. Livraison rapide via WhatsApp.',
  icons: {
    icon: '/assets/identite_visuelle/BRANDMARK/BRANDMARK.png',
    apple: '/assets/identite_visuelle/BRANDMARK/BRANDMARK.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  // React.ReactNode = TypeScript dit : "children peut être n'importe quel
  // élément React valide (JSX, texte, null...)"
}) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <SplashScreen />
        <CartProvider>
          <ThemeProvider
            attribute="data-theme"
            defaultTheme="dark"
            enableSystem={false}
          >
            {children}
            <CartDrawer />
          </ThemeProvider>
        </CartProvider>
      </body>
    </html>
  )
}
