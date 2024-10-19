import { createSlice } from '@reduxjs/toolkit'
import { StoreData } from '../../functions'

// Define the initial state using that type
const initialState = {
  user: {loggedIn:false}
}
export const userSlice = createSlice({
  name: 'markets',
  initialState,
  reducers: {
    setUser: (state, action) => {
        let user={...action.payload,loggedIn:true}
        StoreData('user',user)
        state.user = user
    },
    logout: (state) => {
        let user={loggedIn:false}
        StoreData('user',user)
        state.user = user
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUser,logout } = userSlice.actions

export default userSlice.reducer