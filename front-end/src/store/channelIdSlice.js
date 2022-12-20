import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id:""
}

export const channelIdSlice = createSlice({
  name: 'channelIdSlice',
  initialState,
  reducers: {
    setId: (state,action) => {
      state.id = action.payload
    },
  },
})

export const { setId } = channelIdSlice.actions

export default channelIdSlice.reducer