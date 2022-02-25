import { configureStore } from '@reduxjs/toolkit'

import accountReducer from './reducers/accountSlice'
import walletsReducer from './reducers/walletsSlice'
import updatesReducer from './reducers/updatesSlice'

export default configureStore({
  reducer: {
    account: accountReducer,
    wallets: walletsReducer,
    updates: updatesReducer,
  }
})