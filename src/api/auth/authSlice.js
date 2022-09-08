import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {},
    reducers:{
        setCredentials: (state,action) => {
            const { access, refresh } = action.payload
            localStorage.setItem('accesstoken', access)
            localStorage.setItem('refreshtoken', access)
        },
        logOut: ( action) => {
            localStorage.removeItem('accesstoken')
            localStorage.removeItem('refreshtoken')
         }
    },
})
export const {setCredentials, logOut} = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = localStorage.getItem('accesstoken')