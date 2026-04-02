import Link from 'next/link'
import Image from 'next/image'
import type { Service } from '@/types'
import { formatPrice } from '@/lib/format'

function ctaLabel(service: Service): string {
  if (Boolean(service.secondImage) || service.variants.length > 1) return 'Choix des options'
  if (service.variants[0].prices.length > 1) return "Voir l'offre"
  return 'Ajouter au panier'
}

export default function ServiceCard({ service }: { service: Service }) {
  const allPrices = service.variants.flatMap((v) => v.prices.map((p) => p.amount))
  const lowestPrice  = Math.min(...allPrices)
  const highestPrice = Math.max(...allPrices)
  const hasRange = highestPrice !== lowestPrice
  const isPack = Boolean(service.secondImage)
  const label = ctaLabel(service)

  return (
    <Link href={`/services/${service.id}`} className="scard group block flex-shrink-0">
      <div className="scard__card">
        <div className="scard__media">
          {isPack ? (
            <div className="scard__pack">
              <div className="scard__pack-half">
                <Image src={service.image!} alt={service.name} fill
                  className="object-contain p-5 transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="scard__pack-divider" />
              <div className="scard__pack-half">
                <Image src={service.secondImage!} alt="" fill
                  className="object-contain p-5 transition-transform duration-500 group-hover:scale-110" />
              </div>
            </div>
          ) : service.image ? (
            <Image src={service.image} alt={service.name} fill
              className="object-contain transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <span className="text-5xl">{service.emoji}</span>
          )}

        </div>

        <div className="scard__body">
          <p className="scard__name">{service.name}</p>
          <p className="scard__price">
            <span>{formatPrice(lowestPrice)} F</span>
            {hasRange && <em> – {formatPrice(highestPrice)} F</em>}
          </p>

          <div className="scard__cta">
            <span>{label}</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>

      </div>
    </Link>
  )
}
