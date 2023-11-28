"use client"

import { AnyAction, Store, combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './slice/userSlice'
import uiReducer from './slice/uiSlice'
import {persistStore, persistReducer, PersistConfig } from 'redux-persist'
import storage from "redux-persist/lib/storage";
import { InitialStateType } from "../interface";
import { createWrapper, MakeStore, HYDRATE } from "next-redux-wrapper";
import { Persistor, PersistorAction } from "redux-persist/es/types";

// //  export type Rootstate = ReturnType<typeof store.getState>;

// // export {store, persistor}


// const persistConfig1:PersistConfig<InitialStateType> = {
//     key: 'user',
//     storage
// }

const rootReducer = combineReducers({
    user:  userReducer,
    ui: uiReducer 
})

// const persistConfigRoot: PersistConfig<ReturnType<typeof rootReducer>> = {
//     key: 'root',
//     storage
// }

// const persistedReducer = persistReducer(persistConfigRoot, rootReducer)

 const store = configureStore({
    reducer: rootReducer
})

//  const persistor = persistStore(store)


//  export const wrapper = createWrapper(makestore)

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

//  const persistor = persistStore(store)


 

export {store}

