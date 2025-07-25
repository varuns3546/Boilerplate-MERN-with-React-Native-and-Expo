import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    await AsyncStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    await AsyncStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = async () => {
    await AsyncStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService