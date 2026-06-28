import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useCart } from '../context/CartContext'

const categoryItems = {
  'Drinks': [
    { id: 901, name: 'Pepsi', price: 50, image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=300&fit=crop', resto: 'KFC' },
    { id: 902, name: 'Coca Cola', price: 50, image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=400', resto: 'Burger King' },
    { id: 903, name: 'Lassi', price: 70, image: 'https://images.pexels.com/photos/6808666/pexels-photo-6808666.jpeg?auto=compress&cs=tinysrgb&w=400', resto: 'Biryani House' },
    { id: 904, name: 'Lemonade', price: 60, image: 'https://images.pexels.com/photos/2109099/pexels-photo-2109099.jpeg?auto=compress&cs=tinysrgb&w=400', resto: 'Subway' },
    { id: 905, name: 'Mango Juice', price: 80, image: 'https://images.pexels.com/photos/4023132/pexels-photo-4023132.jpeg?auto=compress&cs=tinysrgb&w=400', resto: 'Pizza Hut' },
    { id: 906, name: 'Milkshake', price: 120, image: 'https://images.pexels.com/photos/3727250/pexels-photo-3727250.jpeg?auto=compress&cs=tinysrgb&w=400', resto: 'Dominos' },
  ],
  'Desserts': [
    { id: 911, name: 'Ice Cream', price: 70, image: 'https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=400', resto: 'Burger King' },
    { id: 912, name: 'Choco Lava Cake', price: 120, image: 'https://images.pexels.com/photos/132694/pexels-photo-132694.jpeg?auto=compress&cs=tinysrgb&w=400', resto: 'Pizza Hut' },
    { id: 913, name: 'Gulab Jamun', price: 60, image: 'https://images.pexels.com/photos/18488298/pexels-photo-18488298.jpeg?auto=compress&cs=tinysrgb&w=400', resto: 'Biryani House' },
    { id: 914, name: 'Cookie', price: 60, image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400', resto: 'Subway' },
    { id: 915, name: 'Brownie', price: 90, image: 'https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&w=400', resto: 'Dominos' },
    { id: 916, name: 'Cheesecake', price: 150, image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=400', resto: 'Pizza Hut' },
  ],
    'Snacks': [
    { id: 921, name: 'Samosa', price: 80, image: 'https://images.pexels.com/photos/14477873/pexels-photo-14477873.jpeg?auto=compress&cs=tinysrgb&w=400', resto: 'Biryani House' },
    { id: 922, name: 'Puffs', price: 90, image: 'https://images.pexels.com/photos/23369295/pexels-photo-23369295.jpeg?auto=compress&cs=tinysrgb&w=400', resto: 'Burger King' },
    { id: 923, name: 'Crispy Fries', price: 130, image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400', resto: 'KFC' },
    { id: 924, name: 'Onion Rings', price: 90, image: 'https://images.pexels.com/photos/34528321/pexels-photo-34528321.jpeg?auto=compress&cs=tinysrgb&w=400', resto: 'Burger King' },
    { id: 925, name: 'Garlic Bread', price: 110, image: 'https://images.pexels.com/photos/37624303/pexels-photo-37624303.jpeg?auto=compress&cs=tinysrgb&w=400', resto: 'Pizza Hut' },
    { id: 926, name: 'Veggie Wrap', price: 100, image: 'https://images.pexels.com/photos/4955265/pexels-photo-4955265.jpeg?auto=compress&cs=tinysrgb&w=400', resto: 'Subway' },
  ],
     'Biryani': [
    { id: 931, name: 'Chicken Biryani', price: 220, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop', resto: 'Biryani House' },
    { id: 932, name: 'Mutton Biryani', price: 280, image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400&h=300&fit=crop', resto: 'Biryani House' },
    { id: 933, name: 'Veg Biryani', price: 160, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop', resto: 'Biryani House' },
    { id: 934, name: 'Egg Biryani', price: 180, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop', resto: 'Biryani House' },
  ],
 'Burgers': [
    { id: 941, name: 'Whopper Burger', price: 180, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop', resto: 'Burger King' },
    { id: 942, name: 'Cheese Burger', price: 120, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop', resto: 'Burger King' },
    { id: 943, name: 'Zinger Burger', price: 180, image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=400&h=300&fit=crop', resto: 'KFC' },
    { id: 944, name: 'Double Burger', price: 220, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop', resto: 'Burger King' },
  ],
  'Pizza': [
    { id: 951, name: 'Margherita Pizza', price: 250, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop', resto: 'Pizza Hut' },
    { id: 952, name: 'Pepperoni Pizza', price: 320, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop', resto: 'Pizza Hut' },
    { id: 953, name: 'Farm House Pizza', price: 300, image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=400', resto: 'Dominos' },
    { id: 954, name: 'Cheese Burst Pizza', price: 350, image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&h=300&fit=crop', resto: 'Dominos' },
  ],
 'Chicken': [
    { id: 961, name: 'Crispy Chicken', price: 200, image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop', resto: 'KFC' },
    { id: 962, name: 'Chicken Bucket', price: 450, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop', resto: 'KFC' },
    { id: 963, name: 'Chicken Biryani', price: 220, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop', resto: 'Biryani House' },
    { id: 964, name: 'Grilled Chicken', price: 250, image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop', resto: 'KFC' },
  ],
  'Healthy': [
    { id: 971, name: 'Veggie Delight Sub', price: 150, image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop', resto: 'Subway' },
    { id: 972, name: 'Chicken Teriyaki', price: 200, image: 'https://images.unsplash.com/photo-1554433607-66b5efe9d304?w=400&h=300&fit=crop', resto: 'Subway' },
    { id: 973, name: 'Tuna Sub', price: 210, image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&h=300&fit=crop', resto: 'Subway' },
    { id: 974, name: 'Green Salad', price: 120, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', resto: 'Subway' },
  ],
}
const categoryEmojis = {
  'Drinks': '🥤', 'Desserts': '🍦', 'Snacks': '🍟',
  'Biryani': '🍛', 'Burgers': '🍔', 'Pizza': '🍕',
  'Chicken': '🍗', 'Healthy': '🥗',
}

const categoryBg = {
  'Drinks': 'from-blue-400 to-cyan-400',
  'Desserts': 'from-pink-400 to-rose-400',
  'Snacks': 'from-yellow-400 to-orange-400',
  'Biryani': 'from-orange-500 to-red-400',
  'Burgers': 'from-red-400 to-orange-400',
  'Pizza': 'from-orange-400 to-yellow-400',
  'Chicken': 'from-amber-400 to-orange-400',
  'Healthy': 'from-green-400 to-teal-400',
}

const categoryHeaderImages = {
  'Drinks': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=1200&h=400&fit=crop',
  'Desserts': 'https://images.unsplash.com/photo-1551024601-bec78aea7bca?w=1200&h=400&fit=crop',
  'Snacks': 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a1?w=1200&h=400&fit=crop',
  'Biryani': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=1200&h=400&fit=crop',
  'Burgers': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&h=400&fit=crop',
  'Pizza': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1200&h=400&fit=crop',
  'Chicken': 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=1200&h=400&fit=crop',
  'Healthy': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=400&fit=crop',
}

function CategoryItems() {
  const { name } = useParams()
  const { addToCart, cartItems } = useCart()
  const items = categoryItems[name] || []

  // 🔥 SCROLL TO TOP
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [name])

  const getQuantity = (id) => {
    const item = cartItems.find(i => i.id === id)
    return item ? item.quantity : 0
  }

  const headerImage = categoryHeaderImages[name] || categoryHeaderImages['Burgers']

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Header with background image */}
      <div className="relative h-72 overflow-hidden">
        <img 
          src={headerImage} 
          alt={name} 
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none' }}
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${categoryBg[name] || 'from-orange-500 to-orange-400'} opacity-90`} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-7xl mb-3 drop-shadow-lg">{categoryEmojis[name]}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">{name}</h1>
          <p className="text-white/90 mt-2 text-lg">{items.length} delicious items available</p>
        </div>
      </div>

      {/* Items Grid */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-6xl mb-4">😔</p>
            <p className="text-gray-500 text-xl">No items found!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map(item => (
              <div key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md 
                hover:shadow-xl border-2 border-transparent
                hover:border-orange-300 transition-all duration-300">

                <div className="h-48 overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = `https://placehold.co/400x300/FED7AA/EA580C?text=${encodeURIComponent(item.name)}`
                    }}
                  />
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
                      <p className="text-gray-400 text-sm">📍 {item.resto}</p>
                    </div>
                    {getQuantity(item.id) > 0 && (
                      <span className="bg-orange-100 text-orange-600 
                        text-xs px-2 py-1 rounded-full font-bold shrink-0">
                        {getQuantity(item.id)} in cart
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-orange-500 font-bold text-xl">₹{item.price}</p>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-orange-500 text-white px-5 py-2 
                      rounded-xl font-bold hover:bg-orange-600 
                      active:scale-95 transition-all shadow-md"
                    >
                      Add +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryItems