'use client'

import { useState } from 'react'
import { FAQ } from '../_data/contact'

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="cs-faq-item" data-open={open ? 'true' : 'false'} onClick={() => setOpen(v => !v)}>
      <div className="cs-faq-item__head">
        <p className="cs-faq-item__q">{q}</p>
        <span className="cs-faq-item__icon">{open ? '−' : '+'}</span>
      </div>
      {open && <p className="cs-faq-item__a">{a}</p>}
    </div>
  )
}

export default function ContactFaq() {
  return (
    <div className="cs-faq-list">
      {FAQ.map(item => (
        <FaqItem key={item.q} q={item.q} a={item.a} />
      ))}
    </div>
  )
}
