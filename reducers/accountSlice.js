import { createSlice } from '@reduxjs/toolkit'

export const accountSlice = createSlice({
  name: 'account',
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
export const { setAccount } = accountSlice.actions

export default accountSlice.reducer