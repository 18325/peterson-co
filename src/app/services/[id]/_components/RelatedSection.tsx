import Link from 'next/link'
import Image from 'next/image'
import type { Service } from '@/types'
import { formatPrice, categoryToSlug } from '@/lib/format'
import { SERVICES } from '@/constants/services'

function RelatedCard({ service }: { service: Service }) {
  const lowestPrice  = Math.min(...service.variants.flatMap((v) => v.prices.map((p) => p.amount)))
  const highestPrice = Math.max(...service.variants.flatMap((v) => v.prices.map((p) => p.amount)))
  const hasRange     = highestPrice !== lowestPrice

  return (
    <Link href={`/services/${service.id}`} className="rel-card group block flex-shrink-0">
      <div className="rel-card__img">
        {service.image ? (
          <Image src={service.image} alt={service.name} fill className="object-contain p-4 transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <span className="text-3xl">{service.emoji}</span>
        )}
      </div>
      <div className="rel-card__body">
        <p className="rel-card__cat">{service.category}</p>
        <p className="rel-card__name">{service.name}</p>
        <p className="rel-card__price">
          <span>{formatPrice(lowestPrice)}</span>
          {hasRange && ` – ${formatPrice(highestPrice)}`} F
        </p>
        <span className="rel-card__btn">S&apos;abonner</span>
      </div>
    </Link>
  )
}

export default function RelatedSection({ category, serviceId }: { category: string; serviceId: string }) {
  const related = SERVICES
    .filter((s) => s.category === category && s.id !== serviceId)
    .slice(0, 6)

  if (related.length === 0) return null

  return (
    <div className="pd-related">
      <div className="pd-related__inner">
        <div className="pd-related__head">
          <h2 className="pd-related__title font-title">Produits similaires</h2>
          <Link href={`/services/category/${categoryToSlug(category)}`} className="pd-related__all">
            Voir tous →
          </Link>
        </div>
        <div className="pd-related__track">
          {related.map((s) => <RelatedCard key={s.id} service={s} />)}
        </div>
      </div>
    </div>
  )
}
