'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Service, ServiceVariant, ServicePrice } from '@/types'
import { categoryToSlug } from '@/lib/format'
import { useCart } from '@/context/CartContext'
import { PAYMENT_METHODS, buildWhatsAppUrl, type PaymentMethodId } from './_data/payment'
import TrustBar from './_components/TrustBar'
import ImageColumn from './_components/ImageColumn'
import OrderPanel from './_components/OrderPanel'
import FaqSection from './_components/FaqSection'
import RelatedSection from './_components/RelatedSection'
import StickyBar from './_components/StickyBar'

export default function ProductDetail({ service }: { service: Service }) {
  const [selectedVariant,       setSelectedVariant]       = useState<ServiceVariant>(service.variants[0])
  const [selectedPrice,         setSelectedPrice]         = useState<ServicePrice>(() => service.variants[0].prices[0])
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodId>('mobilemoney')
  const [variantFeedbackId,     setVariantFeedbackId]     = useState(service.variants[0].id)
  const [durationFeedback,      setDurationFeedback]      = useState(service.variants[0].prices[0].duration)
  const { addItem } = useCart()

  const handleVariantChange = (variant: ServiceVariant) => {
    setSelectedVariant(variant)
    setSelectedPrice(variant.prices[0])
    setVariantFeedbackId(variant.id)
    setDurationFeedback(variant.prices[0].duration)
    window.setTimeout(() => setVariantFeedbackId(''), 700)
    window.setTimeout(() => setDurationFeedback(''), 700)
  }

  const handleDurationChange = (duration: string) => {
    const nextPrice = selectedVariant.prices.find((p) => p.duration === duration)
    if (!nextPrice) return
    setSelectedPrice(nextPrice)
    setDurationFeedback(duration)
    window.setTimeout(() => setDurationFeedback(''), 700)
  }

  const selectedPayment = PAYMENT_METHODS.find((m) => m.id === selectedPaymentMethod) ?? PAYMENT_METHODS[0]
  const whatsappUrl     = buildWhatsAppUrl(service, selectedVariant, selectedPrice, selectedPayment.label)
  const isPack          = Boolean(service.secondImage)

  return (
    <>
      <main className="pd-main">

        <div className="pd-breadcrumb-shell">
          <nav className="pd-breadcrumb" aria-label="Fil d'Ariane">
            <Link href="/" className="pd-breadcrumb__link">Accueil</Link>
            <span className="pd-breadcrumb__sep">›</span>
            <Link href="/#services" className="pd-breadcrumb__link">Abonnements</Link>
            <span className="pd-breadcrumb__sep">›</span>
            <Link href={`/services/category/${categoryToSlug(service.category)}`} className="pd-breadcrumb__link pd-breadcrumb__link--accent">
              {service.category}
            </Link>
            <span className="pd-breadcrumb__sep">›</span>
            <span className="pd-breadcrumb__current">{service.name}</span>
          </nav>
        </div>

        <TrustBar />

        <div className="pd-main-grid">
          <ImageColumn
            service={service}
            isPack={isPack}
            hasMultipleVariants={service.variants.length > 1}
            variantLabel={selectedVariant.label}
          />
          <OrderPanel
            service={service}
            selectedVariant={selectedVariant}
            selectedPrice={selectedPrice}
            selectedPaymentMethod={selectedPaymentMethod}
            variantFeedbackId={variantFeedbackId}
            durationFeedback={durationFeedback}
            whatsappUrl={whatsappUrl}
            onVariantChange={handleVariantChange}
            onDurationChange={handleDurationChange}
            onPaymentChange={setSelectedPaymentMethod}
            onAddToCart={() => addItem({
              serviceId:    service.id,
              serviceName:  service.name,
              serviceImage: service.image,
              variantLabel: selectedVariant.label,
              duration:     selectedPrice.duration,
              amount:       selectedPrice.amount,
              currency:     selectedPrice.currency,
            })}
          />
        </div>

        <FaqSection category={service.category} />
        <RelatedSection category={service.category} serviceId={service.id} />

      </main>

      <StickyBar service={service} amount={selectedPrice.amount} whatsappUrl={whatsappUrl} />
    </>
  )
}
