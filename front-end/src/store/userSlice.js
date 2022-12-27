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
    createNewGroup: (state, action) => {
      state.groupsId.unshift(action.payload)
      state.groupsOwnerId.unshift(action.payload._id)
    },
    resetState: (state, action) => {
      return {
        ...state,
        ...initialState
      }
    },
    acceptGroup:(state,action)=>{
      state.groupsId.unshift(action.payload)
    }
  },
})

export const { setInitialState, resetState, createNewGroup, editGroupUser, acceptGroup } = userSlice.actions

export default userSlice.reducer