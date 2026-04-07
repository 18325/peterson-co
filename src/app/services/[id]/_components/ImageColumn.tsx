import Image from 'next/image'
import type { Service } from '@/types'

interface ImageColumnProps {
  service: Service
  isPack: boolean
  hasMultipleVariants: boolean
  variantLabel: string
}

export default function ImageColumn({ service, isPack, hasMultipleVariants, variantLabel }: ImageColumnProps) {
  return (
    <div className="pd-img-col">
      <div className="pd-showcase-card">
        <button type="button" className="pd-showcase__fav" aria-label="Ajouter aux favoris">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6 6 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"/>
          </svg>
        </button>

        <div className="pd-img-wrap">
          {isPack ? (
            <div className="pd-img-pack">
              <div className="pd-img-pack__half">
                <Image src={service.image!} alt={service.name} fill className="object-contain p-8" />
              </div>
              <div className="pd-img-pack__sep" />
              <div className="pd-img-pack__half">
                <Image src={service.secondImage!} alt="" fill className="object-contain p-8" />
              </div>
            </div>
          ) : service.image ? (
            <Image src={service.image} alt={service.name} fill className="object-contain p-10" />
          ) : (
            <span className="text-8xl">{service.emoji}</span>
          )}
        </div>
      </div>

      <div className="pd-showcase-copy">
        <h1 className="pd-title font-title">{service.name}</h1>
        <p className="pd-tagline">{service.tagline}</p>
      </div>

      <div className="pd-showcase-facts">
        <div className="pd-showcase-fact">
          <span className="pd-showcase-fact__label">Catégorie</span>
          <span className="pd-showcase-fact__value">{service.category}</span>
        </div>
        <div className="pd-showcase-fact">
          <span className="pd-showcase-fact__label">Type</span>
          <span className="pd-showcase-fact__value">
            {isPack ? 'Pack' : hasMultipleVariants ? variantLabel : 'Accès direct'}
          </span>
        </div>
      </div>
    </div>
  )
}
