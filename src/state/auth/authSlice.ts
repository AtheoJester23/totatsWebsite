import { createSlice } from "@reduxjs/toolkit";

type initialType = {
    isAuthenticated: boolean
}

const initialState: initialType = {
    isAuthenticated: false
}

const authSlice = createSlice({
    name: "authSlice", 
    initialState,
    reducers: {
        setAuthenticated(state, action){
            state.isAuthenticated = action.payload
        }
    }
})

export const { setAuthenticated } = authSlice.actions;
export default authSlice.reducer;