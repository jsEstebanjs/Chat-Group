import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import channelIdReducer from './channelIdSlice'

export const store = configureStore({
  reducer: {
    userSlice:userReducer,
    channelIdSlice:channelIdReducer
  },
})