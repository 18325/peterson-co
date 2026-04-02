'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { SERVICES, CATEGORIES } from '@/constants/services'
import { categoryToSlug } from '@/lib/format'
import ServiceCard from './ServicesCard'

const CONTENT_CATS = CATEGORIES.filter((c) => c !== 'Tous') as string[]

/* ── Rangée par catégorie ── */
function CategoryRow({ cat, services }: { cat: string; services: typeof SERVICES }) {
  const slug = categoryToSlug(cat)

  if (services.length === 0) return null

  return (
    <div id={`section-${slug}`} className="srow">
      <div className="srow__head">
        <div className="srow__title-group">
          <h3 className="srow__title">{cat}</h3>
          <span className="srow__count">{services.length}</span>
        </div>
        <div className="srow__controls">
          <Link href={`/services/category/${slug}`} className="srow__see-all">Tout voir →</Link>
        </div>
      </div>
      <div className="srow__track">
        {services.map((s) => <ServiceCard key={s.id} service={s} />)}
      </div>
    </div>
  )
}

/* ── Grille de résultats de recherche ── */
function SearchResults({ results }: { results: typeof SERVICES }) {
  if (results.length === 0) {
    return (
      <div className="sgrid__empty">
        <span className="sgrid__empty-icon">🔍</span>
        <p>Aucun service trouvé</p>
        <span>Essayez un autre mot-clé</span>
      </div>
    )
  }
  return (
    <div className="sgrid__search-results">
      {results.map((s) => <ServiceCard key={s.id} service={s} />)}
    </div>
  )
}

/* ── Composant principal ── */
export default function ServicesGrid() {
  const [active, setActive]   = useState('Tous')
  const [query,  setQuery]    = useState('')

  /* Auto-scroll des filtres */
  const filterRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = filterRef.current
    if (!el) return
    let frame: number
    let paused = false

    const tick = () => {
      if (!paused) {
        el.scrollLeft += 0.6
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth) el.scrollLeft = 0
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)

    const pause  = () => { paused = true }
    const resume = () => { paused = false }

    el.addEventListener('mouseenter', pause)
    el.addEventListener('mouseleave', resume)
    el.addEventListener('touchstart', pause,  { passive: true })
    el.addEventListener('touchend',   resume)

    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('mouseenter', pause)
      el.removeEventListener('mouseleave', resume)
      el.removeEventListener('touchstart', pause)
      el.removeEventListener('touchend',   resume)
    }
  }, [])

  const trimmed = query.trim().toLowerCase()
  const isSearching = trimmed.length > 0

  /* Résultats de recherche */
  const searchResults = isSearching
    ? SERVICES.filter((s) =>
        s.name.toLowerCase().includes(trimmed) ||
        s.tagline.toLowerCase().includes(trimmed) ||
        s.category.toLowerCase().includes(trimmed)
      )
    : []

  /* Catégories à afficher (mode filtre) */
  const displayedCats: string[] = active === 'Tous' ? CONTENT_CATS : [active]

  return (
    <section id="services" className="sgrid">

      {/* ── Header ── */}
      <div className="sgrid__header">
        <p className="sgrid__eyebrow">02 · Nos Services</p>
        <h2 className="sgrid__title font-title">Choisissez votre abonnement</h2>
        <p className="sgrid__subtitle">
          Tous les services livrés en moins de 30 minutes directement sur votre WhatsApp.
        </p>
      </div>

      {/* ── Barre de recherche ── */}
      <div className="sgrid__search-wrap">
        <div className="sgrid__search-box">
          <svg className="sgrid__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            className="sgrid__search-input"
            placeholder="Rechercher un service… Netflix, Spotify, VPN…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className="sgrid__search-clear" onClick={() => setQuery('')} aria-label="Effacer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ── Filtres catégories (masqués en mode search) ── */}
      {!isSearching && (
        <div className="sgrid__filters-marquee" ref={filterRef}>
          <div className="sgrid__filters-track">
            {CATEGORIES.map((cat: string, index: number) => (
              <button
                key={`${cat}-${index}`}
                onClick={() => setActive(cat)}
                className="sgrid__filter-btn"
                data-active={active === cat ? 'true' : 'false'}
              >
                <span className="sgrid__filter-dot" aria-hidden="true" />
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Contenu ── */}
      {isSearching ? (
        <div className="sgrid__rows">
          <SearchResults results={searchResults} />
        </div>
      ) : (
        <div className="sgrid__rows">
          {displayedCats.map((cat: string) => (
            <CategoryRow
              key={cat}
              cat={cat}
              services={SERVICES.filter((s) => s.category === cat)}
            />
          ))}
        </div>
      )}

    </section>
  )
}
