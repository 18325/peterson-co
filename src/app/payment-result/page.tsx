'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function PaymentResultContent() {
  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const message = searchParams.get('message')

  const isSuccess = status === 'approved'

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#f8f9fa]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl text-center">
        {isSuccess ? (
          <>
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Paiement réussi !</h1>
            <p className="text-gray-600 mb-8">
              Votre commande a été validée. Vous recevrez vos accès sur WhatsApp d'ici quelques minutes.
            </p>
          </>
        ) : (
          <>
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Échec du paiement</h1>
            <p className="text-gray-600 mb-8">
              {message || "Une erreur est survenue lors de la transaction. Veuillez réessayer."}
            </p>
          </>
        )}

        <Link 
          href="/"
          className="inline-block w-full py-4 bg-black text-white rounded-2xl font-semibold hover:bg-gray-800 transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}

export default function PaymentResult() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentResultContent />
    </Suspense>
  )
}
