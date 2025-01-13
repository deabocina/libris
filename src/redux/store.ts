import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import googleBooksReducer from "./googleBooksSlice";
import filtersReducer from "../redux/filtersSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    googleBooks: googleBooksReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
