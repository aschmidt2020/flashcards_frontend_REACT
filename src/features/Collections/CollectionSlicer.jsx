import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collections: [],
};

export const collectionSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    updateCollections(state, collections) {
        state.collections = collections.payload;
    },
  },
});

export const { updateCollections } = collectionSlice.actions;

export default collectionSlice.reducer;