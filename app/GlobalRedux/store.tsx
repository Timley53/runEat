"use client"

import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slice/userSlice'
import uiReducer from './slice/uiSlice'


export const store = configureStore({
    reducer: {
        user: userReducer,
        ui: uiReducer
    }
})

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

