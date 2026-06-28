import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserOrders } from '../api'

const addresses = [
  { id: 1, type: 'Home', address: '12, Anna Nagar, Chennai - 600040', icon: '🏠' },
  { id: 2, type: 'Work', address: '45, T Nagar, Chennai - 600017', icon: '🏢' },
]

const settingsItems = [
  { emoji: '🔔', label: 'Notifications', desc: 'Order updates & offers' },
  { emoji: '🌙', label: 'Dark Mode', desc: 'Switch appearance' },
  { emoji: '🔒', label: 'Privacy', desc: 'Data & permissions' },
  { emoji: '💳', label: 'Payment Methods', desc: 'Cards & UPI' },
  { emoji: '🎁', label: 'Offers & Coupons', desc: 'Available discounts' },
  { emoji: '❓', label: 'Help & Support', desc: 'FAQ & contact us' },
]

function Profile() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('orders')
  const [isEditing, setIsEditing] = useState(false)
  const [realOrders, setRealOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const savedName = localStorage.getItem('fullname') || 
    localStorage.getItem('username') || 'Guest User'
  const savedEmail = localStorage.getItem('email') || 'guest@foodapp.com'
  const savedPhone = localStorage.getItem('phone') || 'Not added'

  // Name based-ஆ avatar decide பண்ணு
  const femaleNames = ['madhu', 'priya', 'kavya', 'divya', 'nisha',
    'sneha', 'pooja', 'anitha', 'meena', 'lakshmi', 'radha', 'geetha',
    'uma', 'sudha', 'vani', 'lily', 'angel', 'grace', 'mary', 'sara',
    'devi', 'rani', 'kala', 'mala', 'hema', 'rekha', 'seetha', 'kamala',
    'vijaya', 'padma', 'nirmala', 'sumathi', 'usha', 'latha', 'deepa',
    'sangeetha', 'revathi', 'mythili', 'janani', 'keerthi', 'dharini',
    'harini', 'pavithra', 'surya', 'thendral', 'oviya', 'sivaranjani']

  const maleNames = ['kumar', 'raj', 'ravi', 'karthik', 'arun', 'vijay',
    'suresh', 'ramesh', 'ganesh', 'dinesh', 'mahesh', 'naresh', 'rakesh',
    'mukesh', 'rajesh', 'bala', 'murugan', 'selvam', 'senthil', 'mani',
    'durai', 'pandian', 'arjun', 'krishna', 'siva', 'shankar', 'venkat',
    'prasad', 'anand', 'vikram', 'surya', 'ajith', 'kamal', 'hari',
    'sathish', 'praveen', 'naveen', 'manoj', 'rohit', 'rahul', 'amit']

  const nameLower = savedName.toLowerCase()
  const isFemale = femaleNames.some(n => nameLower.includes(n))
  const isMale = maleNames.some(n => nameLower.includes(n))

  const getAvatar = () => {
    if (isFemale) return '👩'
    if (isMale) return '👨'
    // Name-ல இல்லன்னா register-ல gender save பண்ணியதை check பண்ணு
    const savedGender = localStorage.getItem('gender')
    if (savedGender === 'female') return '👩'
    if (savedGender === 'male') return '👨'
    return '👤'
  }

  const [user, setUser] = useState({
    name: savedName,
    email: savedEmail,
    phone: savedPhone,
    avatar: getAvatar(),
  })
  const [editData, setEditData] = useState(user)

  // Login ஆகும்போது fresh data load பண்ணு
  useEffect(() => {
    const savedName = localStorage.getItem('fullname') || 
      localStorage.getItem('username') || 'Guest User'
    const savedEmail = localStorage.getItem('email') || 'guest@foodapp.com'
    const savedPhone = localStorage.getItem('phone') || 'Not added'
    const savedGender = localStorage.getItem('gender') || ''

    const getAvatar = () => {
      if (savedGender === 'female') return '👩'
      if (savedGender === 'male') return '👨'
      return '👤'
    }

    setUser({
      name: savedName,
      email: savedEmail,
      phone: savedPhone,
      avatar: getAvatar(),
    })
  }, [])

  useEffect(() => {
    const username = localStorage.getItem('username') || 'guest'
    getUserOrders(username)
      .then(orders => {
        if (Array.isArray(orders)) setRealOrders(orders)
        setLoadingOrders(false)
      })
      .catch(() => setLoadingOrders(false))
  }, [])

  const handleSave = () => {
    setUser(editData)
    setIsEditing(false)
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="bg-gradient-to-b from-orange-500 to-orange-400
        text-white text-center px-6 pt-8 pb-24">
        <div className="text-8xl mb-4">{user.avatar}</div>
        <h1 className="text-2xl font-extrabold">{user.name}</h1>
        <p className="text-orange-100 text-sm mt-1">{user.email}</p>
        <p className="text-orange-100 text-sm">{user.phone}</p>
        <button
          onClick={() => setIsEditing(true)}
          className="mt-4 bg-white/20 text-white px-5 py-2 rounded-full 
          font-bold hover:bg-white/30 transition-colors text-sm border border-white/30"
        >
          ✏️ Edit Profile
        </button>
      </div>

      {/* STATS */}
      <div className="max-w-2xl mx-auto px-4 -mt-14">
        <div className="bg-white rounded-2xl shadow-xl p-5 grid grid-cols-3 gap-4 text-center">
          <div className="border-r border-gray-100">
            <p className="text-2xl font-extrabold text-orange-500">{realOrders.length}</p>
            <p className="text-gray-400 text-xs mt-1">Total Orders</p>
          </div>
          <div className="border-r border-gray-100">
            <p className="text-2xl font-extrabold text-orange-500">
              ₹{realOrders.reduce((sum, o) => sum + o.total_price, 0)}
            </p>
            <p className="text-gray-400 text-xs mt-1">Total Spent</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-orange-500">4.8 ⭐</p>
            <p className="text-gray-400 text-xs mt-1">Avg Rating</p>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="max-w-2xl mx-auto px-4 mt-6">
        <div className="bg-white rounded-2xl shadow p-1.5 flex gap-1">
          {[
            { id: 'orders', label: 'Orders', emoji: '📦' },
            { id: 'addresses', label: 'Addresses', emoji: '📍' },
            { id: 'settings', label: 'Settings', emoji: '⚙️' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 rounded-xl font-bold text-sm
              transition-all flex items-center justify-center gap-1.5
              ${activeTab === tab.id
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-gray-400 hover:text-orange-400'
              }`}
            >
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="max-w-2xl mx-auto px-4 mt-4 pb-10">

        {/* ORDERS */}
        {activeTab === 'orders' && (
          <div className="flex flex-col gap-3">
            <h2 className="font-extrabold text-gray-700 text-lg px-1">
              📦 Order History
            </h2>

            {loadingOrders && (
              <div className="text-center py-8">
                <p className="text-orange-500 font-bold animate-pulse">
                  ⏳ Loading orders...
                </p>
              </div>
            )}

            {!loadingOrders && realOrders.length === 0 && (
              <div className="bg-white rounded-2xl p-8 text-center shadow">
                <p className="text-5xl mb-3">📦</p>
                <p className="text-gray-500 font-bold">No orders yet!</p>
                <p className="text-gray-400 text-sm mt-1">
                  Order food to see history here
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="mt-4 bg-orange-500 text-white px-6 py-2 
                  rounded-xl font-bold hover:bg-orange-600"
                >
                  Order Now 🍕
                </button>
              </div>
            )}

            {realOrders.map(order => (
              <div key={order.id}
                className="bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-extrabold text-gray-800">Order #{order.id}</p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      📅 {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-orange-500">₹{order.total_price}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold mt-1 inline-block
                      ${order.status === 'placed' ? 'bg-blue-100 text-blue-600'
                        : order.status === 'delivered' ? 'bg-green-100 text-green-600'
                        : 'bg-orange-100 text-orange-600'}`}>
                      {order.status === 'placed' ? '✅ Placed'
                        : order.status === 'delivered' ? '🎉 Delivered'
                        : '🚚 ' + order.status}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 mb-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm py-0.5">
                      <span className="text-gray-600">{item.name} x{item.quantity}</span>
                      <span className="font-bold text-gray-800">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate('/')}
                    className="flex-1 bg-orange-500 text-white py-2.5 
                    rounded-xl font-bold text-sm hover:bg-orange-600"
                  >
                    🔄 Reorder
                  </button>
                  <button
                    onClick={() => navigate('/tracking')}
                    className="flex-1 bg-gray-100 text-gray-600 py-2.5 
                    rounded-xl font-bold text-sm hover:bg-gray-200"
                  >
                    📍 Track
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="flex flex-col gap-3">
            <h2 className="font-extrabold text-gray-700 text-lg px-1">
              📍 Saved Addresses
            </h2>
            {addresses.map(addr => (
              <div key={addr.id}
                className="bg-white rounded-2xl shadow-sm p-4 flex 
                justify-between items-center hover:shadow-md transition-all">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl 
                    flex items-center justify-center text-2xl">
                    {addr.icon}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{addr.type}</p>
                    <p className="text-gray-400 text-sm mt-0.5">{addr.address}</p>
                  </div>
                </div>
                <button className="text-orange-500 font-bold text-sm hover:text-orange-600">
                  Edit
                </button>
              </div>
            ))}
            <button className="bg-white border-2 border-dashed border-orange-300
              text-orange-500 py-4 rounded-2xl font-bold hover:bg-orange-50 transition-colors">
              + Add New Address
            </button>
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === 'settings' && (
          <div className="flex flex-col gap-3">
            <h2 className="font-extrabold text-gray-700 text-lg px-1">⚙️ Settings</h2>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {settingsItems.map((item, i) => (
                <div key={i}
                  className={`flex justify-between items-center p-4 
                  hover:bg-orange-50 cursor-pointer transition-colors
                  ${i !== settingsItems.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl 
                      flex items-center justify-center text-xl">
                      {item.emoji}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{item.label}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <span className="text-gray-300 font-bold text-xl">›</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('username')
                localStorage.removeItem('token')
                navigate('/')
              }}
              className="bg-white border-2 border-red-200 text-red-500
              py-4 rounded-2xl font-extrabold hover:bg-red-50 transition-colors shadow-sm"
            >
              🚪 Logout
            </button>
          </div>
        )}

      </div>

      {/* EDIT MODAL */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <div className="bg-white rounded-t-3xl w-full max-w-lg p-6">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-5" />
            <h2 className="text-xl font-extrabold text-gray-800 mb-5">✏️ Edit Profile</h2>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Name', key: 'name', type: 'text' },
                { label: 'Email', key: 'email', type: 'email' },
                { label: 'Phone', key: 'phone', type: 'text' },
              ].map(field => (
                <div key={field.key}>
                  <label className="text-gray-500 text-sm font-bold block mb-1.5">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={editData[field.key]}
                    onChange={e => setEditData({ ...editData, [field.key]: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl p-3 
                    outline-orange-400 font-medium text-gray-800"
                  />
                </div>
              ))}
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-100 text-gray-600 py-3.5 rounded-xl 
                  font-bold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-orange-500 text-white py-3.5 rounded-xl 
                  font-bold hover:bg-orange-600 transition-colors"
                >
                  Save ✅
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Profile