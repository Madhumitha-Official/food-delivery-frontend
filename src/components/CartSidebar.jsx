import { useCart } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'

function CartSidebar() {
  const { 
    cartItems, removeFromCart, updateQuantity, totalPrice, 
    isCartOpen, setIsCartOpen 
  } = useCart()
  const navigate = useNavigate()

  const handlePlaceOrder = () => {
    setIsCartOpen(false)
    navigate('/cart')
  }

  return (
    <>
      {/* Overlay - click panna close aagum */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
        ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">🛒 Your Cart</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="text-gray-500 hover:text-gray-800 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4" style={{ height: 'calc(100% - 200px)' }}>
          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-5xl mb-3">🛒</p>
              <p className="text-gray-500">Cart is empty!</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg font-bold"
              >
                Start Ordering
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center text-2xl">
                  {item.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm">{item.name}</h3>
                  <p className="text-orange-500 font-bold">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 bg-gray-200 rounded-lg font-bold hover:bg-gray-300"
                  >-</button>
                  <span className="font-bold">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 bg-gray-200 rounded-lg font-bold hover:bg-gray-300"
                  >+</button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 text-xl"
                >🗑️</button>
              </div>
            ))
          )}
        </div>

        {/* Footer - Checkout */}
        {cartItems.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span className="font-bold">₹{totalPrice}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span>Delivery</span>
              <span className="text-green-500 font-bold">FREE</span>
            </div>
            <div className="flex justify-between mb-4 text-lg font-bold">
              <span>Total</span>
              <span className="text-orange-500">₹{totalPrice + Math.round(totalPrice * 0.05)}</span>
            </div>
            <button 
              onClick={handlePlaceOrder}
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600"
            >
              Checkout 🎉
            </button>
            <Link 
              to="/cart" 
              onClick={() => setIsCartOpen(false)}
              className="block text-center text-orange-500 mt-2 text-sm"
            >
              View Full Cart →
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default CartSidebar