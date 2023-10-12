import { createSlice } from "@reduxjs/toolkit";

const userData = JSON.parse(localStorage.getItem("userData")) || null;

const initialState = {
  user: userData,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserFromLocalStorage: (state, action) => {
        state.user = action.payload;

    },
    logout: (state) => {
      !!localStorage.removeItem('userData');
      state.user = null;
    }
  },
});

export const { setUserFromLocalStorage, logout } = UserSlice.actions;

export default UserSlice.reducer;