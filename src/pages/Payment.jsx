import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { placeOrder } from '../api'

function Payment() {
  const navigate = useNavigate()
  const { cartItems, totalPrice, clearCart } = useCart()
  const [selectedApp, setSelectedApp] = useState('')
  const [upiId, setUpiId] = useState('')
  const [paying, setPaying] = useState(false)
  const [paid, setPaid] = useState(false)

  const deliveryFee = totalPrice > 199 ? 0 : 40
  const taxes = Math.round(totalPrice * 0.05)
  const grandTotal = totalPrice + deliveryFee + taxes

  
  const MERCHANT_UPI = 'madhulilly80-1@okaxis'
  const MERCHANT_NAME = 'FoodApp'

  const upiApps = [
    { id: 'gpay', name: 'Google Pay', emoji: '🟢', color: 'from-green-400 to-green-500',
      package: 'com.google.android.apps.nbu.paisa.user' },
    { id: 'phonepe', name: 'PhonePe', emoji: '🟣', color: 'from-purple-400 to-purple-600',
      package: 'com.phonepe.app' },
    { id: 'paytm', name: 'Paytm', emoji: '🔵', color: 'from-blue-400 to-blue-600',
      package: 'net.one97.paytm' },
    { id: 'bhim', name: 'BHIM UPI', emoji: '🟠', color: 'from-orange-400 to-orange-500',
      package: 'in.org.npci.upiapp' },
  ]

  const handleUPIPayment = (app) => {
    setSelectedApp(app.id)
    setPaying(true)

    // UPI Deep Link
    const upiLink = `upi://pay?pa=${MERCHANT_UPI}&pn=${MERCHANT_NAME}&am=${grandTotal}&cu=INR&tn=FoodApp Order`

    // App-specific links
    const appLinks = {
      gpay: `tez://upi/pay?pa=${MERCHANT_UPI}&pn=${MERCHANT_NAME}&am=${grandTotal}&cu=INR`,
      phonepe: `phonepe://pay?pa=${MERCHANT_UPI}&pn=${MERCHANT_NAME}&am=${grandTotal}&cu=INR`,
      paytm: `paytmmp://pay?pa=${MERCHANT_UPI}&pn=${MERCHANT_NAME}&am=${grandTotal}&cu=INR`,
      bhim: `upi://pay?pa=${MERCHANT_UPI}&pn=${MERCHANT_NAME}&am=${grandTotal}&cu=INR`,
    }

    // Open UPI App
    window.location.href = appLinks[app.id] || upiLink

    // 5 seconds wait - then show confirmation
    setTimeout(() => {
      setPaying(false)
    }, 5000)
  }

  const handleManualUPI = () => {
    if (!upiId) {
      alert('UPI ID போடு!')
      return
    }
    setPaying(true)
    const upiLink = `upi://pay?pa=${upiId}&pn=${MERCHANT_NAME}&am=${grandTotal}&cu=INR&tn=FoodApp Order`
    window.location.href = upiLink
    setTimeout(() => setPaying(false), 5000)
  }

  const handlePaymentSuccess = async () => {
    setPaid(true)
    const username = localStorage.getItem('username') || 'guest'
    const orderData = {
      username,
      items: cartItems.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total_price: grandTotal,
      delivery_address: 'Chennai'
    }
    await placeOrder(orderData)
    setTimeout(() => navigate('/tracking'), 1500)
  }

  // Payment Success Screen
  if (paid) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-sm">
          <div className="text-7xl mb-4 animate-bounce">🎉</div>
          <h2 className="text-2xl font-extrabold text-green-600 mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-500">₹{grandTotal} paid successfully</p>
          <p className="text-gray-400 text-sm mt-2">Redirecting to tracking...</p>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full animate-pulse w-3/4" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-10">

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 
        text-white px-6 py-8 text-center">
        <h1 className="text-2xl font-extrabold">💳 Payment</h1>
        <p className="text-orange-100 mt-1">Choose your payment method</p>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-6">

        {/* Bill Summary */}
        <div className="bg-white rounded-2xl shadow p-5 mb-6">
          <h3 className="font-extrabold text-gray-800 mb-3">🧾 Bill Summary</h3>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery</span>
              {deliveryFee === 0
                ? <span className="text-green-500 font-bold">FREE 🎉</span>
                : <span>₹{deliveryFee}</span>
              }
            </div>
            <div className="flex justify-between text-gray-600">
              <span>GST (5%)</span>
              <span>₹{taxes}</span>
            </div>
            <div className="border-t pt-2 flex justify-between 
              font-extrabold text-lg text-gray-800">
              <span>Total</span>
              <span className="text-orange-500">₹{grandTotal}</span>
            </div>
          </div>
        </div>

        {/* UPI Apps */}
        <h3 className="font-extrabold text-gray-700 mb-3">
          📱 Pay with UPI App
        </h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {upiApps.map(app => (
            <button
              key={app.id}
              onClick={() => handleUPIPayment(app)}
              disabled={paying}
              className={`bg-gradient-to-r ${app.color} text-white 
              p-4 rounded-2xl font-bold shadow hover:scale-105 
              transition-all duration-200 flex items-center gap-3
              disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span className="text-3xl">{app.emoji}</span>
              <span>{app.name}</span>
            </button>
          ))}
        </div>

        {/* Manual UPI ID */}
        <h3 className="font-extrabold text-gray-700 mb-3">
          ⌨️ Enter UPI ID Manually
        </h3>
        <div className="bg-white rounded-2xl shadow p-4 mb-6">
          <input
            type="text"
            placeholder="yourname@upi (eg: madhu@okicici)"
            value={upiId}
            onChange={e => setUpiId(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl p-3 
            outline-orange-400 text-gray-800 mb-3"
          />
          <button
            onClick={handleManualUPI}
            disabled={paying || !upiId}
            className="w-full bg-orange-500 text-white py-3 rounded-xl 
            font-bold hover:bg-orange-600 transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Pay ₹{grandTotal} 💸
          </button>
        </div>

        {/* Paying Loader */}
        {paying && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl 
            p-5 text-center mb-4">
            <p className="text-3xl mb-2 animate-spin inline-block">⏳</p>
            <p className="font-bold text-blue-600">Opening Payment App...</p>
            <p className="text-gray-400 text-sm mt-1">
              Payment பண்ணிட்டு இங்க வாங்க!
            </p>
          </div>
        )}

        {/* Manual Confirm */}
        {paying && (
          <div className="bg-white rounded-2xl shadow p-5 text-center">
            <p className="font-bold text-gray-800 mb-1">
              Have you completed the payment?
            </p>
            <p className="text-gray-400 text-sm mb-4">
              please confirm once the payment is completed in the UPI app
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setPaying(false)}
                className="flex-1 bg-gray-100 text-gray-600 py-3 
                rounded-xl font-bold hover:bg-gray-200"
              >
                ❌ Cancel
              </button>
              <button
                onClick={handlePaymentSuccess}
                className="flex-1 bg-green-500 text-white py-3 
                rounded-xl font-bold hover:bg-green-600"
              >
                ✅ Yes, Paid!
              </button>
            </div>
          </div>
        )}

        {/* Security Note */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-xs">
            🔒 Secure Payment • UPI Powered • 100% Safe
          </p>
        </div>

      </div>
    </div>
  )
}

export default Payment