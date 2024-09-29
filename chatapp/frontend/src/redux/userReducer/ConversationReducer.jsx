import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    conversationSelected: false,
    selectedUser: null,
    conversation: null,
};

const userSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
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
        }
    },
});

export const { setConversationSelected, setConversationClosed, setConversation } =
    userSlice.actions;

export default userSlice.reducer;
