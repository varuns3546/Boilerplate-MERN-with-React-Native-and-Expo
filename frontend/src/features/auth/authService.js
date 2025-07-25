import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import {API_BASE_URL} from '@env'
const API_URL = API_BASE_URL+'/api/users/'

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
  console.log('attempting login in authService.js')
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    console.log(response.data)
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