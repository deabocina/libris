import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { googleBooksInterface } from "../interface/googleBooksInterface";

interface GoogleBooksState {
  books: googleBooksInterface[];
}

const initialState: GoogleBooksState = {
  books: [],
};

const googleBooksSlice = createSlice({
  name: "googleBooks",
  initialState,
  reducers: {
    setBooks(state, action: PayloadAction<googleBooksInterface[]>) {
      state.books = action.payload;
    },
  },
});

export const { setBooks } = googleBooksSlice.actions;
export default googleBooksSlice.reducer;
