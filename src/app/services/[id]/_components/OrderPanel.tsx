import Image from 'next/image'
import type { Service, ServiceVariant, ServicePrice } from '@/types'
import { formatPrice } from '@/lib/format'
import WhatsAppIcon from '@/components/icons/WhatsAppIcon'
import { PAYMENT_METHODS, type PaymentMethodId } from '../_data/payment'

interface OrderPanelProps {
  service: Service
  selectedVariant: ServiceVariant
  selectedPrice: ServicePrice
  selectedPaymentMethod: PaymentMethodId
  variantFeedbackId: string
  durationFeedback: string
  whatsappUrl: string
  onVariantChange: (variant: ServiceVariant) => void
  onDurationChange: (duration: string) => void
  onPaymentChange: (id: PaymentMethodId) => void
  onAddToCart: () => void
}

export default function OrderPanel({
  service,
  selectedVariant,
  selectedPrice,
  selectedPaymentMethod,
  variantFeedbackId,
  durationFeedback,
  whatsappUrl,
  onVariantChange,
  onDurationChange,
  onPaymentChange,
  onAddToCart,
}: OrderPanelProps) {
  const hasMultipleVariants = service.variants.length > 1
  const selectedPayment = PAYMENT_METHODS.find((m) => m.id === selectedPaymentMethod) ?? PAYMENT_METHODS[0]

  return (
    <div className="pd-info-col">
      <div className="pd-order-panel" data-payment-method={selectedPayment.id}>

        <div className="pd-order-kicker">Commande rapide</div>

        <div className="pd-price-hero">
          <span className="pd-price-hero__amount">{formatPrice(selectedPrice.amount)}</span>
          <span className="pd-price-hero__currency">F CFA</span>
          {selectedPrice.duration && (
            <span className="pd-price-hero__per">/ {selectedPrice.duration}</span>
          )}
        </div>

        <div className="pd-order-meta">
          <span className="pd-order-chip">{selectedVariant.label}</span>
          <span className="pd-order-chip">{selectedPrice.duration}</span>
          <span className="pd-order-chip pd-order-chip--accent">{selectedPayment.label}</span>
        </div>

        {hasMultipleVariants && (
          <div className="pd-block">
            <p className="pd-block__label">Sélectionnez l&apos;offre</p>
            <div className="pd-variants">
              {service.variants.map((v) => {
                const minP     = Math.min(...v.prices.map((p) => p.amount))
                const isActive = v.id === selectedVariant.id
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => onVariantChange(v)}
                    className="pd-variant-btn"
                    data-active={isActive ? 'true' : 'false'}
                    data-feedback={variantFeedbackId === v.id ? 'true' : 'false'}
                    aria-pressed={isActive}
                  >
                    <span className="pd-variant-btn__tick" aria-hidden="true">✓</span>
                    <span className="pd-variant-btn__label">{v.label}</span>
                    <span className="pd-variant-btn__price">{formatPrice(minP)} F</span>
                  </button>
                )
              })}
            </div>
            <p className="pd-selection-note">
              Offre choisie : <strong>{selectedVariant.label}</strong>
            </p>
          </div>
        )}

        <div className="pd-block">
          <p className="pd-block__label">Sélectionnez la durée</p>
          <div className="pd-select-wrap" data-feedback={durationFeedback === selectedPrice.duration ? 'true' : 'false'}>
            <select
              className="pd-select"
              value={selectedPrice.duration}
              onChange={(e) => onDurationChange(e.target.value)}
            >
              {selectedVariant.prices.map((price) => (
                <option key={price.duration} value={price.duration}>
                  {price.duration}, {selectedVariant.label} — {formatPrice(price.amount)} {price.currency}{price.popular ? ' ★' : ''}
                </option>
              ))}
            </select>
            <svg className="pd-select-icon" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
          <p className="pd-selection-note">
            Durée choisie : <strong>{selectedPrice.duration}</strong>
          </p>
        </div>

        <div className="pd-block">
          <p className="pd-block__label">Description</p>
          <p className="pd-description">{selectedVariant.description}</p>
        </div>

        <div className="pd-block">
          <p className="pd-block__label">Ce qui est inclus</p>
          <ul className="pd-features">
            {selectedVariant.features.map((f) => (
              <li key={f} className="pd-feature">
                <span className="pd-feature__check">✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="pd-block">
          <p className="pd-block__label">Moyen de paiement</p>
          <div className="pd-payments pd-payments--secure">
            <div className="pd-payments__header">
              <div>
                <p className="pd-payments__title">Paiement 100 % sécurisé</p>
                <p className="pd-payments__label">Choisissez la méthode à transmettre ensuite au backend.</p>
              </div>
            </div>
            <div className="pd-payments__methods">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  className="pd-payment-option"
                  data-active={selectedPaymentMethod === method.id ? 'true' : 'false'}
                  data-payment-method={method.id}
                  aria-pressed={selectedPaymentMethod === method.id}
                  onClick={() => onPaymentChange(method.id)}
                >
                  <Image src={method.image} alt={method.label} width={48} height={28} className="pd-payment-option__img" />
                  <span className="pd-payment-option__label">{method.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pd-ctas pd-ctas--split">
          <button type="button" className="pd-cta-secondary" onClick={onAddToCart}>
            Ajouter au panier
          </button>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="pd-cta-main pd-cta-main--accent">
            <WhatsAppIcon size={20} />
            Valider
          </a>
        </div>

      </div>
    </div>
  )
}
