import { createSlice } from "@reduxjs/toolkit";

const userData = typeof window !== "undefined"  ?  JSON.parse(localStorage.getItem("userData")) : null;

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
      if (typeof window !== "undefined") {
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