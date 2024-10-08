import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  conversationSelected: false,
  selectedUser: null,
  conversation: null,
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
    setConversationSelected: (state, action) => {
      state.conversationSelected = true;
      state.selectedUser = action.payload;
    },
    setConversationClosed: (state) => {
      state.conversationSelected = false;
      state.selectedUser = null;
    },
    setConversation: (state, action) => {
      state.conversation = action.payload;
    },
  },
});

export const {
  signinSuccess,
  signinFailure,
  signoutSuccess,
  setConversationSelected,
  setConversationClosed,
  setConversation,
} = userSlice.actions;

export default userSlice.reducer;
