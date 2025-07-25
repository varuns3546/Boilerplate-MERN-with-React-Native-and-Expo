import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = `/api/users/`

const register = async (userData) => {
    const response = await axios.post(API_URL, userData)
    if (response.data) {
        await AsyncStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const authService = {
    register,
}

export default authService