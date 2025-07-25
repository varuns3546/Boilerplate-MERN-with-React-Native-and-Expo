import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import entrieservice from './entrieservice'

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
      return await entrieservice.createEntry(entryData, token)
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
export const getEntrys = createAsyncThunk(
  'entries/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await entrieservice.getEntrys(token)
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
      return await entrieservice.deleteEntry(id, token)
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

export const entrieslice = createSlice({
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
        state.entries.push(action.payload)
      })
      .addCase(createEntry.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getEntrys.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEntrys.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.entries = action.payload
      })
      .addCase(getEntrys.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteEntry.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteEntry.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.entries = state.entries.filter(
          (entry) => entry._id !== action.payload.id
        )
      })
      .addCase(deleteEntry.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = entrieslice.actions
export default entrieslice.reducer