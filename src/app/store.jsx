import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/User/UserSlicer';
import userInfoReducer from '../features/User/UserInfoSlicer';
import flashcardReducer from '../features/Flashcards/FlashcardSlicer';
import collectionReducer from '../features/Collections/CollectionSlicer'
import { collectionApiSlice } from "../features/Collections/CollectionsApiSlice";
import { authSlice } from "../features/Authentication/AuthenticationSlicer";
import { userApiSlice } from "../features/User/UserApiSlicer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    userInfo: userInfoReducer,
    flashcards: flashcardReducer,
    collections: collectionReducer,
    [collectionApiSlice.reducerPath]: collectionApiSlice.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(collectionApiSlice.middleware).concat(authSlice.middleware).concat(userApiSlice.middleware); //.concat(additional reducer for all reducers)
  },
});