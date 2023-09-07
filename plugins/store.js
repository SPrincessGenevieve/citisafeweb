import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../src/pages/Login/authSlice'

export default configureStore({
  reducer: {
    auth: authReducer
  }
})