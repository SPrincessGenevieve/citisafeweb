import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'counter',
  initialState: {
    token: '',
    setIsLoggedIn: false,
  },
  reducers: {
    setLogin: (state, action) => {
        state.setIsLoggedIn = true
        state.token = action.payload
    },
    setLogout: (state) => {
        state.setIsLoggedIn = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLogin, setLogout } = authSlice.actions

export default authSlice.reducer