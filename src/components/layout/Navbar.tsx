// src/components/layout/Navbar.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { WHATSAPP_NUMBER } from '@/constants/config'

const LOGO_PRINCIPAL = '/assets/identite_visuelle/LOGO PRINCIPAL COLORE/LOGO PRINCIPAL.png'
const LOGO_PRINCIPAL_WHITE = '/assets/identite_visuelle/VERSION MONOCHROME ALL/LOGO PRINCIPAL WHITE.png'

const NAV_LINKS = [
  { label: 'Services',          href: '/#services' },
  { label: 'Comment ça marche', href: '/#comment'  },
  { label: 'Contact',           href: '/#contact'  },
]

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  const waText = encodeURIComponent('Bonjour ! Je souhaite commander un abonnement Peterson&Co.')

  return (
    <header className="navbar">
      {/* Ligne gradient signature en haut */}
      <div className="navbar__topline" />

      <div className="navbar__inner">

        {/* LOGO */}
        <Link href="/" className="navbar__logo">
          <Image
            src={LOGO_PRINCIPAL}
            alt="Peterson &co"
            width={160}
            height={44}
            className="navbar__logo-img navbar__logo-img--light"
            priority
          />
          <Image
            src={LOGO_PRINCIPAL_WHITE}
            alt="Peterson &co"
            width={160}
            height={44}
            className="navbar__logo-img navbar__logo-img--dark"
            priority
          />
        </Link>

        {/* LIENS desktop */}
        <nav className="navbar__links">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="navbar__link">{l.label}</Link>
          ))}
        </nav>

        {/* DROITE : CTA + toggle + burger */}
        <div className="navbar__right">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
            target="_blank" rel="noopener noreferrer"
            className="navbar__cta"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            <span>Commander</span>
          </a>

          <button onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
            aria-label="Changer de thème" className="navbar__theme-btn">
            {resolvedTheme === 'light' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <line x1="12" y1="2" x2="12" y2="6"/>
                <line x1="12" y1="18" x2="12" y2="22"/>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
                <line x1="2" y1="12" x2="6" y2="12"/>
                <line x1="18" y1="12" x2="22" y2="12"/>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
              </svg>
            )}
          </button>

          <button className="navbar__burger" onClick={() => setOpen(!open)} aria-label="Menu">
            <span className="navbar__burger-line" style={{ transform: open ? 'rotate(45deg) translateY(6px)' : 'none' }} />
            <span className="navbar__burger-line" style={{ opacity: open ? 0 : 1 }} />
            <span className="navbar__burger-line" style={{ transform: open ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="navbar__mobile">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="navbar__mobile-link" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
