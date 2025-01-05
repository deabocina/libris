import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import googleBooksReducer from "./googleBooksSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    googleBooks: googleBooksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
