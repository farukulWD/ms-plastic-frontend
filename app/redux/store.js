"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";

const rootReducers = combineReducers({
  user: userSlice,
});

export const store = configureStore({
  reducer: rootReducers,
});
