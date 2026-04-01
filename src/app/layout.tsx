import { ThemeProvider } from 'next-themes'
import type { Metadata } from 'next'
// Metadata est un TYPE Next.js — TypeScript vérifie que tu ne mets pas
// n'importe quoi dans metadata (ex: un chiffre à la place d'une string)
import './globals.css'

export const metadata: Metadata = {
  title: 'Peterson&Co — Abonnements Premium',
  description: 'Netflix, Spotify, Disney+ et plus à prix réduit. Livraison rapide via WhatsApp.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  // React.ReactNode = TypeScript dit : "children peut être n'importe quel
  // élément React valide (JSX, texte, null...)"
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}