import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setLogin: (state) => {
        state.isLoggedIn = true
    }
  }
})

// Action creators are generated for each case reducer function
export const { setLogin } = authSlice.actions

export default authSlice.reducer