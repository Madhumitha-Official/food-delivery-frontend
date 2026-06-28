import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12 hidden md:block">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Logo Section */}
          <div>
            <h2 className="text-2xl font-bold text-orange-400 mb-3">🍕 FoodApp</h2>
            <p className="text-gray-400 text-sm">
              Best food delivery app in your city. 
              Order from top restaurants near you!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-orange-400">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">🏠 Home</Link>
              <Link to="/cart" className="text-gray-400 hover:text-white transition-colors">🛒 Cart</Link>
              <Link to="/login" className="text-gray-400 hover:text-white transition-colors">🔐 Login</Link>
              <Link to="/tracking" className="text-gray-400 hover:text-white transition-colors">📍 Track Order</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-orange-400">Contact Us</h3>
            <div className="flex flex-col gap-2 text-gray-400 text-sm">
              <p>📧 support@foodapp.com</p>
              <p>📞 +91 98765 43210</p>
              <p>📍 Chennai, Tamil Nadu</p>
              <div className="flex gap-3 mt-2">
                <span className="cursor-pointer hover:text-white text-xl">📘</span>
                <span className="cursor-pointer hover:text-white text-xl">📸</span>
                <span className="cursor-pointer hover:text-white text-xl">🐦</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>© 2026 FoodApp. All rights reserved. Made with ❤️ in Chennai</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer