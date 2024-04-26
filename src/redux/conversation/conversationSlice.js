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
    conversations: [],
    notification: 0,
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
        setListConversations: (state, action) => {
            state.conversations = action.payload;
        },
        setLastMessageToConversations: (state, action) => {
            let newMessage = action.payload;
            console.log("check new Message redux", newMessage);
            state.conversations = state.conversations.map(conversation => {
                if (conversation.conversationId === newMessage.conversation) {
                    return { ...conversation, lastMessage: newMessage };
                }
                return conversation;
            });

            if (state.conversations.some(conversation => conversation.conversationId === newMessage.conversation)) {
                state.notification++;
            }
        },
        setIsRead: (state, action) => {
            const conversationId = action.payload;
            let conversations = state.conversations;
            for (let i = 0; i < conversations.length; i++) {
                if (conversations[i].conversationId === conversationId) {
                    if (conversations[i].lastMessage) {
                        conversations[i].lastMessage.isRead = true;
                        state.notification = state.notification - 1;
                    }
                }
            }
        },
        setNotification: (state, action) => {
            state.notification = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchListConversationReduxThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchListConversationReduxThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                // console.log("check action.payload", action.payload);
                state.conversations = action.payload;
            })
            .addCase(fetchListConversationReduxThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.conversations = [];
            })

    },
});

export const {
    setRecipient,
    fetchListConversation,
    setLastMessageToConversations,
    setListConversations,
    setIsRead,
    setNotification
} = conversationSlice.actions;

export default conversationSlice.reducer;
