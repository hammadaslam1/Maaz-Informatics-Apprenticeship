import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isTried: false,
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
    userFound: (state, action) => {
      state.isTried = true;
    },
    userNotFound: (state) => {
      state.isTried = true;
    },
    setLoggedIn: (state) => {
      state.loggedIn = true;
      state.loggedOut = false;
    },
    setLoggedOut: (state) => {
      state.loggedIn = false;
      state.loggedOut = true;
    },
  },
});

export const {
  signinSuccess,
  signinFailure,
  userFound,
  userNotFound,
  setLoggedIn,
  setLoggedOut,
} = userSlice.actions;

export default userSlice.reducer;
