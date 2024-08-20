import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  register: false,
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
      state.register = true;
    },
    userNotFound: (state) => {
      state.register = false;
    },
  },
});

export const { signinSuccess, signinFailure } = userSlice.actions;

export default userSlice.reducer;
