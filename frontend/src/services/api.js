import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = 'http://172.30.0.2:3000/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const entriesAPI = {
    getEntries: async () =>{
        console.log('getting entries api.js')

        try{
            const response = await api.get('/entries')
            return response.data
        } catch (error){
            throw error.response?.data || { message: 'Network error' };
        }
    },
    getEntry: async (id) => {
        try {
            const response = await api.get(`/entries/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Network error' };
        }
    },
    createEntry: async (entryData) => {
        try {
        const response = await api.post(`/entries`, entryData);
        return response.data;
        } catch (error) {
        throw error.response?.data || { message: 'Network error' };
        }
  },

    deleteEntry: async (id) => {
        try {
        const response = await api.delete(`/entries/${id}`);
        return response.data;
        } catch (error) {
        throw error.response?.data || { message: 'Network error' };
        }
    },
}

export default api;