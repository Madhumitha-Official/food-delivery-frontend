import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

function Navbar() {
  const { totalItems } = useCart()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { to: '/', label: 'Home', emoji: '🏠' },
    { to: '/cart', label: 'Cart', emoji: '🛒', badge: totalItems },
    { to: '/profile', label: 'Profile', emoji: '👤' },
  ]

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🍕</span>
            <span className="text-xl font-extrabold text-orange-500">FoodApp</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-2 items-center">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to}
                className={`px-4 py-2 rounded-xl font-bold text-sm 
                transition-colors relative flex items-center gap-1
                ${isActive(link.to)
                  ? 'bg-orange-50 text-orange-500'
                  : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'}`}>
                {link.emoji} {link.label}
                {link.badge > 0 && (
                  <span className="bg-orange-500 text-white text-xs font-bold
                    rounded-full w-5 h-5 flex items-center justify-center">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}

            {typeof window !== 'undefined' &&
              localStorage.getItem('adminAuth') === 'true' && (
              <Link to="/admin"
                className="bg-gray-800 text-white px-4 py-2 rounded-xl
                font-bold text-sm hover:bg-gray-700 transition-colors">
                🛡️ Admin
              </Link>
            )}

            <Link to="/login"
              className="bg-orange-500 text-white px-4 py-2 rounded-xl
              font-bold text-sm hover:bg-orange-600 transition-colors">
              Login
            </Link>
          </div>

          {/* Mobile Right Side */}
          <div className="flex md:hidden items-center gap-3">
            {/* Cart Badge */}
            <Link to="/cart" className="relative">
              <span className="text-2xl">🛒</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 
                  text-white text-xs font-bold rounded-full w-4 h-4 
                  flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-orange-500 transition-colors"
            >
              {menuOpen ? (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 
            flex flex-col gap-2 shadow-lg">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-xl font-bold text-sm 
                transition-colors flex items-center gap-2
                ${isActive(link.to)
                  ? 'bg-orange-50 text-orange-500'
                  : 'text-gray-600 hover:bg-orange-50'}`}>
                {link.emoji} {link.label}
                {link.badge > 0 && (
                  <span className="bg-orange-500 text-white text-xs font-bold
                    rounded-full w-5 h-5 flex items-center justify-center ml-auto">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}

            {typeof window !== 'undefined' &&
              localStorage.getItem('adminAuth') === 'true' && (
              <Link to="/admin"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl font-bold text-sm
                bg-gray-800 text-white flex items-center gap-2">
                🛡️ Admin Dashboard
              </Link>
            )}

            <Link to="/login"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 rounded-xl font-bold text-sm
              bg-orange-500 text-white text-center hover:bg-orange-600">
              Login
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white 
        border-t border-gray-200 shadow-2xl z-50">
        <div className="flex justify-around items-center py-2">
          {[
            { to: '/', emoji: '🏠', label: 'Home' },
            { to: '/cart', emoji: '🛒', label: 'Cart', badge: totalItems },
            { to: '/profile', emoji: '👤', label: 'Profile' },
            { to: '/login', emoji: '🔐', label: 'Login' },
          ].map(item => (
            <Link key={item.to} to={item.to}
              className={`flex flex-col items-center gap-0.5 px-3 py-1
              relative transition-colors
              ${isActive(item.to) ? 'text-orange-500' : 'text-gray-400'}`}>
              <span className="text-2xl">{item.emoji}</span>
              {item.badge > 0 && (
                <span className="absolute top-0 right-1 bg-orange-500 
                  text-white text-xs font-bold rounded-full w-4 h-4 
                  flex items-center justify-center">
                  {item.badge}
                </span>
              )}
              <span className="text-xs font-bold">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Bottom Padding */}
      <div className="md:hidden h-16" />
    </>
  )
}

export default Navbar