import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)  // 🔥 FEATURE 5: Sidebar state

  const addToCart = (item) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === item.id)
      if (exists) {
        return prev.map(i => i.id === item.id 
          ? { ...i, quantity: i.quantity + 1 } 
          : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    setIsCartOpen(true)  // 🔥 Auto open sidebar when item added
  }

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id))
  }

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) {
      removeFromCart(id)
      return
    }
    setCartItems(prev => 
      prev.map(i => i.id === id ? { ...i, quantity } : i)
    )
  }

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  )

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity, 0
  )

  const clearCart = () => setCartItems([])

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQuantity, 
      totalPrice, totalItems, clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}