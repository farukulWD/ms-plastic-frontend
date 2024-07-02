"use client";

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {},
  isAuthenticate: false,
  token: "",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      (state.isAuthenticate = true),
        (state.token = action.payload.accessToken),
        (state.user = action.payload.user);
    },
    logOut: (state) => {
      (state.isAuthenticate = false), (state.token = ""), (state.user = {});
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;
