// src/components/layout/Navbar.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useState, useEffect, useRef, useCallback, CSSProperties } from 'react'
import { useCart } from '@/context/CartContext'

const LOGO_PRINCIPAL       = '/assets/identite_visuelle/LOGO PRINCIPAL COLORE/LOGO PRINCIPAL.png'
const LOGO_PRINCIPAL_WHITE = '/assets/identite_visuelle/VERSION MONOCHROME ALL/LOGO PRINCIPAL WHITE.png'

const NAV_LINKS = [
  { label: 'Services',          href: '/#services' },
  { label: 'Comment ça marche', href: '/#comment'  },
  { label: 'Contact',           href: '/#contact'  },
]

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme()
  const [open,    setOpen]    = useState(false)
  const [mounted, setMounted] = useState(false)
  const [active,  setActive]  = useState<string | null>(null)
  const [glider,  setGlider]  = useState<CSSProperties>({ opacity: 0 })
  const { count, openCart } = useCart()

  const navRef  = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map())

  useEffect(() => { setMounted(true) }, [])

  /* Positionne le glider sur le lien cliqué */
  const moveGlider = useCallback((href: string) => {
    const el  = linkRefs.current.get(href)
    const nav = navRef.current
    if (!el || !nav) return
    const navRect = nav.getBoundingClientRect()
    const elRect  = el.getBoundingClientRect()
    setGlider({
      opacity: 1,
      left:   elRect.left - navRect.left,
      width:  elRect.width,
      height: elRect.height,
    })
  }, [])

  const handleClick = useCallback((href: string) => {
    setActive(href)
    moveGlider(href)
  }, [moveGlider])

  /* Recalcule si resize */
  useEffect(() => {
    if (!active) return
    const onResize = () => moveGlider(active)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [active, moveGlider])

  return (
    <header className="navbar">
      <div className="navbar__topline" />

      <div className="navbar__inner">

        {/* LOGO */}
        <Link href="/" className="navbar__logo">
          <Image src={LOGO_PRINCIPAL} alt="Peterson &co" width={160} height={44}
            className="navbar__logo-img navbar__logo-img--light" priority />
          <Image src={LOGO_PRINCIPAL_WHITE} alt="Peterson &co" width={160} height={44}
            className="navbar__logo-img navbar__logo-img--dark" priority />
        </Link>

        {/* LIENS desktop — conteneur glass */}
        <nav className="navbar__links" ref={navRef}>
          {/* Glider animé */}
          <div className="navbar__glider" style={glider} aria-hidden="true" />

          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              ref={(el) => { if (el) linkRefs.current.set(l.href, el) }}
              className="navbar__link"
              data-active={active === l.href ? 'true' : 'false'}
              onClick={() => handleClick(l.href)}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* DROITE */}
        <div className="navbar__right">

          {/* Panier */}
          {mounted && (
            <button className="navbar__cart-btn" onClick={openCart} aria-label="Ouvrir le panier">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {count > 0 && (
                <span className="navbar__cart-badge">{count}</span>
              )}
            </button>
          )}

          {/* Thème */}
          {mounted && (
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
          )}

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
