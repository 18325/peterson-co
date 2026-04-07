'use client'

import React from 'react'

function WaveLabel({ text }: { text: string }) {
  return (
    <label className="wave-label">
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="wave-label__char"
          style={{ '--index': i } as React.CSSProperties}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </label>
  )
}

interface WaveInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  textarea?: boolean
  rows?: number
}

export default function WaveInput({ label, value, onChange, textarea = false, rows = 5 }: WaveInputProps) {
  const sharedProps = {
    className: `wave-group__input${textarea ? ' wave-group__input--textarea' : ''}`,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    placeholder: ' ',
  }

  return (
    <div className={`wave-group${textarea ? ' wave-group--textarea' : ''}`}>
      {textarea
        ? <textarea {...sharedProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>} rows={rows} />
        : <input type="text" {...sharedProps as React.InputHTMLAttributes<HTMLInputElement>} />
      }
      <WaveLabel text={label} />
      <span className="wave-group__bar" />
    </div>
  )
}
