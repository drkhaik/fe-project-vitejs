import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/counter/counterSlice';
import accountSlice from './account/accountSlice';
import conversationSlice from './conversation/conversationSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    account: accountSlice,
    conversation: conversationSlice,
  },
});
