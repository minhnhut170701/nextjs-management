import { createSlice } from "@reduxjs/toolkit";

const userData = JSON.parse(!!localStorage.getItem("userData")) || null;

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
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('userData');
      } else {
        // If neither localStorage nor sessionStorage is supported
        console.log('Web Storage is not supported in this environment.');
      }
      state.user = null;
    }
  },
});

export const { setUserFromLocalStorage, logout } = UserSlice.actions;

export default UserSlice.reducer;