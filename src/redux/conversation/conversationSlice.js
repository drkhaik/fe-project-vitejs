import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchConversationById } from '../../services/api';

const initialState = {
    isLoading: true,
    recipient: {
        _id: "",
        email: "",
        name: "",
        image: "",
        conversationId: "",
    },
    conversations: []
};

export const fetchListConversationReduxThunk = createAsyncThunk(
    'conversation/fetchListConversation',
    async (userId) => {
        const response = await fetchConversationById(userId);
        // The value we return becomes the `fulfilled` action payload
        // console.log("check response fetchUserAccount", response.data);
        return response.data;
    }
);

export const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        setRecipient: (state, action) => {
            state.recipient = action.payload;
        },
        setLastMessageToConversations: (state, action) => {
            let newMessage = action.payload;
            console.log("check new Message redux", newMessage);
            let conversations = state.conversations;
            for (let i = 0; i < conversations.length; i++) {
                if (conversations[i].conversationId === newMessage.conversation) {
                    conversations[i].lastMessage = newMessage;
                }
            }
        },
        setIsRead: (state, action) => {
            const conversationId = action.payload;
            let conversations = state.conversations;
            for (let i = 0; i < conversations.length; i++) {
                if (conversations[i].conversationId === conversationId) {
                    if (conversations[i].lastMessage) {
                        conversations[i].lastMessage.isRead = true;
                    }
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchListConversationReduxThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchListConversationReduxThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.conversations = action.payload;
            })
            .addCase(fetchListConversationReduxThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.conversations = [];
            })

    },
});

export const { setRecipient, fetchListConversation, setLastMessageToConversations, setIsRead } = conversationSlice.actions;

export default conversationSlice.reducer;
