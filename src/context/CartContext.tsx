'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

export type CartItem = {
  id: string          // serviceId-variantId-duration
  serviceId: string
  serviceName: string
  serviceImage?: string
  variantLabel: string
  duration: string
  amount: number
  currency: string
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  count: number
  addItem: (item: Omit<CartItem, 'id' | 'quantity'>) => void
  removeItem: (id: string) => void
  clearCart: () => void
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Charger depuis localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('peterson-cart')
      if (stored) setItems(JSON.parse(stored))
    } catch {}
  }, [])

  // Persister dans localStorage
  useEffect(() => {
    localStorage.setItem('peterson-cart', JSON.stringify(items))
  }, [items])

  const addItem = useCallback((item: Omit<CartItem, 'id' | 'quantity'>) => {
    const id = `${item.serviceId}-${item.variantLabel}-${item.duration}`
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id)
      if (existing) {
        return prev.map((i) => i.id === id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, id, quantity: 1 }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{
      items, count, addItem, removeItem, clearCart,
      isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
