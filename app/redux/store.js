"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";

const rootReducers = combineReducers({
  user: authSlice,
});

export const store = configureStore({
  reducer: rootReducers,
});
