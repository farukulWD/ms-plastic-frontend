"use client";

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {},
  isAuthenticate: false,
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      (state.isAuthenticate = true),
        (state.token = action.payload.accessToken),
        (state.user = action.payload.user);
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
