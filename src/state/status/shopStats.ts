import { createSlice } from "@reduxjs/toolkit";

type initialType = {
    isOpen: boolean,
    isActive: boolean
}

const initialState: initialType = {
    isOpen: true,
    isActive: false
}

const shopStats = createSlice({
    name: "shopStats",
    initialState,
    reducers: {
        setOpen(state, action){
            state.isOpen = action.payload
        },
        setActive(state, action){
            state.isActive = action.payload
        }
    }
})

export const { setOpen, setActive } = shopStats.actions;
export default shopStats.reducer;