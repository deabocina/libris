import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import Search from "./Search";
import Footer from "./Footer";
import parse from "html-react-parser";
import { AppDispatch } from "../redux/store";
import { handleBookFilter } from "../utils/filterUtils";
import { setAuthor, setCategory } from "../redux/filtersSlice";

const SearchResults = () => {
  const { query, results, loading, error } = useSelector(
    (state: RootState) => state.search
  );
  const bookFilters = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex flex-col min-h-screen">
      <Search />
      <h1 className="text-3xl font-bold text-center mt-16 lg:text-4xl">
        Results for <span className="text-emerald-500">"{query}"</span>
        <div className="w-20 h-1 bg-emerald-500 mx-auto mt-3" />
      </h1>

      {loading && <div className="spinner mx-auto mt-10" />}
      {error && <p className="text-center mt-14 text-red-500">{error}</p>}
      {results.length > 0 ? (
        <div className="flex justify-center">
          <div className="mt-10">
            {results &&
              results.map((book) => (
                <div key={book.id}>
                  {book.volumeInfo.title && book.volumeInfo.pageCount > 0 && (
                    <div className="flex m-5 p-3 transition-colors duration-200 ease-in-out rounded-md hover:bg-neutral-800 md:mx-auto md:w-4/5 lg:w-3/5 xl:w-2/4">
                      <div className="basis-32">
                        <Link to={`/details/${book.id}`}>
                          {" "}
                          <img
                            src={book.volumeInfo.imageLinks?.smallThumbnail}
                            alt={`Cover of ${book.volumeInfo.title}`}
                            className="min-w-32 min-h-48 transition-transform duration-300 hover:scale-110 rounded-sm"
                          />
                        </Link>
                      </div>

                      <div className="ml-5 basis-4/5">
                        <Link to={`/details/${book.id}`}>
                          <h2 className="text-2xl font-bold relative group">
                            {book.volumeInfo.title}
                            <span className="absolute bottom-0 left-0 w-0 h-1 bg-emerald-500 transition-all duration-300 group-hover:w-full" />
                          </h2>
                        </Link>
                        <div className="text-neutral-500">
                          <Link
                            to="/categories"
                            onClick={() => {
                              const author = book.volumeInfo.authors?.[0];
                              dispatch(setAuthor(author));
                              handleBookFilter(
                                dispatch,
                                bookFilters.category,
                                "",
                                "",
                                author,
                                ""
                              );
                            }}
                          >
                            <small>
                              By{" "}
                              <span className="text-emerald-500 font-semibold transition-colors duration-300 ease-out hover:text-emerald-700">
                                {book.volumeInfo.authors?.join(", ") ||
                                  "Unknown Author"}
                              </span>
                            </small>
                          </Link>{" "}
                          ·{" "}
                          <Link
                            to="/categories"
                            onClick={() => {
                              const cat = book.volumeInfo.categories?.[0];
                              dispatch(setCategory(cat));
                              handleBookFilter(dispatch, cat, "", "", "", "");
                            }}
                          >
                            <small className="text-emerald-500 font-semibold transition-colors duration-300 ease-out hover:text-emerald-700">
                              {book.volumeInfo.categories}
                            </small>
                          </Link>{" "}
                          · <small>{book.volumeInfo.pageCount} pages</small>
                        </div>
                        <p className="mt-3">
                          {parse(
                            book.searchInfo?.textSnippet ||
                              "Summary unavailable."
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="text-center my-36">
          <span className="p-4 rounded-lg bg-emerald-500 font-bold">
            No Results found.
          </span>
        </div>
      )}
      <div className="flex-grow" />
      <Footer />
    </div>
  );
};

export default SearchResults;
