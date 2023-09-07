import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Login/authSlice'

export default configureStore({
  reducer: {
    auth: authReducer
  }
})