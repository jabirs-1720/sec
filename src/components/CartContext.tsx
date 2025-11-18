// src/components/CartContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface CartItem {
  id: number
  title: string
  subtitle: string
  image: string
  [key: string]: any
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => Promise<void>
  removeFromCart: (id: number) => Promise<void>
  clearCart: () => Promise<void>
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: async () => {},
  removeFromCart: async () => {},
  clearCart: async () => {},
})

interface Props {
  children: ReactNode
}

const CART_KEY = '@cart_items'

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    const stored = await AsyncStorage.getItem(CART_KEY)
    const items: CartItem[] = stored ? JSON.parse(stored) : []
    setCart(items)
  }

  const saveCart = async (items: CartItem[]) => {
    setCart(items)
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(items))
  }

  const addToCart = async (item: CartItem) => {
    const exists = cart.find(i => i.id === item.id)
    if (!exists) {
      await saveCart([...cart, item])
    }
  }

  const removeFromCart = async (id: number) => {
    await saveCart(cart.filter(i => i.id !== id))
  }

  const clearCart = async () => {
    await saveCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
