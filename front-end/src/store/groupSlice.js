import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    _id:"",
    usersId:[],
    ownerId:"",
    name:"",
    messages:[], 
    description:""
}

export const groupSlice = createSlice({
  name: 'groupSlice',
  initialState,
  reducers: {
    setInitialStateGroup: (state,action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
})

export const { setInitialStateGroup } = groupSlice.actions

export default groupSlice.reducer