import { fetchGoogleBooks } from "../services/googleBooksServices";
import { AppDispatch } from "../redux/store";
import { setBooks } from "../redux/googleBooksSlice";

export const handleBookFilter = async (
  dispatch: AppDispatch,
  category: string,
  isbn?: string,
  title?: string,
  author?: string,
  publisher?: string
) => {
  try {
    let query = "";
    if (category) {
      query = `subject:${category}`;
    }
    if (title) {
      query = `intitle:${title}`;
    }
    if (author) {
      query = `inauthor:${author}`;
    }
    if (isbn) {
      query = `isbn:${isbn}`;
    }
    if (publisher) {
      query = `inpublisher:${publisher}`;
    }

    if (query) {
      const data = await fetchGoogleBooks(query);
      dispatch(setBooks(data));
    }
  } catch (error) {
    throw new Error(`Error fetching Google Books: ${error}`);
  }
};
