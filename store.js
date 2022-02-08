import { configureStore } from '@reduxjs/toolkit'

import accountReducer from './components/ConnectWallet/accountSlice'

export default configureStore({
  reducer: {
    account: accountReducer,
  }
})