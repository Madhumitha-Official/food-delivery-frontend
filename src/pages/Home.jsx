import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

// HERO CAROUSEL SLIDES
const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&h=500&fit=crop',
    title: 'Hungry? We Got You! 🍕',
    subtitle: 'Order from 100+ restaurants near you in Chennai'
  },
  {
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1400&h=500&fit=crop',
    title: 'Fresh Pizza Delivered! 🍕',
    subtitle: 'Hot & cheesy pizza at your doorstep in 30 mins'
  },
  {
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1400&h=500&fit=crop',
    title: 'Juicy Burgers Await! 🍔',
    subtitle: 'Premium burgers from top restaurants'
  },
  {
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=1400&h=500&fit=crop',
    title: 'Authentic Biryani! 🍛',
    subtitle: 'Traditional flavors delivered to your home'
  }
]

const restaurants = [
  { id: 1, name: 'Burger King', cuisine: 'Burgers • Fast Food', rating: 4.5, time: '30 mins', emoji: '🍔', price: '₹150', offers: '20% OFF',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=200&fit=crop',
    categories: ['Burgers', 'Snacks', 'Drinks', 'Desserts'] },
  { id: 2, name: 'Pizza Hut', cuisine: 'Pizza • Italian', rating: 4.3, time: '45 mins', emoji: '🍕', price: '₹250', offers: 'Free Delivery',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=200&fit=crop',
    categories: ['Pizza', 'Drinks', 'Desserts'] },
  { id: 3, name: 'KFC', cuisine: 'Chicken • Fast Food', rating: 4.2, time: '25 mins', emoji: '🍗', price: '₹200', offers: '10% OFF',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=200&fit=crop',
    categories: ['Chicken', 'Snacks', 'Drinks', 'Burgers'] },
  { id: 4, name: 'Dominos', cuisine: 'Pizza • Pasta', rating: 4.4, time: '40 mins', emoji: '🧀', price: '₹300', offers: 'Buy 1 Get 1',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=200&fit=crop',
    categories: ['Pizza', 'Drinks', 'Desserts'] },
  { id: 5, name: 'Subway', cuisine: 'Sandwiches • Healthy', rating: 4.1, time: '20 mins', emoji: '🥪', price: '₹180', offers: '15% OFF',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=200&fit=crop',
    categories: ['Healthy', 'Snacks', 'Drinks'] },
  { id: 6, name: 'Biryani House', cuisine: 'Biryani • Indian', rating: 4.6, time: '50 mins', emoji: '🍛', price: '₹220', offers: 'Free Delivery',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=200&fit=crop',
    categories: ['Biryani', 'Drinks', 'Desserts'] },
]

const categories = [
  { name: 'Burgers', emoji: '🍔' },
  { name: 'Pizza', emoji: '🍕' },
  { name: 'Biryani', emoji: '🍛' },
  { name: 'Chicken', emoji: '🍗' },
  { name: 'Healthy', emoji: '🥗' },
  { name: 'Desserts', emoji: '🍦' },
  { name: 'Drinks', emoji: '🥤' },
  { name: 'Snacks', emoji: '🍟' },
]

const offers = [
  { title: '50% OFF', subtitle: 'On first order', emoji: '🎉', bg: 'from-orange-400 to-red-400' },
  { title: 'Free Delivery', subtitle: 'Orders above ₹199', emoji: '🛵', bg: 'from-green-400 to-teal-400' },
  { title: 'Buy 1 Get 1', subtitle: 'On selected items', emoji: '🎁', bg: 'from-purple-400 to-pink-400' },
]

const topDishes = [
  { id: 1, name: 'Chicken Burger', price: '₹120', emoji: '🍔', resto: 'Burger King',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop' },
  { id: 2, name: 'Margherita Pizza', price: '₹250', emoji: '🍕', resto: 'Pizza Hut',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop' },
  { id: 3, name: 'Crispy Chicken', price: '₹180', emoji: '🍗', resto: 'KFC',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200&h=200&fit=crop' },
  { id: 4, name: 'Veg Biryani', price: '₹160', emoji: '🍛', resto: 'Biryani House',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=200&h=200&fit=crop' },
  { id: 5, name: 'Sub Sandwich', price: '₹150', emoji: '🥪', resto: 'Subway',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=200&h=200&fit=crop' },
  { id: 6, name: 'Pasta', price: '₹200', emoji: '🍝', resto: 'Dominos',
    image: 'https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?w=200&h=200&fit=crop' },
]

const testimonials = [
  { name: 'Priya', review: 'Super fast delivery! Food was hot and fresh 😍', rating: 5, avatar: '👩' },
  { name: 'Naveen', review: 'Best food app in Chennai! Love the variety 🔥', rating: 5, avatar: '👨' },
  { name: 'Kamali', review: 'Easy to order and track. Highly recommend! ⭐', rating: 4, avatar: '👩‍🦱' },
]

// SEARCH DATA
const searchData = [
  ...restaurants.map(r => ({ 
    type: 'restaurant', 
    name: r.name, 
    id: r.id, 
    image: r.image, 
    emoji: r.emoji 
  })),
  { type: 'dish', name: 'Whopper Burger', id: 1, price: '₹180', resto: 'Burger King', emoji: '🍔' },
  { type: 'dish', name: 'Cheese Burger', id: 1, price: '₹120', resto: 'Burger King', emoji: '🧀' },
  { type: 'dish', name: 'Margherita Pizza', id: 2, price: '₹250', resto: 'Pizza Hut', emoji: '🍕' },
  { type: 'dish', name: 'Pepperoni Pizza', id: 2, price: '₹320', resto: 'Pizza Hut', emoji: '🍕' },
  { type: 'dish', name: 'Crispy Chicken', id: 3, price: '₹200', resto: 'KFC', emoji: '🍗' },
  { type: 'dish', name: 'Chicken Bucket', id: 3, price: '₹450', resto: 'KFC', emoji: '🪣' },
  { type: 'dish', name: 'Farm House Pizza', id: 4, price: '₹300', resto: 'Dominos', emoji: '🍕' },
  { type: 'dish', name: 'Cheese Burst Pizza', id: 4, price: '₹350', resto: 'Dominos', emoji: '🧀' },
  { type: 'dish', name: 'Veggie Delight Sub', id: 5, price: '₹150', resto: 'Subway', emoji: '🥪' },
  { type: 'dish', name: 'Chicken Teriyaki', id: 5, price: '₹200', resto: 'Subway', emoji: '🥪' },
  { type: 'dish', name: 'Chicken Biryani', id: 6, price: '₹220', resto: 'Biryani House', emoji: '🍛' },
  { type: 'dish', name: 'Mutton Biryani', id: 6, price: '₹280', resto: 'Biryani House', emoji: '🍛' },
  { type: 'dish', name: 'Veg Biryani', id: 6, price: '₹160', resto: 'Biryani House', emoji: '🍛' },
  { type: 'dish', name: 'Crispy Fries', id: 1, price: '₹80', resto: 'Burger King', emoji: '🍟' },
  { type: 'dish', name: 'Ice Cream', id: 1, price: '₹70', resto: 'Burger King', emoji: '🍦' },
  { type: 'dish', name: 'Garlic Bread', id: 2, price: '₹90', resto: 'Pizza Hut', emoji: '🥖' },
  { type: 'dish', name: 'Lassi', id: 6, price: '₹70', resto: 'Biryani House', emoji: '🥛' },
  { type: 'category', name: 'Burgers', emoji: '🍔' },
  { type: 'category', name: 'Pizza', emoji: '🍕' },
  { type: 'category', name: 'Biryani', emoji: '🍛' },
  { type: 'category', name: 'Chicken', emoji: '🍗' },
  { type: 'category', name: 'Desserts', emoji: '🍦' },
  { type: 'category', name: 'Drinks', emoji: '🥤' },
  { type: 'category', name: 'Snacks', emoji: '🍟' },
  { type: 'category', name: 'Healthy', emoji: '🥗' },
]

function Home() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [favorites, setFavorites] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  // AUTO-SLIDING CAROUSEL
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // LIVE SEARCH
  useEffect(() => {
    if (search.trim() === '') {
      setSearchResults([])
      setShowDropdown(false)
      return
    }
    const query = search.toLowerCase()
    const results = searchData.filter(item => 
      item.name.toLowerCase().includes(query)
    ).slice(0, 6)
    setSearchResults(results)
    setShowDropdown(true)
  }, [search])

  // CLICK OUTSIDE TO CLOSE
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const handleCategory = (name) => {
    if (name === '') {
      setSelected('')
      setTimeout(() => {
        document.getElementById('restaurants')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      navigate(`/category/${name}`)
    }
  }

  const filtered = restaurants.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase())
    const matchCategory = selected ? r.categories?.includes(selected) : true
    return matchSearch && matchCategory
  })

  const slide = heroSlides[currentSlide]

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors`}>
      
      {/* DARK MODE TOGGLE */}
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-20 right-4 z-50 w-12 h-12 bg-orange-500 text-white rounded-full shadow-lg flex items-center justify-center text-xl hover:bg-orange-600 transition-all"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      {/* HERO CAROUSEL */}
      <div className="relative h-96 overflow-hidden">
        {heroSlides.map((s, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
              <p className="text-orange-300 text-sm font-bold mb-2 tracking-widest uppercase">
                🚀 Fast Delivery • Fresh Food • Best Price
              </p>
              <h1 className="text-2xl md:text-5xl font-extrabold mb-3 drop-shadow-lg">
                {s.title}
              </h1>
              <p className="text-gray-200 text-lg mb-6 max-w-xl">
                {s.subtitle}
              </p>
              
              {/* 🔥 SEARCH DROPDOWN - LIGHT MODE FIXED! */}
              <div className="max-w-lg w-full relative" ref={dropdownRef}>
                <input
                  type="text"
                  placeholder="🔍 Search restaurants, dishes, categories..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onFocus={() => search && setShowDropdown(true)}
                  className="w-full px-5 py-3 rounded-full outline-none shadow-xl text-base bg-white text-gray-900 placeholder-gray-500"
                />
                
                {/* DROPDOWN RESULTS */}
                {showDropdown && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-200">
                    {searchResults.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setShowDropdown(false)
                          setSearch('')
                          if (item.type === 'restaurant') navigate(`/restaurant/${item.id}`)
                          else if (item.type === 'dish') navigate(`/restaurant/${item.id}`)
                          else if (item.type === 'category') navigate(`/category/${item.name}`)
                        }}
                        className="flex items-center gap-3 p-3 hover:bg-orange-50 cursor-pointer border-b border-gray-100 last:border-0"
                      >
                        <span className="text-2xl">{item.emoji || '🔍'}</span>
                        <div className="flex-1">
                          <p className="font-bold text-sm text-gray-900">{item.name}</p>
                          <p className="text-gray-500 text-xs">
                            {item.type === 'restaurant' && '🏪 Restaurant'}
                            {item.type === 'dish' && `🍽️ Dish • ${item.resto}`}
                            {item.type === 'category' && '📂 Category'}
                          </p>
                        </div>
                        {item.price && <span className="text-orange-500 font-bold text-sm">{item.price}</span>}
                      </div>
                    ))}
                  </div>
                )}

                {/* NO RESULTS */}
                {showDropdown && searchResults.length === 0 && search.trim() !== '' && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl p-4 text-center z-50 border border-gray-200">
                    <p className="text-gray-600">😔 No results found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-orange-500 w-8' : 'bg-white/50 w-3'
              }`}
            />
          ))}
        </div>

        {/* Arrow Buttons */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full text-2xl z-10"
        >‹</button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full text-2xl z-10"
        >›</button>
      </div>

      {/* Stats */}
      <div className={`shadow-sm px-6 py-5 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto flex justify-around text-center">
          <div><p className="text-2xl font-bold text-orange-500">100+</p><p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Restaurants</p></div>
          <div><p className="text-2xl font-bold text-orange-500">30 min</p><p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Avg Delivery</p></div>
          <div><p className="text-2xl font-bold text-orange-500">4.5 ⭐</p><p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Avg Rating</p></div>
          <div><p className="text-2xl font-bold text-orange-500">50K+</p><p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Happy Users</p></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Admin Quick Access */}
        {localStorage.getItem('adminAuth') === 'true' && (
          <div className="bg-gray-900 text-white rounded-2xl p-4 mb-6 
            flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <span className="text-2xl">🛡️</span>
              <div>
                <p className="font-extrabold">Admin Dashboard</p>
                <p className="text-gray-400 text-xs">Manage orders & restaurants</p>
              </div>
            </div>
            <Link to="/admin"
              className="bg-orange-500 text-white px-4 py-2 rounded-xl 
              font-bold hover:bg-orange-600 transition-colors text-sm">
              Open →
            </Link>
          </div>
        )}

        {/* Offers */}
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>🔥 Today's Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {offers.map((offer, i) => (
            <div key={i} className={`bg-gradient-to-r ${offer.bg} text-white rounded-2xl p-6 flex items-center gap-4 cursor-pointer hover:scale-105 transition-transform duration-200 shadow-lg`}>
              <span className="text-5xl">{offer.emoji}</span>
              <div>
                <p className="text-2xl font-extrabold">{offer.title}</p>
                <p className="text-white/80 text-sm">{offer.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>🍽️ What's on your mind?</h2>
        <div className="flex gap-3 overflow-x-auto pb-3 mb-12">
          <button onClick={() => handleCategory('')}
            className={`flex flex-col items-center px-6 py-4 rounded-2xl border-2 shrink-0 transition-all font-bold
            ${selected === '' ? 'border-orange-500 bg-orange-50 text-orange-500 shadow-md' : darkMode ? 'border-gray-700 bg-gray-800 text-gray-300 hover:border-orange-300' : 'border-gray-200 bg-white text-gray-600 hover:border-orange-300'}`}>
            <span className="text-3xl">🍽️</span><span className="text-xs mt-1">All</span>
          </button>
          {categories.map(cat => (
            <button key={cat.name} onClick={() => handleCategory(cat.name)}
              className={`flex flex-col items-center px-6 py-4 rounded-2xl border-2 shrink-0 transition-all font-bold
              ${selected === cat.name ? 'border-orange-500 bg-orange-50 text-orange-500 shadow-md' : darkMode ? 'border-gray-700 bg-gray-800 text-gray-300 hover:border-orange-300' : 'border-gray-200 bg-white text-gray-600 hover:border-orange-300'}`}>
              <span className="text-3xl">{cat.emoji}</span><span className="text-xs mt-1">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Top Dishes with Favorites */}
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>🌟 Popular Dishes</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {topDishes.map(dish => (
            <div key={dish.id} className={`relative rounded-2xl overflow-hidden shadow hover:shadow-lg border-2 border-transparent hover:border-orange-300 transition-all duration-200 group ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <button
                onClick={(e) => { e.stopPropagation(); toggleFavorite(dish.id) }}
                className="absolute top-2 right-2 z-10 text-2xl drop-shadow-lg"
              >
                {favorites.includes(dish.id) ? '❤️' : '🤍'}
              </button>
              <Link to={`/restaurant/${dish.id}`} className="block">
                <div className="h-28 overflow-hidden">
                  <img src={dish.image} alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
                  <div className="h-28 bg-orange-100 items-center justify-center hidden text-4xl">{dish.emoji}</div>
                </div>
                <div className="p-3 text-center">
                  <p className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{dish.name}</p>
                  <p className="text-orange-500 font-bold text-sm mt-1">{dish.price}</p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>{dish.resto}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Restaurants with Favorites */}
        <h2 id="restaurants" className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>🏪 Top Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filtered.map(resto => (
            <div key={resto.id} className={`relative rounded-2xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden group ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <button
                onClick={() => toggleFavorite(resto.id)}
                className="absolute top-3 right-3 z-20 text-2xl drop-shadow-lg"
              >
                {favorites.includes(resto.id) ? '❤️' : '🤍'}
              </button>
              <Link to={`/restaurant/${resto.id}`} className="block">
                <div className="h-44 relative overflow-hidden">
                  <img src={resto.image} alt={resto.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
                  <div className={`h-44 items-center justify-center absolute inset-0 hidden ${darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-600' : 'bg-gradient-to-br from-orange-100 to-orange-200'}`}>
                    <span className="text-8xl">{resto.emoji}</span>
                  </div>
                  <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow z-10">{resto.offers}</span>
                </div>
                <div className="p-4">
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{resto.name}</h3>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{resto.cuisine}</p>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex gap-3 text-sm">
                      <span className="text-orange-500 font-bold">⭐ {resto.rating}</span>
                      <span className="text-gray-300">|</span>
                      <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>🕐 {resto.time}</span>
                    </div>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>From {resto.price}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-6xl mb-4">😔</p>
            <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No restaurants found!</p>
          </div>
        )}

        {/* How It Works */}
        <div className={`rounded-2xl p-8 mb-12 shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-2xl font-bold mb-8 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>🤔 How It Works?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            {[
              { step: '1', emoji: '📱', title: 'Choose Restaurant', desc: 'Browse from 100+ restaurants' },
              { step: '2', emoji: '🛒', title: 'Add to Cart', desc: 'Select your favorite dishes' },
              { step: '3', emoji: '💳', title: 'Pay Online', desc: 'Safe & secure payment' },
              { step: '4', emoji: '🛵', title: 'Fast Delivery', desc: 'Get food at your doorstep' },
            ].map(item => (
              <div key={item.step} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-3xl mb-3 shadow">{item.emoji}</div>
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm mb-2">{item.step}</div>
                <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{item.title}</p>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>💬 What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t, i) => (
            <div key={i} className={`rounded-2xl p-6 shadow hover:shadow-lg transition-all ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{t.avatar}</span>
                <div>
                  <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{t.name}</p>
                  <p className="text-yellow-400">{'⭐'.repeat(t.rating)}</p>
                </div>
              </div>
              <p className={`italic ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>"{t.review}"</p>
            </div>
          ))}
        </div>

        {/* App Download */}
        <div className="bg-gradient-to-r from-orange-500 to-red-400 rounded-2xl p-8 text-white text-center shadow-xl">
          <h2 className="text-3xl font-extrabold mb-2">📱 Download Our App!</h2>
          <p className="text-orange-100 mb-6">Get exclusive app-only deals and faster ordering!</p>
          <div className="flex justify-center gap-4">
            <button className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-900 transition-colors">🍎 App Store</button>
            <button className="bg-white text-orange-500 px-6 py-3 rounded-xl font-bold hover:bg-orange-50 transition-colors">🤖 Google Play</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home