import { configureStore } from '@reduxjs/toolkit'

import walletReducer from './components/ConnectWallet/walletSlice'

export default configureStore({
  reducer: {
    wallet: walletReducer,
  }
})