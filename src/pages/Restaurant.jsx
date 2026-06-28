import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const restaurantData = {
  1: {
    name: 'Burger King',
    emoji: '🍔',
    cuisine: 'Burgers • Fast Food',
    rating: 4.5,
    time: '30 mins',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=300&fit=crop',
    menu: [
      { id: 101, name: 'Whopper Burger', price: 180, emoji: '🍔', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop' },
      { id: 102, name: 'Cheese Burger', price: 120, emoji: '🧀', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=200&h=200&fit=crop' },
      { id: 103, name: 'Crispy Fries', price: 80, emoji: '🍟', image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=200&h=200&fit=crop' },
      { id: 104, name: 'Cold Drink', price: 50, emoji: '🥤', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&h=200&fit=crop' },
      { id: 105, name: 'Onion Rings', price: 90, emoji: '🧅', image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=200&h=200&fit=crop' },
      { id: 106, name: 'Ice Cream', price: 70, emoji: '🍦', image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=200&h=200&fit=crop' },
    ]
  },
  2: {
    name: 'Pizza Hut',
    emoji: '🍕',
    cuisine: 'Pizza • Italian',
    rating: 4.3,
    time: '45 mins',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=300&fit=crop',
    menu: [
      { id: 201, name: 'Margherita Pizza', price: 250, emoji: '🍕', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop' },
      { id: 202, name: 'Pepperoni Pizza', price: 320, emoji: '🍕', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop' },
      { id: 203, name: 'Pasta Arrabbiata', price: 180, emoji: '🍝', image: 'https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?w=200&h=200&fit=crop' },
      { id: 204, name: 'Garlic Bread', price: 90, emoji: '🥖', image: 'https://images.unsplash.com/photo-1619531040576-f9416740661e?w=200&h=200&fit=crop' },
      { id: 205, name: 'Cold Drink', price: 50, emoji: '🥤', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&h=200&fit=crop' },
      { id: 206, name: 'Choco Lava', price: 120, emoji: '🍫', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200&h=200&fit=crop' },
    ]
  },
  3: {
    name: 'KFC',
    emoji: '🍗',
    cuisine: 'Chicken • Fast Food',
    rating: 4.2,
    time: '25 mins',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&h=300&fit=crop',
    menu: [
      { id: 301, name: 'Crispy Chicken', price: 200, emoji: '🍗', image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200&h=200&fit=crop' },
      { id: 302, name: 'Chicken Bucket', price: 450, emoji: '🪣', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=200&h=200&fit=crop' },
      { id: 303, name: 'Zinger Burger', price: 180, emoji: '🍔', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop' },
      { id: 304, name: 'Popcorn Chicken', price: 130, emoji: '🍿', image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=200&h=200&fit=crop' },
      { id: 305, name: 'Fries', price: 80, emoji: '🍟', image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=200&h=200&fit=crop' },
      { id: 306, name: 'Pepsi', price: 50, emoji: '🥤', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&h=200&fit=crop' },
    ]
  },
  4: {
    name: 'Dominos',
    emoji: '🧀',
    cuisine: 'Pizza • Pasta',
    rating: 4.4,
    time: '40 mins',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=300&fit=crop',
    menu: [
      { id: 401, name: 'Farm House Pizza', price: 300, emoji: '🍕', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop' },
      { id: 402, name: 'Cheese Burst Pizza', price: 350, emoji: '🧀', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop' },
      { id: 403, name: 'Pasta Italiano', price: 200, emoji: '🍝', image: 'https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?w=200&h=200&fit=crop' },
      { id: 404, name: 'Garlic Breadsticks', price: 100, emoji: '🥖', image: 'https://images.unsplash.com/photo-1619531040576-f9416740661e?w=200&h=200&fit=crop' },
      { id: 405, name: 'Choco Lava Cake', price: 99, emoji: '🍫', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200&h=200&fit=crop' },
      { id: 406, name: 'Cold Drink', price: 50, emoji: '🥤', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&h=200&fit=crop' },
    ]
  },
  5: {
    name: 'Subway',
    emoji: '🥪',
    cuisine: 'Sandwiches • Healthy',
    rating: 4.1,
    time: '20 mins',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&h=300&fit=crop',
    menu: [
      { id: 501, name: 'Veggie Delight Sub', price: 150, emoji: '🥪', image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=200&h=200&fit=crop' },
      { id: 502, name: 'Chicken Teriyaki', price: 200, emoji: '🥪', image: 'https://images.unsplash.com/photo-1554433607-66b5efe9d304?w=200&h=200&fit=crop' },
      { id: 503, name: 'BMT Sub', price: 220, emoji: '🥪', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=200&h=200&fit=crop' },
      { id: 504, name: 'Tuna Sub', price: 210, emoji: '🥪', image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=200&h=200&fit=crop' },
      { id: 505, name: 'Cookie', price: 60, emoji: '🍪', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=200&h=200&fit=crop' },
      { id: 506, name: 'Cold Drink', price: 50, emoji: '🥤', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&h=200&fit=crop' },
    ]
  },
  6: {
    name: 'Biryani House',
    emoji: '🍛',
    cuisine: 'Biryani • Indian',
    rating: 4.6,
    time: '50 mins',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&h=300&fit=crop',
    menu: [
      { id: 601, name: 'Chicken Biryani', price: 220, emoji: '🍛', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=200&h=200&fit=crop' },
      { id: 602, name: 'Veg Biryani', price: 160, emoji: '🍛', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&h=200&fit=crop' },
      { id: 603, name: 'Mutton Biryani', price: 280, emoji: '🍛', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=200&h=200&fit=crop' },
      { id: 604, name: 'Raita', price: 40, emoji: '🥣', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&h=200&fit=crop' },
      { id: 605, name: 'Gulab Jamun', price: 60, emoji: '🍮', image: 'https://images.pexels.com/photos/18488298/pexels-photo-18488298.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: 606, name: 'Lassi', price: 70, emoji: '🥛', image: 'https://images.pexels.com/photos/6808666/pexels-photo-6808666.jpeg?auto=compress&cs=tinysrgb&w=400' },
    ]
  },
}

function Restaurant() {
  const { id } = useParams()
  const { addToCart, cartItems } = useCart()
  const resto = restaurantData[id] || restaurantData[1]

  const getQuantity = (itemId) => {
    const item = cartItems.find(i => i.id === itemId)
    return item ? item.quantity : 0
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="relative h-56 overflow-hidden">
        <img src={resto.image} alt={resto.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl font-extrabold">{resto.name}</h1>
          <p className="text-gray-200 mt-1">{resto.cuisine}</p>
          <div className="flex gap-6 mt-3 text-sm">
            <span>⭐ {resto.rating}</span>
            <span>🕐 {resto.time}</span>
            <span>🛵 Free Delivery</span>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resto.menu.map(item => (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow flex justify-between items-center hover:shadow-lg hover:border-orange-300 border-2 border-transparent transition-all">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover"
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block' }} />
                <span className="text-4xl hidden">{item.emoji}</span>
                <div>
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <p className="text-orange-500 font-bold">₹{item.price}</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                {getQuantity(item.id) > 0 && (
                  <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-bold">{getQuantity(item.id)} ✅</span>
                )}
                <button onClick={() => addToCart(item)} className="bg-orange-500 text-white px-5 py-2 rounded-xl font-bold hover:bg-orange-600 transition-colors">Add +</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Restaurant