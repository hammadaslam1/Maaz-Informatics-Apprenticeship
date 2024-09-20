import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loggedIn: false,
  loggedOut: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    signinFailure: (state) => {
      state.currentUser = null;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
    },
  },
});

export const { signinSuccess, signinFailure, signoutSuccess } =
  userSlice.actions;

export default userSlice.reducer;
