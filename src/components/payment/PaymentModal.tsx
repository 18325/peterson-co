'use client'

import { useState } from 'react'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (data: { email: string; phone: string }) => void
  amount: number
  serviceName: string
}

/**
 * Validates that a phone string is a plausible international number.
 * Accepts an optional leading "+", then 7-15 digits (E.164).
 */
function isValidPhone(raw: string): boolean {
  const cleaned = raw.replace(/^\+/, '').replace(/[\s\-().]/g, '')
  if (!/^\d+$/.test(cleaned)) return false
  return cleaned.length >= 7 && cleaned.length <= 15
}

export default function PaymentModal({ isOpen, onClose, onConfirm, amount, serviceName }: PaymentModalProps) {
  const [email, setEmail] = useState('')
  const [countryCode, setCountryCode] = useState('+229')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [phoneError, setPhoneError] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPhoneError('')

    // Clean the phone number and combine with country code
    let cleanedPhone = phone.replace(/^\+/, '').replace(/^00/, '').replace(/[\s\-().]/g, '')
    // Some countries have leading 0s for local numbers that need to be dropped when using country code
    if (countryCode === '+33' && cleanedPhone.startsWith('0')) {
      cleanedPhone = cleanedPhone.substring(1)
    }

    const fullPhone = `${countryCode}${cleanedPhone}`

    if (!isValidPhone(fullPhone)) {
      setPhoneError('Numéro invalide. Veuillez vérifier le format de votre numéro.')
      return
    }

    setLoading(true)
    try {
      await onConfirm({ email, phone: fullPhone })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-[2rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Finaliser le paiement</h3>
              <p className="text-gray-500 text-sm mt-1">{serviceName}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="bg-[#f8f9fa] rounded-2xl p-4 mb-8 flex items-center justify-between">
            <span className="text-gray-600 font-medium">Total à payer</span>
            <span className="text-2xl font-bold text-black">{amount.toLocaleString()} F CFA</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                Adresse Email
              </label>
              <input
                required
                type="email"
                placeholder="votre@email.com"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                Numéro WhatsApp
              </label>
              <div className="flex gap-2">
                <select
                  className="w-1/3 px-3 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all font-medium"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  <option value="+229">🇧🇯 +229</option>
                  <option value="+228">🇹🇬 +228</option>
                  <option value="+225">🇨🇮 +225</option>
                  <option value="+221">🇸🇳 +221</option>
                  <option value="+223">🇲🇱 +223</option>
                  <option value="+226">🇧🇫 +226</option>
                  <option value="+227">🇳🇪 +227</option>
                  <option value="+237">🇨🇲 +237</option>
                  <option value="+241">🇬🇦 +241</option>
                  <option value="+242">🇨🇬 +242</option>
                  <option value="+243">🇨🇩 +243</option>
                  <option value="+33">🇫🇷 +33</option>
                  <option value="+1">🇺🇸/🇨🇦 +1</option>
                </select>
                <input
                  required
                  type="tel"
                  placeholder="01 00 00 00 00"
                  className={`w-2/3 px-5 py-4 bg-gray-50 border rounded-2xl focus:ring-2 outline-none transition-all ${
                    phoneError
                      ? 'border-red-400 focus:ring-red-300'
                      : 'border-gray-100 focus:ring-black'
                  }`}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                    if (phoneError) setPhoneError('')
                  }}
                />
              </div>
              {phoneError ? (
                <p className="text-[11px] text-red-500 mt-2 ml-1 font-medium">
                  {phoneError}
                </p>
              ) : (
                <p className="text-[10px] text-gray-400 mt-2 ml-1 italic">
                  * Vos accès seront envoyés sur ce numéro WhatsApp.
                </p>
              )}
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full py-5 bg-black text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              {loading ? (
                <span className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Valider le paiement</>
              )}
            </button>
          </form>
          
          <div className="mt-6 flex items-center justify-center gap-1 opacity-40 text-xs text-gray-500">
            <span>Paiement sécurisé par</span>
            <span className="font-semibold tracking-tight">FedaPay</span>
          </div>
        </div>
      </div>
    </div>
  )
}
