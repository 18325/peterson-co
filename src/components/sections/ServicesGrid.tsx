'use client'

import { useState, useRef, useEffect, useCallback, CSSProperties } from 'react'
import Link from 'next/link'
import { SERVICES, CATEGORIES } from '@/constants/services'
import { categoryToSlug } from '@/lib/format'
import ServiceCard from './ServicesCard'

const CONTENT_CATS = CATEGORIES.filter((c) => c !== 'Tous') as string[]
const MIN_LOOP_CARDS = 8

/* ── Hook auto-scroll ── */
function useAutoScroll(speed = 0.7, loopItemCount = 0) {
  const ref = useRef<HTMLDivElement>(null)
  const paused = useRef(false)
  const frame  = useRef<number>(0)
  const loopDistance = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const measureLoop = () => {
      const first = el.children[0] as HTMLElement | undefined
      const next  = loopItemCount > 0
        ? el.children[loopItemCount] as HTMLElement | undefined
        : undefined

      loopDistance.current = first && next
        ? Math.max(0, next.offsetLeft - first.offsetLeft)
        : 0
    }

    measureLoop()

    const tick = () => {
      if (!paused.current) {
        el.scrollLeft += speed

        if (loopDistance.current > 0 && el.scrollLeft >= loopDistance.current) {
          el.scrollLeft = el.scrollLeft % loopDistance.current
        } else if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
          el.scrollLeft = 0
        }
      }
      frame.current = requestAnimationFrame(tick)
    }

    frame.current = requestAnimationFrame(tick)

    const pause  = () => { paused.current = true }
    const resume = () => { paused.current = false }

    el.addEventListener('mouseenter', pause)
    el.addEventListener('mouseleave', resume)
    el.addEventListener('touchstart', pause,  { passive: true })
    el.addEventListener('touchend',   resume)
    window.addEventListener('resize', measureLoop)

    return () => {
      cancelAnimationFrame(frame.current)
      el.removeEventListener('mouseenter', pause)
      el.removeEventListener('mouseleave', resume)
      el.removeEventListener('touchstart', pause)
      el.removeEventListener('touchend',   resume)
      window.removeEventListener('resize', measureLoop)
    }
  }, [loopItemCount, speed])

  return ref
}

/* ── Rangée par catégorie ── */
function CategoryRow({ cat, services }: { cat: string; services: typeof SERVICES }) {
  const slug      = categoryToSlug(cat)
  const trackRef  = useAutoScroll(0.6, services.length)

  if (services.length === 0) return null

  const repeatCount = Math.max(2, Math.ceil(MIN_LOOP_CARDS / services.length))
  const loopedServices = Array.from({ length: repeatCount }, (_, copyIndex) =>
    services.map((service) => ({ service, copyIndex }))
  ).flat()

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
      <div className="srow__track" ref={trackRef}>
        {loopedServices.map(({ service, copyIndex }) => (
          <ServiceCard
            key={`${service.id}-${copyIndex}`}
            service={service}
            hiddenFromA11y={copyIndex > 0}
          />
        ))}
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
  const [active, setActive] = useState('Tous')
  const [query,  setQuery]  = useState('')
  const [glider, setGlider] = useState<CSSProperties>({ opacity: 0 })

  const filterRef    = useRef<HTMLDivElement>(null)
  const trackRef     = useRef<HTMLDivElement>(null)
  const filterPaused = useRef(false)
  const filterFrame  = useRef<number>(0)
  const btnRefs      = useRef<Map<string, HTMLButtonElement>>(new Map())

  /* Positionne le glider sur le bouton actif */
  const moveGlider = useCallback((cat: string) => {
    const btn   = btnRefs.current.get(cat)
    const track = trackRef.current
    if (!btn || !track) return
    setGlider({
      opacity: 1,
      left:   btn.offsetLeft,
      width:  btn.offsetWidth,
      height: btn.offsetHeight,
    })
  }, [])

  /* Glider initial après mount */
  useEffect(() => {
    // Petit délai pour que les boutons soient mesurables
    const id = setTimeout(() => moveGlider('Tous'), 80)
    return () => clearTimeout(id)
  }, [moveGlider])

  /* Recalcule le glider si la fenêtre change de taille */
  useEffect(() => {
    const onResize = () => moveGlider(active)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [active, moveGlider])

  /* Auto-scroll filtres */
  useEffect(() => {
    const el = filterRef.current
    if (!el) return

    const tick = () => {
      if (!filterPaused.current) {
        el.scrollLeft += 0.5
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth) el.scrollLeft = 0
      }
      filterFrame.current = requestAnimationFrame(tick)
    }

    filterFrame.current = requestAnimationFrame(tick)

    const pause  = () => { filterPaused.current = true }
    const resume = () => { filterPaused.current = false }

    el.addEventListener('mouseenter', pause)
    el.addEventListener('mouseleave', resume)
    el.addEventListener('touchstart', pause,  { passive: true })
    el.addEventListener('touchend',   resume)

    return () => {
      cancelAnimationFrame(filterFrame.current)
      el.removeEventListener('mouseenter', pause)
      el.removeEventListener('mouseleave', resume)
      el.removeEventListener('touchstart', pause)
      el.removeEventListener('touchend',   resume)
    }
  }, [])

  /* Clic filtre : active + centre + glider */
  const handleFilterClick = useCallback((cat: string) => {
    setActive(cat)
    moveGlider(cat)
    filterPaused.current = true

    const btn = btnRefs.current.get(cat)
    const el  = filterRef.current
    if (btn && el) {
      const btnCenter = btn.offsetLeft + btn.offsetWidth / 2
      el.scrollTo({ left: btnCenter - el.clientWidth / 2, behavior: 'smooth' })
    }

    setTimeout(() => { filterPaused.current = false }, 4000)
  }, [moveGlider])

  const trimmed    = query.trim().toLowerCase()
  const isSearching = trimmed.length > 0

  const searchResults = isSearching
    ? SERVICES.filter((s) =>
        s.name.toLowerCase().includes(trimmed) ||
        s.tagline.toLowerCase().includes(trimmed) ||
        s.category.toLowerCase().includes(trimmed)
      )
    : []

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

      {/* ── Filtres catégories ── */}
      {!isSearching && (
        <div className="sgrid__filters-wrap">
          <div className="sgrid__filters-marquee" ref={filterRef}>
            <div className="sgrid__filters-track" ref={trackRef}>
              {/* Glider animé */}
              <div className="sgrid__glider" style={glider} aria-hidden="true" />

              {CATEGORIES.map((cat: string, index: number) => (
                <button
                  key={`${cat}-${index}`}
                  ref={(el) => { if (el) btnRefs.current.set(cat, el) }}
                  onClick={() => handleFilterClick(cat)}
                  className="sgrid__filter-btn"
                  data-active={active === cat ? 'true' : 'false'}
                >
                  {cat}
                </button>
              ))}
            </div>
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
