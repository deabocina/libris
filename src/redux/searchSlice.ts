import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { googleBooksInterface } from "../interface/googleBooksInterface";

interface SearchState {
  query: string;
  results: googleBooksInterface[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: "",
  results: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search", // Slice name, important for verification
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setResults: (state, action: PayloadAction<googleBooksInterface[]>) => {
      state.results = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setQuery, setResults, setLoading, setError } =
  searchSlice.actions;
export default searchSlice.reducer;
