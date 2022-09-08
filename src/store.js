import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReduser from './auth/authSlice'
import { youtrackApi } from "./api/youtrack.api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";


export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authReduser
    },
    reducer:{
        [youtrackApi.reducerPath]:youtrackApi.reducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(youtrackApi.middleware),
    devTools:true
})

setupListeners(store.dispatch)