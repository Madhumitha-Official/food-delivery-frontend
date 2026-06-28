import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser, loginUser } from '../api'

function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: ''
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')
    if (!formData.email || !formData.password) {
      setError('Please fill all fields!')
      return
    }

    setLoading(true)
    try {
      if (isLogin) {
        // Login
        const res = await loginUser(formData.email, formData.password)
        if (res.access_token) {
          localStorage.setItem('token', res.access_token)
          localStorage.setItem('username', res.username)
          localStorage.setItem('email', formData.email)
          alert('Login Successful! 🎉')
          navigate('/')
        } else {
          setError(res.detail || 'Login failed!')
        }
      } else {
        // Register
        if (!formData.name) {
          setError('Please enter your name!')
          setLoading(false)
          return
        }
        const res = await registerUser({
          email: formData.email,
          username: formData.email,
          password: formData.password,
          full_name: formData.name
        })
        if (res.username) {
          localStorage.setItem('fullname', formData.name)
          localStorage.setItem('email', formData.email)
          localStorage.setItem('phone', formData.phone)
          localStorage.setItem('gender', formData.gender)
          alert('Account Created! Now login 🎉')
          setIsLogin(true)
        } else {
          setError(res.detail || 'Registration failed!')
        }
      }
    } catch (err) {
      setError('Server error! check Backend running')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">

        {/* Logo */}
        <div className="text-center mb-6">
          <p className="text-5xl mb-2">🍕</p>
          <h1 className="text-2xl font-bold text-orange-500">FoodApp</h1>
        </div>

        {/* Toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-lg font-bold transition-all
              ${isLogin ? 'bg-orange-500 text-white shadow' : 'text-gray-500'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-lg font-bold transition-all
              ${!isLogin ? 'bg-orange-500 text-white shadow' : 'text-gray-500'}`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-3 rounded-xl outline-orange-400 w-full"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number (eg: 9876543210)"
                value={formData.phone}
                onChange={handleChange}
                className="border p-3 rounded-xl outline-orange-400 w-full"
              />

              {/* Gender Select */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, gender: 'male'})}
                  className={`flex-1 py-3 rounded-xl font-bold border-2 
                  transition-all flex items-center justify-center gap-2
                  ${formData.gender === 'male'
                    ? 'border-orange-500 bg-orange-50 text-orange-500'
                    : 'border-gray-200 text-gray-500'}`}
                >
                  👨 Male
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, gender: 'female'})}
                  className={`flex-1 py-3 rounded-xl font-bold border-2 
                  transition-all flex items-center justify-center gap-2
                  ${formData.gender === 'female'
                    ? 'border-orange-500 bg-orange-50 text-orange-500'
                    : 'border-gray-200 text-gray-500'}`}
                >
                  👩 Female
                </button>
              </div>
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded-xl outline-orange-400 w-full"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-3 rounded-xl outline-orange-400 w-full"
          />

          {isLogin && (
            <p className="text-right text-orange-500 text-sm cursor-pointer hover:underline">
              Forgot Password?
            </p>
          )}

          {error && (
          <p className="text-red-500 text-sm font-bold bg-red-50 
            p-3 rounded-xl text-center">
            ❌ {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-orange-500 text-white py-3 rounded-xl 
          font-bold text-lg hover:bg-orange-600 transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '⏳ Please wait...' : isLogin ? 'Login 🚀' : 'Create Account 🎉'}
        </button>
        </div>

        {/* Switch */}
        <p className="text-center text-gray-500 mt-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange-500 font-bold cursor-pointer hover:underline"
          >
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>

      </div>
    </div>
  )
}

export default Login