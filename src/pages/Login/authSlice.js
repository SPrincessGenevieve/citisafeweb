import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "counter",
  initialState: {
    token: localStorage.getItem("token") || "",
    setIsLoggedIn: Boolean(localStorage.getItem("token")),
  },
  reducers: {
    setLogin: (state, action) => {
      state.setIsLoggedIn = true;
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setLogout: (state) => {
      state.setIsLoggedIn = false;
      state.token = "";
      localStorage.removeItem("token");
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
