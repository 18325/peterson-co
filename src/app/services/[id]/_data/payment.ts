import type { Service, ServiceVariant, ServicePrice } from '@/types'
import { formatPrice } from '@/lib/format'
import { WHATSAPP_NUMBER } from '@/constants/config'

export type PaymentMethodId = 'wave' | 'mobilemoney' | 'moovmoney' | 'visa' | 'mastercard'

export const PAYMENT_METHODS: Array<{ id: PaymentMethodId; label: string; image: string }> = [
  { id: 'wave',        label: 'Wave',        image: '/assets/images/wave.jpg'        },
  { id: 'mobilemoney', label: 'Mobile Money', image: '/assets/images/mobilemoney.jpg' },
  { id: 'moovmoney',   label: 'Moov Money',   image: '/assets/images/moovmoney.png'   },
  { id: 'visa',        label: 'Visa',         image: '/assets/images/visa.jpg'        },
  { id: 'mastercard',  label: 'Mastercard',   image: '/assets/images/mastercard.jpg'  },
]

export function buildWhatsAppUrl(
  service: Service,
  variant: ServiceVariant,
  price: ServicePrice,
  paymentLabel: string,
): string {
  const text = `Bonjour ! Je souhaite commander :\n\n*${service.name}*\nOffre : ${variant.label}\nDurée : ${price.duration}\nPrix : ${formatPrice(price.amount)} ${price.currency}\nPaiement : ${paymentLabel}\n\nMerci de confirmer la disponibilité.`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}
