import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  conversationSelected: false,
  selectedUser: null,
  conversation: null,
  otherUsers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.conversationSelected = false;
      state.selectedUser = null;
      state.conversation = null;
    },
    signinFailure: (state) => {
      state.currentUser = null;
      state.conversationSelected = false;
      state.selectedUser = null;
      state.conversation = null;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.conversationSelected = false;
      state.selectedUser = null;
      state.conversation = null;
      state.otherUsers = [];
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
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    removeOtherUsers: (state) => {
      state.otherUsers = null;
    },
    addUserInList: (state, action) => {
      state.otherUsers.push(action.payload);
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
  removeOtherUsers,
  setOtherUsers,
  addUserInList,
} = userSlice.actions;

export default userSlice.reducer;
