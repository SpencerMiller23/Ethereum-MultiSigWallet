import { createSlice } from '@reduxjs/toolkit'

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    account: null,
  },
  reducers: {
    setAccount: (state, {payload}) => {
      state.account = payload.account
    }
  }
})

// each case under reducers becomes an action
export const { setAccount } = walletSlice.actions

export default walletSlice.reducer