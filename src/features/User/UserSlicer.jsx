import { createSlice } from "@reduxjs/toolkit";
import { useRoutes } from "react-router-dom";

const initialState = {
  user: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginReducer(state, user) {
        state.user = user.payload
    },
    logoutReducer(state) {
        state.user = null;
    },
    registerReducer(state, user) {
        state.user = user.payload
    }
  },
});

export const { loginReducer, logoutReducer, registerReducer } = userSlice.actions;

export default userSlice.reducer;