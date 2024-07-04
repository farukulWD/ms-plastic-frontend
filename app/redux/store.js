"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import { baseApi } from "./features/baseApi/baseApi";

// const rootReducers = combineReducers({
//   [baseApi.reducerPath]: baseApi.reducer,
//   user: authSlice,
// });

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    user: authSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
