import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    updateUserInfo(state, user) {
        state.userInfo = user.payload
    },
  },
});

export const { updateUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;