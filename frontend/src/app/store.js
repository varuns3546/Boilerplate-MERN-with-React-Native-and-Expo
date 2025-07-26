import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import entryReducer from '../features/entries/entrySlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        entries: entryReducer,
    },
})

export default store