import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: "",
  name:"",
  picture:"",
  groupsId:[],
  groupsOwnerId:[]
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setInitialState: (state,action) => {
        return {
            ...state,
            ...action.payload,
          };
    },
    pushNewGroup:(state,action)=>{
      state.groupsId.unshift(action.payload)
      state.groupsOwnerId.unshift(action.payload._id)
    },
    resetState:(state,action)=>{
        return{
            ...state,
            ...initialState
        }
    }
  },
})

export const { setInitialState, resetState, pushNewGroup } = userSlice.actions

export default userSlice.reducer