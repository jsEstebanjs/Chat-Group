import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: "",
  name:"",
  picture:""
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
    resetState:(state,action)=>{
        return{
            ...state,
            ...initialState
        }
    }
  },
})

export const { setInitialState, resetState } = userSlice.actions

export default userSlice.reducer