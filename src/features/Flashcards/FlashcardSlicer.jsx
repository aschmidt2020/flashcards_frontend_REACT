import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flashcards: [],
};

export const flashcardSlice = createSlice({
  name: "flashcards",
  initialState,
  reducers: {
    updateFlashcards(state, flashcards) {
        state.flashcards = flashcards.payload;
    },
  },
});

export const { updateFlashcards } = flashcardSlice.actions;

export default flashcardSlice.reducer;