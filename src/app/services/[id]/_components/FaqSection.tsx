'use client'

import { useState } from 'react'
import { CATEGORY_FAQ, DEFAULT_FAQ } from '../_data/faq'

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

export default function FaqSection({ category }: { category: string }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const faqList = CATEGORY_FAQ[category] ?? DEFAULT_FAQ

  return (
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
  )
}
