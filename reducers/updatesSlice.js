import { createSlice } from '@reduxjs/toolkit'

export const updatesSlice = createSlice({
  name: 'updates',
  initialState: {
    updates: false,
  },
  reducers: {
    setUpdates: (state) => {
      state.updates = !state.updates
    }
  }
})

// each case under reducers becomes an action
export const { setUpdates } = updatesSlice.actions

export default updatesSlice.reducer