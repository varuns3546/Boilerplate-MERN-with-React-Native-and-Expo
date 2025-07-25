import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from 'expo-env'
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
});

export const entriesAPI = {
    getEntries: async () =>{
        console.log('getting entries api.js')

        try{
            const response = await api.get('/entries')
            return response.data
        } catch (error){
            throw error.response?.data || { message: 'Network error getting entries' };
        }
    },
    getEntry: async (id) => {
        try {
            const response = await api.get(`/entries/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Network error getting entry' };
        }
    },
    createEntry: async (entryData) => {
        try {
            const response = await api.post(`/entries`, entryData);
            return response.data;
        } catch (error) {
        throw error.response?.data || { message: 'Network error creating entry' };
        }
    },
    updateEntry: async (id, entryData) =>{
        try{
            const response = await api.put(`/entries/${id}`, entryData);
            return response.data
        } catch(error){
            throw error.response?.data || { message: 'Network error updating entry' };

        }
    },
    deleteEntry: async (id) => {
        try {
        const response = await api.delete(`/entries/${id}`);
        return response.data;
        } catch (error) {
        throw error.response?.data || { message: 'Network error deleting entry' };
        }
    },
}

export default api;