import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltersProps {
  category: string;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
}

const initialState: FiltersProps = {
  category: "fiction",
  isbn: "",
  title: "",
  author: "",
  publisher: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setIsbn(state, action: PayloadAction<string>) {
      state.isbn = action.payload;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setAuthor(state, action: PayloadAction<string>) {
      state.author = action.payload;
    },
    setPublisher(state, action: PayloadAction<string>) {
      state.publisher = action.payload;
    },
  },
});

export const { setCategory, setIsbn, setTitle, setAuthor, setPublisher } =
  filtersSlice.actions;
export default filtersSlice.reducer;
