import Image from 'next/image'
import type { Service } from '@/types'
import { formatPrice } from '@/lib/format'

interface StickyBarProps {
  service: Service
  amount: number
  whatsappUrl: string
}

export default function StickyBar({ service, amount, whatsappUrl }: StickyBarProps) {
  return (
    <div className="pd-sticky">
      <div className="pd-sticky__inner">
        <div className="pd-sticky__left">
          {service.image && (
            <div className="pd-sticky__thumb">
              <Image src={service.image} alt={service.name} fill sizes="44px" className="object-contain p-1" />
            </div>
          )}
          <div>
            <p className="pd-sticky__name">{service.name}</p>
            <p className="pd-sticky__price">{formatPrice(amount)} F CFA</p>
          </div>
        </div>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="pd-sticky__cta btn-whatsapp">
          Commander →
        </a>
      </div>
    </div>
  )
}
