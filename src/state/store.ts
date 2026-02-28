import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import shopStats from './status/shopStats'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        shop: shopStats
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
