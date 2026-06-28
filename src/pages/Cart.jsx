import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'
import { placeOrder } from '../api'

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart()
  const navigate = useNavigate()

  const deliveryFee = totalPrice > 199 ? 0 : 40
  const taxes = Math.round(totalPrice * 0.05)
  const grandTotal = totalPrice + deliveryFee + taxes

const [ordering, setOrdering] = useState(false)

  const handlePlaceOrder = () => {
    navigate('/payment')
  }


  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-lg p-12 text-center max-w-sm">
          <p className="text-8xl mb-4">🛒</p>
          <h2 className="text-2xl font-extrabold text-gray-800 mb-2">
            Your Cart is Empty!
          </h2>
          <p className="text-gray-400 mb-6">
            Add items from restaurants to get started
          </p>
          <Link to="/"
            className="bg-orange-500 text-white px-8 py-3 rounded-2xl 
            font-bold hover:bg-orange-600 transition-colors inline-block">
            Browse Restaurants 🍕
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-5 sticky top-16 z-40">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">🛒 Your Cart</h1>
            <p className="text-gray-400 text-sm">{cartItems.length} items added</p>
          </div>
          <button
            onClick={() => cartItems.forEach(item => removeFromCart(item.id))}
            className="text-red-400 hover:text-red-600 text-sm font-bold 
            border border-red-200 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
          >
            Clear All 🗑️
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-3 py-4 grid grid-cols-1 
        lg:grid-cols-3 gap-4">

        {/* Cart Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cartItems.map(item => (
            <div key={item.id}
              className="bg-white rounded-2xl shadow hover:shadow-md 
              transition-all overflow-hidden flex">

              {/* Item Image */}
              <div className="w-28 h-28 shrink-0">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = ''
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-orange-100 flex 
                    items-center justify-center text-4xl">
                    🍽️
                  </div>
                )}
              </div>

              {/* Item Info */}
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                    <p className="text-orange-500 font-bold text-lg">
                      ₹{item.price}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600 text-lg transition-colors"
                  >
                    🗑️
                  </button>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-3 bg-gray-100 
                    rounded-xl px-3 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-orange-500 font-extrabold text-xl 
                      hover:text-orange-600 w-6 text-center"
                    >−</button>
                    <span className="font-bold text-gray-800 w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-orange-500 font-extrabold text-xl 
                      hover:text-orange-600 w-6 text-center"
                    >+</button>
                  </div>
                  <p className="font-bold text-gray-700">
                    = ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Continue Shopping */}
          <Link to="/"
            className="text-orange-500 font-bold text-center py-3 border-2 
            border-dashed border-orange-300 rounded-2xl hover:bg-orange-50 
            transition-colors block">
            + Add More Items
          </Link>
        </div>

        {/* Bill Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow p-6 sticky top-36">
            <h3 className="font-extrabold text-lg text-gray-800 mb-4">
              🧾 Bill Summary
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-bold">₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                {deliveryFee === 0 ? (
                  <span className="text-green-500 font-bold">FREE 🎉</span>
                ) : (
                  <span className="font-bold">₹{deliveryFee}</span>
                )}
              </div>
              <div className="flex justify-between text-gray-600">
                <span>GST (5%)</span>
                <span className="font-bold">₹{taxes}</span>
              </div>

              {totalPrice <= 199 && (
                <div className="bg-orange-50 border border-orange-200 
                  rounded-xl p-3 text-xs text-orange-600 font-bold">
                  💡 Add ₹{199 - totalPrice} more for FREE delivery!
                </div>
              )}

              <div className="border-t pt-3 flex justify-between 
                text-lg font-extrabold text-gray-800">
                <span>Grand Total</span>
                <span className="text-orange-500">₹{grandTotal}</span>
              </div>
            </div>

            {/* Savings */}
            {deliveryFee === 0 && (
              <div className="bg-green-50 border border-green-200 rounded-xl 
                p-3 mt-3 text-center">
                <p className="text-green-600 font-bold text-sm">
                  🎉 You saved ₹40 on delivery!
                </p>
              </div>
            )}

            {/* Place Order Button */}
           <button
        onClick={handlePlaceOrder}
        disabled={ordering}
        className="w-full bg-orange-500 text-white py-4 rounded-2xl 
        font-extrabold text-lg hover:bg-orange-600 transition-colors 
        mt-4 shadow-lg shadow-orange-200 disabled:opacity-50"
      >
        {ordering ? '⏳ Placing Order...' : 'Place Order 🎉'}
      </button>

            {/* Safety Info */}
            <div className="flex justify-center gap-4 mt-4 text-xs text-gray-400">
              <span>🔒 Secure Payment</span>
              <span>⚡ Fast Delivery</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart