import { createSlice } from "@reduxjs/toolkit";

type initialType = {
    isOpen: boolean,
    confWIC: boolean,
    WIC: {
        id: string,
        createdat: string,
        category: string
    }[] | []
}

const initialState: initialType = {
    isOpen: true,
    confWIC: false,
    WIC: []
}

const shopStats = createSlice({
    name: "shopStats",
    initialState,
    reducers: {
        setOpen(state, action){
            state.isOpen = action.payload
        },
        setConfWIC(state, action){
            state.confWIC = action.payload
        },
        setWIC(state, action){
            state.WIC = action.payload
        }
    }
})

export const { setOpen, setConfWIC, setWIC } = shopStats.actions;
export default shopStats.reducer;