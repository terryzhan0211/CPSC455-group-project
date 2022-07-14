import axios from 'axios'

const API_URL = 'http://localhost:3001/users/'

// Register 
const register = async (userData) => {
  const response = await axios.post(API_URL + 'signup', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout
const logout = () => {
  localStorage.removeItem('user')
}

const userService = {
  register,
  logout,
  login,
}

export default userService