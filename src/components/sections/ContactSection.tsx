'use client'

import { useState } from 'react'
import { WHATSAPP_NUMBER } from '@/constants/config'

const FAQ = [
  {
    q: 'Combien de temps pour recevoir mon compte ?',
    a: 'Moins de 30 minutes après confirmation du paiement, directement sur WhatsApp.',
  },
  {
    q: 'Quels modes de paiement acceptez-vous ?',
    a: 'Wave, Orange Money, MTN MoMo et carte bancaire (Visa/Mastercard).',
  },
  {
    q: 'Que se passe-t-il si le compte ne fonctionne pas ?',
    a: 'On remplace immédiatement ou on rembourse dans les 24h — garanti.',
  },
  {
    q: 'Puis-je renouveler mon abonnement ?',
    a: 'Oui, contactez-nous sur WhatsApp avant l\'expiration et on s\'en occupe.',
  },
]

export default function ContactSection() {
  const [name, setName]       = useState('')
  const [message, setMessage] = useState('')

  const whatsappUrl = () => {
    const text = name
      ? `Bonjour ! Je m'appelle *${name.trim()}*.\n\n${message.trim()}`
      : message.trim()
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
  }

  const canSend = message.trim().length > 0

  return (
    <section id="contact" className="contact-section px-6 py-24 max-w-6xl mx-auto">

      {/* En-tête */}
      <div className="text-center mb-16">
        <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--cyan)' }}>
          05 · Contact
        </p>
        <h2
          className="font-title"
          style={{ fontSize: 'clamp(36px, 6vw, 64px)', color: 'var(--text-main)', lineHeight: 1, marginBottom: '16px' }}
        >
          On est là pour vous
        </h2>
        <p className="max-w-lg mx-auto font-light" style={{ color: 'var(--text-muted)', fontSize: '17px' }}>
          Une question, un problème, une commande ? Écrivez-nous directement sur WhatsApp — réponse en moins d&apos;1h.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* ── Colonne gauche : formulaire WhatsApp ── */}
        <div className="card p-8 relative">

          <div className="relative z-10 flex flex-col gap-6">

          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--cyan)' }}>
              Envoyer un message
            </p>

            {/* Nom (optionnel) */}
            <div className="flex flex-col gap-1 mb-4">
              <label className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                Votre prénom (optionnel)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex : Kofi"
                className="contact-input w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--text-main)',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                Votre message <span style={{ color: 'var(--cyan)' }}>*</span>
              </label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Bonjour, je voudrais commander Netflix 1 écran 2 mois..."
                className="contact-input contact-input--textarea w-full rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--text-main)',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--border-strong)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>
          </div>

          {/* CTA WhatsApp */}
          <a
            href={canSend ? whatsappUrl() : undefined}
            target={canSend ? '_blank' : undefined}
            rel="noopener noreferrer"
            onClick={(e) => { if (!canSend) e.preventDefault() }}
            className="btn-whatsapp w-full justify-center text-base py-4"
            style={{ opacity: canSend ? 1 : 0.45, cursor: canSend ? 'pointer' : 'not-allowed' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            Envoyer sur WhatsApp
          </a>

          <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
            Ce bouton ouvrira WhatsApp avec votre message pré-rempli.
          </p>

          {/* Infos de contact directes */}
          <div
            className="rounded-xl p-4 flex flex-col gap-3"
            style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--whatsapp)', fontSize: '18px' }}>·</span>
              <span>Disponible <strong style={{ color: 'var(--text-main)' }}>7j/7 de 8h à 22h</strong></span>
            </div>
            <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
              <span style={{ fontSize: '18px' }}>·</span>
              <span>Réponse en <strong style={{ color: 'var(--text-main)' }}>moins d&apos;1h</strong> en moyenne</span>
            </div>
            <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
              <span style={{ fontSize: '18px' }}>·</span>
              <span>Afrique de l&apos;Ouest & diaspora</span>
            </div>
          </div>

          </div>{/* end z-10 wrapper */}
        </div>

        {/* ── Colonne droite : FAQ ── */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--cyan)' }}>
            Questions fréquentes
          </p>
          {FAQ.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}

          {/* Lien WhatsApp direct */}
          <div
            className="mt-4 rounded-2xl p-6 text-center"
            style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
          >
            <p className="text-sm font-medium mb-4" style={{ color: 'var(--text-muted)' }}>
              Vous avez une autre question ?
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              Ouvrir WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}

// ── Sous-composant accordéon FAQ ──────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="card overflow-hidden cursor-pointer"
      onClick={() => setOpen((v) => !v)}
    >
      <div className="flex items-center justify-between gap-4 p-5">
        <p className="text-sm font-semibold" style={{ color: 'var(--text-main)' }}>{q}</p>
        <span
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
          style={{
            backgroundColor: 'rgba(0,212,255,0.08)',
            border: '1px solid var(--border-strong)',
            color: 'var(--cyan)',
          }}
        >
          {open ? '−' : '+'}
        </span>
      </div>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>{a}</p>
        </div>
      )}
    </div>
  )
}
