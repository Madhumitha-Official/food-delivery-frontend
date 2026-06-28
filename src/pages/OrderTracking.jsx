import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getOrderById } from '../api'

const allSteps = [
  { id: 1, label: 'Order Placed', emoji: '✅', status: 'placed' },
  { id: 2, label: 'Restaurant Confirmed', emoji: '👨‍🍳', status: 'preparing' },
  { id: 3, label: 'Food Preparing', emoji: '🍳', status: 'preparing' },
  { id: 4, label: 'Out for Delivery', emoji: '🛵', status: 'out_for_delivery' },
  { id: 5, label: 'Delivered!', emoji: '🎉', status: 'delivered' },
]

const statusToStep = {
  'placed': 1,
  'preparing': 3,
  'out_for_delivery': 4,
  'delivered': 5,
}

function OrderTracking() {
  const [currentStep, setCurrentStep] = useState(1)
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const orderId = localStorage.getItem('last_order_id')
    if (orderId) {
      fetchOrder(orderId)
      // Every 5 seconds refresh
      const interval = setInterval(() => fetchOrder(orderId), 5000)
      return () => clearInterval(interval)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchOrder = async (orderId) => {
    try {
      const data = await getOrderById(orderId)
      if (data && data.id) {
        setOrder(data)
        setCurrentStep(statusToStep[data.status] || 1)
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-orange-500 font-bold animate-pulse text-xl">
          ⏳ Loading order...
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 
        text-white px-6 py-10 text-center">
        <h1 className="text-3xl font-extrabold mb-1">📍 Order Tracking</h1>
        {order && (
          <p className="text-orange-100">Order #{order.id}</p>
        )}
      </div>

      <div className="max-w-lg mx-auto px-4 py-8">

        {/* Order Info */}
        {order && (
          <div className="bg-white rounded-2xl shadow p-4 mb-6">
            <h3 className="font-extrabold text-gray-800 mb-3">🧾 Order Details</h3>
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm py-1">
                <span className="text-gray-600">{item.name} x{item.quantity}</span>
                <span className="font-bold">₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2 flex justify-between font-extrabold">
              <span>Total</span>
              <span className="text-orange-500">₹{order.total_price}</span>
            </div>
          </div>
        )}

        {/* Steps */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-extrabold text-gray-800">Live Status</h3>
            <span className="text-xs text-gray-400 animate-pulse">
              🔴 Live updating...
            </span>
          </div>

          <div className="relative">
            {allSteps.map((step, index) => (
              <div key={step.id} className="flex items-start gap-4 mb-6 last:mb-0">

                {/* Circle */}
                <div className={`w-12 h-12 rounded-full flex items-center
                  justify-center text-xl font-bold shrink-0 transition-all duration-500
                  ${currentStep >= step.id
                    ? 'bg-orange-500 text-white shadow-lg scale-110'
                    : 'bg-gray-200 text-gray-400'
                  }`}>
                  {currentStep >= step.id ? step.emoji : step.id}
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <p className={`font-bold text-lg transition-colors
                    ${currentStep >= step.id ? 'text-orange-500' : 'text-gray-400'}`}>
                    {step.label}
                  </p>
                </div>

                {/* Active Badge */}
                {currentStep === step.id && (
                  <div className="pt-2">
                    <span className="bg-orange-100 text-orange-600 text-xs
                      px-2 py-1 rounded-full font-bold animate-pulse">
                      In Progress...
                    </span>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>

        {/* Delivered */}
        {currentStep >= 5 && (
          <div className="text-center bg-green-50 border border-green-300
            rounded-2xl p-6">
            <p className="text-5xl mb-2">🎉</p>
            <h2 className="text-2xl font-extrabold text-green-600">
              Order Delivered!
            </h2>
            <p className="text-gray-500 mt-1">Enjoy your meal! 😋</p>
            <Link to="/"
              className="mt-4 inline-block bg-orange-500 text-white
              px-6 py-2 rounded-xl font-bold hover:bg-orange-600">
              Order Again 🍕
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}

export default OrderTracking