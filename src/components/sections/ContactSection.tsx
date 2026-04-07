'use client'

import { useState } from 'react'
import { WHATSAPP_NUMBER } from '@/constants/config'
import WhatsAppIcon from '@/components/icons/WhatsAppIcon'
import WaveInput from './_components/WaveInput'
import ContactFaq from './_components/ContactFaq'
import { TRUST_ITEMS } from './_data/contact'

function buildWhatsAppUrl(name: string, message: string): string {
  const text = name
    ? `Bonjour ! Je m'appelle *${name}*.\n\n${message}`
    : message
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

export default function ContactSection() {
  const [name,    setName]    = useState('')
  const [message, setMessage] = useState('')

  const canSend = message.trim().length > 0

  return (
    <section id="contact" className="contact-section cs-section">

      <div className="cs-header">
        <p className="cs-header__eyebrow">05 · Fiabilité &amp; Transparence</p>
        <h2 className="cs-header__title font-title">On est là pour vous</h2>
        <p className="cs-header__sub">
          Question, problème ou commande — écrivez-nous sur WhatsApp, réponse en moins d&apos;1h.
        </p>
      </div>

      <div className="cs-grid">

        {/* Colonne gauche : formulaire */}
        <div className="cs-form-col">
          <p className="cs-col-label">Envoyer un message</p>

          <WaveInput label="Votre prénom (optionnel)" value={name} onChange={setName} />
          <WaveInput label="Votre message *" value={message} onChange={setMessage} textarea />

          <a
            href={canSend ? buildWhatsAppUrl(name.trim(), message.trim()) : undefined}
            target={canSend ? '_blank' : undefined}
            rel="noopener noreferrer"
            onClick={e => { if (!canSend) e.preventDefault() }}
            className="cs-wa-btn"
            data-disabled={!canSend ? 'true' : 'false'}
          >
            <WhatsAppIcon />
            Envoyer sur WhatsApp
          </a>

          <p className="cs-form-hint">Ce bouton ouvrira WhatsApp avec votre message pré-rempli.</p>

          <div className="cs-trust-chips">
            {TRUST_ITEMS.map(({ icon, label }) => (
              <div key={label} className="cs-trust-chip">
                <span className="cs-trust-chip__icon">{icon}</span>
                <span className="cs-trust-chip__label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne droite : FAQ */}
        <div className="cs-faq-col">
          <p className="cs-col-label">Questions fréquentes</p>

          <ContactFaq />

          <div className="cs-wa-card">
            <p className="cs-wa-card__text">Vous avez une autre question ?</p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cs-wa-btn cs-wa-btn--outline"
            >
              <WhatsAppIcon />
              Ouvrir WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
