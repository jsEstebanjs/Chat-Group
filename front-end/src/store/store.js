import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import groupReducer from './groupSlice'

export const store = configureStore({
  reducer: {
    userSlice: userReducer,
    groupSlice: groupReducer
  },
})