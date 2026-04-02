// app/services/[id]/ProductDetail.tsx  — Client Component
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Service, ServiceVariant, ServicePrice } from '@/types'
import { formatPrice, categoryToSlug } from '@/lib/format'
import { WHATSAPP_NUMBER } from '@/constants/config'
import { SERVICES } from '@/constants/services'
import { useCart } from '@/context/CartContext'

type PaymentMethodId = 'wave' | 'mobilemoney' | 'moovmoney' | 'visa' | 'mastercard'

const PAYMENT_METHODS: Array<{
  id: PaymentMethodId
  label: string
  image: string
}> = [
  { id: 'wave',        label: 'Wave',        image: '/assets/images/wave.jpg'        },
  { id: 'mobilemoney', label: 'Mobile Money', image: '/assets/images/mobilemoney.jpg' },
  { id: 'moovmoney',   label: 'Moov Money',   image: '/assets/images/moovmoney.png'   },
  { id: 'visa',        label: 'Visa',         image: '/assets/images/visa.jpg'        },
  { id: 'mastercard',  label: 'Mastercard',   image: '/assets/images/mastercard.jpg'  },
]

/* ── WhatsApp URL ── */
function buildWhatsAppUrl(
  service: Service,
  variant: ServiceVariant,
  price: ServicePrice,
  paymentMethodLabel: string,
): string {
  const text = `Bonjour ! Je souhaite commander :\n\n*${service.name}*\nOffre : ${variant.label}\nDurée : ${price.duration}\nPrix : ${formatPrice(price.amount)} ${price.currency}\nPaiement : ${paymentMethodLabel}\n\nMerci de confirmer la disponibilité.`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

/* ── FAQ par catégorie ── */
const CATEGORY_FAQ: Record<string, Array<{ q: string; a: string }>> = {
  'Streaming Vidéo': [
    { q: 'Comment accéder au service après commande ?', a: 'Vous recevez vos identifiants de connexion directement sur WhatsApp en moins de 30 minutes. Il suffit de les saisir dans l\'application correspondante.' },
    { q: 'Sur combien d\'appareils puis-je me connecter ?', a: 'Cela dépend de l\'offre choisie. L\'offre 1 écran = 1 appareil simultané. Le compte privé permet jusqu\'à 4 écrans selon le plan.' },
    { q: 'Que faire si mon accès ne fonctionne plus ?', a: 'Contactez-nous immédiatement sur WhatsApp. Nous garantissons votre accès et résolvons tout problème dans les plus brefs délais, sans frais supplémentaires.' },
    { q: 'Puis-je regarder en qualité 4K ?', a: 'Oui, selon l\'offre sélectionnée. Les offres Standard et Premium incluent la 4K Ultra HD sur les appareils compatibles.' },
  ],
  'Pack Streaming': [
    { q: 'Comment fonctionnent les packs combinés ?', a: 'Vous recevez les accès des deux services dans le même message WhatsApp. Chaque service s\'active indépendamment sur son application.' },
    { q: 'Les deux services ont-ils la même durée ?', a: 'Oui, les deux abonnements du pack démarrent en même temps et ont la même durée de validité.' },
    { q: 'Puis-je renouveler un seul service du pack ?', a: 'Absolument. Vous pouvez renouveler chaque service séparément ou reconduire le pack complet à prix réduit.' },
  ],
  'Musique': [
    { q: 'Comment activer mon abonnement musical ?', a: 'Après confirmation, vous recevez vos accès sur WhatsApp. Ouvrez l\'application, connectez-vous avec les identifiants fournis et profitez de la musique sans publicité.' },
    { q: 'Puis-je écouter hors-ligne ?', a: 'Oui, tous nos abonnements musique incluent le téléchargement pour écoute offline sur vos appareils.' },
    { q: 'La qualité audio est-elle garantie ?', a: 'Oui, nos abonnements incluent la qualité audio maximale du service (Lossless, HiFi, ou Premium selon la plateforme).' },
  ],
  'Sécurité & VPN': [
    { q: 'Comment installer le VPN après commande ?', a: 'Nous vous envoyons un guide d\'installation complet sur WhatsApp avec votre clé de licence. L\'installation prend moins de 5 minutes.' },
    { q: 'Combien d\'appareils puis-je protéger simultanément ?', a: 'Selon le service VPN, entre 5 et 10 appareils simultanés. Nous précisons le nombre exact dans l\'offre.' },
    { q: 'Mon adresse IP sera-t-elle masquée ?', a: 'Oui, le VPN masque votre IP et chiffre votre connexion. Vous pouvez choisir le pays du serveur de connexion.' },
  ],
  'Applications': [
    { q: 'Comment activer l\'application Pro ?', a: 'Vous recevez un code ou des accès directs via WhatsApp. L\'activation est immédiate et vous guidons si nécessaire.' },
    { q: 'L\'abonnement inclut-il toutes les fonctionnalités Premium ?', a: 'Oui, vous bénéficiez de l\'intégralité des fonctionnalités de l\'offre Premium ou Pro de l\'application.' },
  ],
  'Intelligence Artificielle': [
    { q: 'Comment accéder à l\'IA après commande ?', a: 'Vous recevez vos identifiants sur WhatsApp. Connectez-vous sur le site ou l\'application de l\'IA avec ces accès.' },
    { q: 'Les limites d\'utilisation sont-elles levées ?', a: 'Oui, avec l\'abonnement Premium vous bénéficiez des limites étendues (GPT-4, génération d\'images, plugins, etc.) selon le plan.' },
    { q: 'Puis-je utiliser l\'IA sur mobile et PC ?', a: 'Oui, tous nos abonnements IA sont compatibles mobile, tablette et ordinateur. Accès multi-appareils inclus.' },
  ],
}

const DEFAULT_FAQ = [
  { q: 'Comment se passe la livraison ?', a: 'Vous recevez vos accès directement sur WhatsApp en moins de 30 minutes après confirmation de votre paiement.' },
  { q: 'Le paiement est-il sécurisé ?', a: 'Oui, nous acceptons Wave, Orange Money, MTN MoMo et Visa. Toutes les transactions sont protégées.' },
  { q: 'Et si mon accès ne fonctionne pas ?', a: 'Nous garantissons votre compte. Contactez-nous sur WhatsApp et nous résolvons le problème immédiatement et sans frais.' },
]

/* ── Accordion FAQ item ── */
function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="faq-item" data-open={isOpen ? 'true' : 'false'}>
      <button className="faq-item__btn" onClick={onToggle}>
        <span className="faq-item__q">{q}</span>
        <span className="faq-item__icon">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <div className="faq-item__answer">{a}</div>}
    </div>
  )
}

/* ── Carte produit similaire ── */
function RelatedCard({ service }: { service: Service }) {
  const lowestPrice = Math.min(...service.variants.flatMap((v) => v.prices.map((p) => p.amount)))
  const highestPrice = Math.max(...service.variants.flatMap((v) => v.prices.map((p) => p.amount)))
  const hasRange = highestPrice !== lowestPrice
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

/* ════════════════════════════
   COMPOSANT PRINCIPAL
   ════════════════════════════ */
export default function ProductDetail({ service }: { service: Service }) {
  const [selectedVariant, setSelectedVariant] = useState<ServiceVariant>(service.variants[0])
  const [selectedPrice, setSelectedPrice] = useState<ServicePrice>(
    () => service.variants[0].prices[0]
  )
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodId>('mobilemoney')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const { addItem } = useCart()
  const [variantFeedbackId, setVariantFeedbackId] = useState(service.variants[0].id)
  const [durationFeedback, setDurationFeedback] = useState(service.variants[0].prices[0].duration)

  const handleVariantChange = (variant: ServiceVariant) => {
    setSelectedVariant(variant)
    setSelectedPrice(variant.prices[0])
    setVariantFeedbackId(variant.id)
    setDurationFeedback(variant.prices[0].duration)
    window.setTimeout(() => setVariantFeedbackId(''), 700)
    window.setTimeout(() => setDurationFeedback(''), 700)
  }

  const handleDurationChange = (duration: string) => {
    const nextPrice = selectedVariant.prices.find((price) => price.duration === duration)
    if (!nextPrice) return
    setSelectedPrice(nextPrice)
    setDurationFeedback(duration)
    window.setTimeout(() => setDurationFeedback(''), 700)
  }

  const isPack = Boolean(service.secondImage)
  const hasMultipleVariants = service.variants.length > 1

  const related = SERVICES
    .filter((s) => s.category === service.category && s.id !== service.id)
    .slice(0, 6)

  const faqList = CATEGORY_FAQ[service.category] ?? DEFAULT_FAQ
  const selectedPayment = PAYMENT_METHODS.find((method) => method.id === selectedPaymentMethod) ?? PAYMENT_METHODS[0]
  const whatsappUrl = buildWhatsAppUrl(service, selectedVariant, selectedPrice, selectedPayment.label)

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

      <div className="pd-top-shell">
        <div className="pd-trust-bar">
          <div className="pd-trust-bar__inner">
            {[
              {
                title: 'Livraison instantanée',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                ),
                color: '#F97316',
              },
              {
                title: 'Paiement sécurisé',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <polyline points="9 12 11 14 15 10"/>
                  </svg>
                ),
                color: '#2277C4',
              },
              {
                title: 'Accès immédiat',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="9 12 11 14 15 10"/>
                  </svg>
                ),
                color: '#229422',
              },
            ].map(({ title, icon, color }) => (
              <div key={title} className="pd-trust-bar__item">
                <span className="pd-trust-bar__icon" style={{ color }}>{icon}</span>
                <p className="pd-trust-bar__title">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section principale : image gauche + infos droite ── */}
      <div className="pd-main-grid">

        {/* COLONNE GAUCHE — image */}
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
                {isPack ? 'Pack' : hasMultipleVariants ? selectedVariant.label : 'Accès direct'}
              </span>
            </div>
          </div>
        </div>

        {/* COLONNE DROITE — infos & commande */}
        <div className="pd-info-col">
          <div className="pd-order-panel" data-payment-method={selectedPayment.id}>

            <div className="pd-order-kicker">Commande rapide</div>

            {/* Prix principal */}
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

            {/* Sélecteur de variant */}
            {hasMultipleVariants && (
              <div className="pd-block">
                <p className="pd-block__label">Sélectionnez l&apos;offre</p>
                <div className="pd-variants">
                  {service.variants.map((v) => {
                    const minP = Math.min(...v.prices.map((p) => p.amount))
                    const isActive = v.id === selectedVariant.id
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => handleVariantChange(v)}
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

            {/* Sélecteur de durée */}
            <div className="pd-block">
              <p className="pd-block__label">Sélectionnez la durée</p>
              <div className="pd-select-wrap" data-feedback={durationFeedback === selectedPrice.duration ? 'true' : 'false'}>
                <select
                  className="pd-select"
                  value={selectedPrice.duration}
                  onChange={(e) => handleDurationChange(e.target.value)}
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
                Duree choisie : <strong>{selectedPrice.duration}</strong>
              </p>
            </div>

            <div className="pd-block">
              <p className="pd-block__label">Description</p>
              <p className="pd-description">
                {selectedVariant.description}
              </p>
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

            {/* Moyens de paiement */}
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
                      onClick={() => setSelectedPaymentMethod(method.id)}
                    >
                      <Image src={method.image} alt={method.label} width={48} height={28} className="pd-payment-option__img" />
                      <span className="pd-payment-option__label">{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pd-ctas pd-ctas--split">
              <button
                type="button"
                className="pd-cta-secondary"
                onClick={() => addItem({
                  serviceId: service.id,
                  serviceName: service.name,
                  serviceImage: service.image,
                  variantLabel: selectedVariant.label,
                  duration: selectedPrice.duration,
                  amount: selectedPrice.amount,
                  currency: selectedPrice.currency,
                })}
              >
                Ajouter au panier
              </button>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="pd-cta-main pd-cta-main--accent">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
                Valider
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* ── FAQ (SenPremium) ── */}
      <div className="pd-faq">
        <div className="pd-faq__inner">
          <h2 className="pd-faq__title font-title">FAQ&apos;s</h2>
          <div className="pd-faq__list">
            {faqList.map((item, i) => (
              <FaqItem
                key={i}
                q={item.q}
                a={item.a}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Produits similaires (Wabonnement + SenPremium) ── */}
      {related.length > 0 && (
        <div className="pd-related">
          <div className="pd-related__inner">
            <div className="pd-related__head">
              <h2 className="pd-related__title font-title">Produits similaires</h2>
              <Link href={`/services/category/${categoryToSlug(service.category)}`} className="pd-related__all">
                Voir tous →
              </Link>
            </div>
            <div className="pd-related__track">
              {related.map((s) => <RelatedCard key={s.id} service={s} />)}
            </div>
          </div>
        </div>
      )}

    </main>

    {/* ── Sticky bottom bar (Wabonnement) ── */}
    <div className="pd-sticky">
      <div className="pd-sticky__inner">
        <div className="pd-sticky__left">
          {service.image && (
            <div className="pd-sticky__thumb">
              <Image src={service.image} alt={service.name} fill className="object-contain p-1" />
            </div>
          )}
          <div>
            <p className="pd-sticky__name">{service.name}</p>
            <p className="pd-sticky__price">{formatPrice(selectedPrice.amount)} F CFA</p>
          </div>
        </div>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="pd-sticky__cta btn-whatsapp">
          Commander →
        </a>
      </div>
    </div>
    </>
  )
}
