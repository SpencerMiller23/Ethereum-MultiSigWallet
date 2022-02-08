import { createSlice } from '@reduxjs/toolkit'

export const walletsSlice = createSlice({
  name: 'wallets',
  initialState: {
    wallets: [],
  },
  reducers: {
    setWallets: (state, {payload}) => {
      state.wallets.push({ name: payload.name, address: payload.address })
    }
  }
})

// each case under reducers becomes an action
export const { setWallets } = walletsSlice.actions

export default walletsSlice.reducer