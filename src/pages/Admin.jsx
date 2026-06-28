import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllOrders, updateOrderStatus } from '../api'

// Admin credentials
const ADMIN_USER = 'admin'
const ADMIN_PASS = 'admin123'

const mockOrders = [
  { id: 1, username: 'madhu@gmail.com', items: [{ name: 'Burger', quantity: 2, price: 120 }], total_price: 240, status: 'placed', created_at: '2026-06-27T10:00:00' },
  { id: 2, username: 'karthik@gmail.com', items: [{ name: 'Pizza', quantity: 1, price: 250 }], total_price: 250, status: 'delivered', created_at: '2026-06-27T11:00:00' },
  { id: 3, username: 'priya@gmail.com', items: [{ name: 'Biryani', quantity: 2, price: 220 }], total_price: 440, status: 'placed', created_at: '2026-06-27T12:00:00' },
]

function Admin() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('dashboard')
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth')
    if (adminAuth === 'true') {
      setIsLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    if (!isLoggedIn) return
    fetchOrders()
    const interval = setInterval(fetchOrders, 10000)
    return () => clearInterval(interval)
  }, [isLoggedIn])

  // Every 10 seconds auto refresh
  useEffect(() => {
    if (!isLoggedIn) return
    fetchOrders()
    const interval = setInterval(fetchOrders, 10000)
    return () => clearInterval(interval)
  }, [isLoggedIn])

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders()
      if (Array.isArray(data)) setOrders(data)
    } catch (err) {
      console.error('Orders fetch failed:', err)
    }
    setLoadingOrders(false)
  }

  const handleLogin = () => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem('adminAuth', 'true')
      setIsLoggedIn(true)
      setError('')
    } else {
      setError('Wrong username or password!')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    setIsLoggedIn(false)
  }

  const updateStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus)
      setOrders(prev =>
        prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
      )
    } catch (err) {
      alert('Status update failed!')
    }
  }

  const filteredOrders = statusFilter === 'all'
    ? orders
    : orders.filter(o => o.status === statusFilter)

  const stats = {
    total: orders.length,
    placed: orders.filter(o => o.status === 'placed').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    revenue: orders.reduce((sum, o) => sum + o.total_price, 0)
  }

  const statusConfig = {
    placed: { label: 'Placed', color: 'bg-blue-100 text-blue-600', emoji: '✅' },
    preparing: { label: 'Preparing', color: 'bg-yellow-100 text-yellow-600', emoji: '👨‍🍳' },
    out_for_delivery: { label: 'Out for Delivery', color: 'bg-orange-100 text-orange-600', emoji: '🛵' },
    delivered: { label: 'Delivered', color: 'bg-green-100 text-green-600', emoji: '🎉' },
    cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-600', emoji: '❌' },
  }

  // ===== LOGIN PAGE =====
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
          <div className="text-center mb-8">
            <p className="text-5xl mb-3">🛡️</p>
            <h1 className="text-2xl font-extrabold text-gray-800">Admin Login</h1>
            <p className="text-gray-400 text-sm mt-1">FoodApp Dashboard</p>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-gray-500 text-sm font-bold block mb-1.5">
                Username
              </label>
              <input
                type="text"
                placeholder="admin"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl p-3 
                outline-orange-400 font-medium"
              />
            </div>
            <div>
              <label className="text-gray-500 text-sm font-bold block mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                className="w-full border-2 border-gray-200 rounded-xl p-3 
                outline-orange-400 font-medium"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm font-bold bg-red-50 
                p-3 rounded-xl text-center">
                ❌ {error}
              </p>
            )}

            <button
              onClick={handleLogin}
              className="w-full bg-orange-500 text-white py-4 rounded-xl 
              font-extrabold text-lg hover:bg-orange-600 transition-colors mt-2"
            >
              Login to Dashboard 🚀
            </button>

            <p className="text-center text-gray-400 text-xs mt-2">
              Default: admin / admin123
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ===== DASHBOARD =====
  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Top Bar */}
      <div className="bg-gray-900 text-white px-6 py-4 flex 
        justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🛡️</span>
          <div>
            <h1 className="font-extrabold text-lg">FoodApp Admin</h1>
            <p className="text-gray-400 text-xs">Dashboard</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-700 text-white px-3 py-1.5 rounded-lg 
            text-sm font-bold hover:bg-gray-600"
          >
            🏠 View App
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1.5 rounded-lg 
            text-sm font-bold hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow-sm px-6 py-3 flex gap-2 overflow-x-auto">
        {[
          { id: 'dashboard', label: 'Dashboard', emoji: '📊' },
          { id: 'orders', label: 'Orders', emoji: '📦' },
          { id: 'restaurants', label: 'Restaurants', emoji: '🏪' },
          { id: 'users', label: 'Users', emoji: '👥' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl font-bold text-sm 
            transition-all shrink-0 flex items-center gap-1.5
            ${activeTab === tab.id
              ? 'bg-orange-500 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-orange-50'
            }`}
          >
            {tab.emoji} {tab.label}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="font-extrabold text-gray-700 text-xl mb-4">
              📊 Overview
            </h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Orders', value: stats.total, emoji: '📦', color: 'bg-blue-500' },
                { label: 'Pending', value: stats.placed, emoji: '⏳', color: 'bg-yellow-500' },
                { label: 'Delivered', value: stats.delivered, emoji: '✅', color: 'bg-green-500' },
                { label: 'Revenue', value: `₹${stats.revenue}`, emoji: '💰', color: 'bg-orange-500' },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl shadow p-5">
                  <div className={`${stat.color} text-white w-10 h-10 
                    rounded-xl flex items-center justify-center text-xl mb-3`}>
                    {stat.emoji}
                  </div>
                  <p className="text-2xl font-extrabold text-gray-800">
                    {stat.value}
                  </p>
                  <p className="text-gray-400 text-sm mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <h3 className="font-extrabold text-gray-700 text-lg mb-3">
              🕐 Recent Orders
            </h3>
            <div className="bg-white rounded-2xl shadow overflow-hidden">
              <table className="w-full text-sm min-w-max md:min-w-0">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-3 font-bold text-gray-600">Order</th>
                    <th className="text-left p-3 font-bold text-gray-600 hidden md:table-cell">Customer</th>
                    <th className="text-left p-3 font-bold text-gray-600">Amount</th>
                    <th className="text-left p-3 font-bold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map(order => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-bold text-gray-800">#{order.id}</td>
                      <td className="p-4 text-gray-600">{order.username}</td>
                      <td className="p-4 font-bold text-orange-500">₹{order.total_price}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold
                          ${statusConfig[order.status]?.color}`}>
                          {statusConfig[order.status]?.emoji} {statusConfig[order.status]?.label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-extrabold text-gray-700 text-xl">
                📦 All Orders
              </h2>
              {/* Filter */}
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="border-2 border-gray-200 rounded-xl px-3 py-2 
                outline-orange-400 font-bold text-sm"
              >
                <option value="all">All Orders</option>
                <option value="placed">Placed</option>
                <option value="preparing">Preparing</option>
                <option value="out_for_delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex flex-col gap-3">
              {filteredOrders.map(order => (
                <div key={order.id}
                  className="bg-white rounded-2xl shadow p-4 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-extrabold text-gray-800">
                        Order #{order.id}
                      </p>
                      <p className="text-gray-400 text-sm">👤 {order.username}</p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        📅 {new Date(order.created_at).toLocaleString()}
                      </p>
                    </div>
                    <p className="font-extrabold text-orange-500 text-lg">
                      ₹{order.total_price}
                    </p>
                  </div>

                  {/* Items */}
                  <div className="bg-gray-50 rounded-xl p-3 mb-3">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="font-bold">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Status Update */}
                  <div className="flex gap-2 flex-wrap">
                    {Object.entries(statusConfig).map(([key, val]) => (
                      <button
                        key={key}
                        onClick={() => updateStatus(order.id, key)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold 
                        transition-all border-2
                        ${order.status === key
                          ? 'border-orange-500 bg-orange-50 text-orange-600'
                          : 'border-gray-200 text-gray-500 hover:border-orange-300'
                        }`}
                      >
                        {val.emoji} {val.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RESTAURANTS TAB */}
        {activeTab === 'restaurants' && (
          <div>
            <h2 className="font-extrabold text-gray-700 text-xl mb-4">
              🏪 Restaurants
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Burger King', orders: 45, revenue: 8100, status: 'Active', emoji: '🍔' },
                { name: 'Pizza Hut', orders: 38, revenue: 9500, status: 'Active', emoji: '🍕' },
                { name: 'KFC', orders: 52, revenue: 10400, status: 'Active', emoji: '🍗' },
                { name: 'Dominos', orders: 41, revenue: 12300, status: 'Active', emoji: '🧀' },
                { name: 'Subway', orders: 29, revenue: 5800, status: 'Active', emoji: '🥪' },
                { name: 'Biryani House', orders: 63, revenue: 13860, status: 'Active', emoji: '🍛' },
              ].map((resto, i) => (
                <div key={i}
                  className="bg-white rounded-2xl shadow p-4 flex 
                  justify-between items-center hover:shadow-md transition-all">
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl 
                      flex items-center justify-center text-2xl">
                      {resto.emoji}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{resto.name}</p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        {resto.orders} orders • ₹{resto.revenue} revenue
                      </p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-600 text-xs 
                    px-2 py-1 rounded-full font-bold">
                    ✅ {resto.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div>
            <h2 className="font-extrabold text-gray-700 text-xl mb-4">
              👥 Users
            </h2>
            <div className="bg-white rounded-2xl shadow overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-bold text-gray-600">User</th>
                    <th className="text-left p-4 font-bold text-gray-600">Orders</th>
                    <th className="text-left p-4 font-bold text-gray-600">Spent</th>
                    <th className="text-left p-4 font-bold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Madhu', email: 'madhu@gmail.com', orders: 5, spent: 1200, active: true },
                    { name: 'Karthik', email: 'karthik@gmail.com', orders: 8, spent: 2400, active: true },
                    { name: 'Priya', email: 'priya@gmail.com', orders: 3, spent: 800, active: false },
                    { name: 'Naveen', email: 'naveen@gmail.com', orders: 12, spent: 3600, active: true },
                  ].map((user, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <p className="font-bold text-gray-800">{user.name}</p>
                        <p className="text-gray-400 text-xs">{user.email}</p>
                      </td>
                      <td className="p-4 font-bold text-gray-600">
                        {user.orders}
                      </td>
                      <td className="p-4 font-bold text-orange-500">
                        ₹{user.spent}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold
                          ${user.active
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-500'
                          }`}>
                          {user.active ? '🟢 Active' : '⚫ Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Admin