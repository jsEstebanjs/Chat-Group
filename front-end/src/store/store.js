import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import channelIdReducer from './courseIdSlice'

export const store = configureStore({
  reducer: {
    userSlice:userReducer,
    channelIdSlice:channelIdReducer
  },
})