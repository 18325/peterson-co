'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import type { Service } from '@/types'
import { formatPrice } from '@/lib/format'
import { useCart } from '@/context/CartContext'

type ServiceCardProps = {
  service: Service
  hiddenFromA11y?: boolean
}

function ctaLabel(service: Service): string {
  if (Boolean(service.secondImage) || service.variants.length > 1) return 'Choix des options'
  if (service.variants[0].prices.length > 1) return "Voir l'offre"
  return 'Ajouter au panier'
}

const SERVICE_CARD_IMAGE_SIZES = '(max-width: 639px) 44vw, (max-width: 1023px) 32vw, (max-width: 1279px) 22vw, 20vw'
const SERVICE_PACK_IMAGE_SIZES = '(max-width: 639px) 22vw, (max-width: 1023px) 16vw, (max-width: 1279px) 11vw, 10vw'

export default function ServiceCard({ service, hiddenFromA11y = false }: ServiceCardProps) {
  const allPrices   = service.variants.flatMap((v) => v.prices.map((p) => p.amount))
  const lowestPrice = Math.min(...allPrices)
  const isPack      = Boolean(service.secondImage)
  const label       = ctaLabel(service)
  const isDirectAdd = label === 'Ajouter au panier'

  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    const variant = service.variants[0]
    const price   = variant.prices[0]

    addItem({
      serviceId:    service.id,
      serviceName:  service.name,
      serviceImage: service.image,
      variantLabel: variant.label,
      duration:     price.duration,
      amount:       price.amount,
      currency:     price.currency,
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Link
      href={`/services/${service.id}`}
      className="scard group block flex-shrink-0"
      aria-hidden={hiddenFromA11y || undefined}
      tabIndex={hiddenFromA11y ? -1 : undefined}
    >
      <div className="scard__card">

        {/* ── Haut : logo sur fond clair ── */}
        <div className="scard__top">
          {isPack ? (
            <div className="scard__pack">
              <div className="scard__pack-half">
                <Image src={service.image!} alt={service.name} fill
                  sizes={SERVICE_PACK_IMAGE_SIZES}
                  className="object-contain p-3 transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="scard__pack-divider" />
              <div className="scard__pack-half">
                <Image src={service.secondImage!} alt="" fill
                  sizes={SERVICE_PACK_IMAGE_SIZES}
                  className="object-contain p-3 transition-transform duration-500 group-hover:scale-110" />
              </div>
            </div>
          ) : service.image ? (
            <Image src={service.image} alt={service.name} fill
              sizes={SERVICE_CARD_IMAGE_SIZES}
              className="object-contain p-3 transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <span className="scard__emoji">{service.emoji}</span>
          )}
        </div>

        {/* ── Vague SVG ── */}
        <div className="scard__wave">
          <svg viewBox="0 0 200 28" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,14 C40,28 80,0 120,14 C160,28 180,8 200,14 L200,28 L0,28 Z"
              fill="var(--scard-bottom-bg)" />
            <path d="M0,14 C40,28 80,0 120,14 C160,28 180,8 200,14"
              fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
          </svg>
        </div>

        {/* ── Bas : fond coloré + prix / CTA au hover ── */}
        <div className="scard__bottom">
          {/* Prix */}
          <div className="scard__price-block">
            <span className="scard__label">{service.name}</span>
            <span className="scard__from">à partir de</span>
            <p className="scard__price">{formatPrice(lowestPrice)}<em>F</em></p>
          </div>

          {/* CTA */}
          <div className="scard__cta">
            {isDirectAdd ? (
              <button
                className={`scard__cta-inner ${added ? 'scard__cta-inner--added' : ''}`}
                onClick={handleAddToCart}
                tabIndex={hiddenFromA11y ? -1 : undefined}
              >
                {added ? (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>Ajouté !</span>
                  </>
                ) : (
                  <>
                    <span>{label}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            ) : (
              <div className="scard__cta-inner">
                <span>{label}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        </div>

      </div>
    </Link>
  )
}
