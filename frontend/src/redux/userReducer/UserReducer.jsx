import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
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
  },
});

export const { signinSuccess, signinFailure } = userSlice.actions;

export default userSlice.reducer;
