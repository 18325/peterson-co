import Link from 'next/link'
import { categoryToSlug } from '@/lib/format'
import { SERVICES } from '@/constants/services'
import ServiceCard from '@/components/sections/ServicesCard'

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
          {related.map((s) => <ServiceCard key={s.id} service={s} />)}
        </div>
      </div>
    </div>
  )
}
