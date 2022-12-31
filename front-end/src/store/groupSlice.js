import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    _id:"",
    usersId:[],
    ownersId:[],
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
    resetToInitialStateGroup: (state,action) => {
      return {
        ...state,
        ...action.payload,
      };
  },
}
})

export const { setInitialStateGroup ,resetToInitialStateGroup} = groupSlice.actions

export default groupSlice.reducer