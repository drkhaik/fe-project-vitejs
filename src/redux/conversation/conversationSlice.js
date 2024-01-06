import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    recipient: {
        _id: "",
        email: "",
        name: "",
        image: "",
        conversationId: "",
    },
};

export const conversationSlice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
        setRecipient: (state, action) => {
            state.recipient = action.payload;
        },

    },
    extraReducers: (builder) => {

    },
});

export const { setRecipient } = conversationSlice.actions;

export default conversationSlice.reducer;
