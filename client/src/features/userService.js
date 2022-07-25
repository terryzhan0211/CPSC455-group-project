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

// Edit user info
const editUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL + 'me', userData,config)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// likePost
const likePost = async (useridAndpostid, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL + 'likePost', useridAndpostid, config)

  return response.data;
}


const userService = {
  register,
  logout,
  login,
  editUser,
  likePost
}

export default userService
