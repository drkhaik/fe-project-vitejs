import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    recipient: {
        _id: "",
        email: "",
        name: "",
        image: "",
        conversationId: "",
    },
    conversations: []
};

export const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        setRecipient: (state, action) => {
            state.recipient = action.payload;
        },
        setConversations: (state, action) => {
            state.conversations = action.payload;
        },
        setLastMessageToConversations: (state, action) => {
            // console.log("check conversations", action)
            let newMessage = action.payload;
            let conversations = state.conversations;
            for (let i = 0; i < conversations.length; i++) {
                if (conversations[i].conversationId === newMessage.conversation) {
                    conversations[i].lastMessage = newMessage;
                }
            }
        }

    },
    extraReducers: (builder) => {

    },
});

export const { setRecipient, setConversations, setLastMessageToConversations } = conversationSlice.actions;

export default conversationSlice.reducer;
