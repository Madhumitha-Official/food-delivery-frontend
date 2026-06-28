const BASE_URL = 'http://127.0.0.1:8000'

// ============ AUTH ============

export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
  return response.json()
}

export const loginUser = async (username, password) => {
  const response = await fetch(
    `${BASE_URL}/login?username=${username}&password=${password}`,
    { method: 'POST' }
  )
  return response.json()
}

// ============ RESTAURANTS ============

export const getRestaurants = async () => {
  const response = await fetch(`${BASE_URL}/api/restaurants`)
  return response.json()
}

export const getRestaurant = async (id) => {
  const response = await fetch(`${BASE_URL}/api/restaurants/${id}`)
  return response.json()
}
// ============ ORDERS ============

export const placeOrder = async (orderData) => {
  const response = await fetch(`${BASE_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  })
  return response.json()
}

export const getUserOrders = async (username) => {
  const response = await fetch(`${BASE_URL}/api/orders/${username}`)
  return response.json()
}
export const getAllOrders = async () => {
  const response = await fetch(`${BASE_URL}/api/orders/all`)
  return response.json()
}

export const getOrderById = async (orderId) => {
  const response = await fetch(`${BASE_URL}/api/orders/id/${orderId}`)
  return response.json()
}

export const updateOrderStatus = async (orderId, status) => {
  const response = await fetch(
    `${BASE_URL}/api/orders/${orderId}/status?status=${status}`,
    { method: 'PUT' }
  )
  return response.json()
}