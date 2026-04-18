'use client'

import { useState } from 'react'
import Image from 'next/image'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (data: { email: string; phone: string }) => void
  amount: number
  serviceName: string
}

export default function PaymentModal({ isOpen, onClose, onConfirm, amount, serviceName }: PaymentModalProps) {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onConfirm({ email, phone })
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
              <input
                required
                type="tel"
                placeholder="97000000"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <p className="text-[10px] text-gray-400 mt-2 ml-1 italic">
                * Vos accès seront envoyés sur ce numéro.
              </p>
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
          
          <div className="mt-6 flex items-center justify-center gap-2 grayscale opacity-50">
             <Image src="/assets/images/fedapay-badge.png" alt="FedaPay" width={80} height={20} className="object-contain" />
          </div>
        </div>
      </div>
    </div>
  )
}
