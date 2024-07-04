"use client";

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {},
  token: "",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
    },
    logOut: (state) => {
      (state.isAuthenticate = false), (state.token = ""), (state.user = {});
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;
