import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    token: "",
    user: {},
  },
  reducers: {
    setLogin: (state) => {
        state.isLoggedIn = true
    },
    setLogout: (state) => {
      state.isLoggedIn = false
    },
    setToken: (state, actions) => {
      state.token = actions.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setLogin, setLogout, setToken } = authSlice.actions

export default authSlice.reducer