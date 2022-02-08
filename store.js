import { configureStore } from '@reduxjs/toolkit'

import accountReducer from './reducers/accountSlice'
import walletsReducer from './reducers/walletsSlice'

export default configureStore({
  reducer: {
    account: accountReducer,
    wallets: walletsReducer,
  }
})