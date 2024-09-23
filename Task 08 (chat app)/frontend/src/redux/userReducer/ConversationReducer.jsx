import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    conversationSelected: false,
    selectedUser: null,
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
    },
});

export const { setConversationSelected, setConversationClosed } =
    userSlice.actions;

export default userSlice.reducer;
