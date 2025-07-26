import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import entryService from './entryService'
const initialState = {
  entries: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new entry
export const createEntry = createAsyncThunk(
  'entries/create',
  async (entryData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await entryService.createEntry(entryData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user entries
export const getEntries = createAsyncThunk(
  'entries/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await entryService.getEntries(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user entry
export const deleteEntry = createAsyncThunk(
  'entries/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      const data = await entryService.deleteEntry(id, token)
      console.log('delete entry result', data)
      return data
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const entrySlice = createSlice({
  name: 'entry',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEntry.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createEntry.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // Ensure state.entries is an array before pushing
        if (Array.isArray(state.entries)) {
          state.entries.push(action.payload)
        } else {
          console.error('state.entries is not an array:', state.entries)
          state.entries = [action.payload]
        }
      })
      .addCase(createEntry.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getEntries.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEntries.fulfilled, (state, action) => {
        console.log('get entries payload', action.payload)
        state.isLoading = false
        state.isSuccess = true
        // If payload has entries property, use it; otherwise use payload directly
        state.entries = action.payload.entries || action.payload
      })
      .addCase(getEntries.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteEntry.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteEntry.fulfilled, (state, action) => {
        console.log('entries before filter', state.isLoading, state.entries);
        state.isLoading = false
        state.isSuccess = true
        // Ensure state.entries is an array before filtering
        if (Array.isArray(state.entries)) {
          state.entries = state.entries.filter(
            (entry) => entry._id !== action.payload.id
          )
        } else {
          console.error('state.entries is not an array:', state.entries)
        }
        console.log('entries after filter', state.entries);
      })
      .addCase(deleteEntry.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = entrySlice.actions
export default entrySlice.reducer