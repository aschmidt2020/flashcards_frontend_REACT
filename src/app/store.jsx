import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/User/UserSlicer"
import { authSlice } from "../features/Authentication/AuthenticationSlicer";
import { flashcardSlice } from "../features/Flashcards/FlashcardSlicer";
import { collectionSlice } from "../features/Collections/CollectionSlicer";
import { userInfoSlice } from "../features/User/UserInfoSlicer";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    userInfo: userInfoSlice.reducer,
    flashcards: flashcardSlice.reducer,
    collections: collectionSlice.reducer
    // [authSlice.reducerPath]: authSlice.reducer,
  },
//   middleware: (getDefaultMiddleware) => {
//     return getDefaultMiddleware().concat(authSlice.middleware); //.concat(additional reducer for all reducers)
//   },
});