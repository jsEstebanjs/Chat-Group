import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: "",
  name: "",
  picture: "",
  groupsId: [],
  groupsOwnerId: []
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    editGroupUser: (state, action) => {
      state.groupsId.forEach((item,index) => {
        if (item._id === action.payload._id) {
          state.groupsId[index] = action.payload
        }
      })

    },
    pushNewGroup: (state, action) => {
      state.groupsId.unshift(action.payload)
      state.groupsOwnerId.unshift(action.payload._id)
    },
    resetState: (state, action) => {
      return {
        ...state,
        ...initialState
      }
    }
  },
})

export const { setInitialState, resetState, pushNewGroup, editGroupUser } = userSlice.actions

export default userSlice.reducer