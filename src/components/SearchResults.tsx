import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import Search from "./Search";
import Footer from "./Footer";
import parse from "html-react-parser";
import { AppDispatch } from "../redux/store";
import { handleBookFilter } from "../utils/filterUtils";
import { setAuthor } from "../redux/filtersSlice";

const SearchResults = () => {
  const { query, results, loading, error } = useSelector(
    (state: RootState) => state.search
  );
  const bookFilters = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      <Search />
      <h1 className="text-4xl font-extrabold text-center mt-16 tracking-wide lg:text-5xl">
        Results for <span className="text-emerald-500">"{query}"</span>
        <div className="w-24 h-1 bg-emerald-500 mx-auto mt-3 rounded-full" />
      </h1>

      {loading && <div className="spinner mx-auto mt-10" />}
      {error && (
        <p className="text-center mt-14 text-red-500 font-medium">{error}</p>
      )}

      {results.length > 0 ? (
        <div className="flex justify-center px-4 m-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((book) =>
              book.volumeInfo.title && book.volumeInfo.pageCount > 0 ? (
                <div
                  key={book.id}
                  className="bg-white border-2 border-emerald-300 rounded-2xl shadow-lg hover:shadow-2xl transition p-4 flex flex-col items-center text-center transform hover:-translate-y-1 hover:scale-105 duration-300"
                >
                  <Link to={`/details/${book.id}`}>
                    <img
                      src={
                        book.volumeInfo.imageLinks?.thumbnail ||
                        "/default-book.jpg"
                      }
                      alt={book.volumeInfo.title}
                      className="w-32 h-48 object-cover rounded-xl mb-3 shadow-inner transition-transform duration-300 hover:rotate-2"
                    />
                  </Link>
                  <Link to={`/details/${book.id}`}>
                    <h3 className="text-lg font-bold mb-1 text-emerald-700 hover:text-emerald-800 transition-all duration-300">
                      {book.volumeInfo.title}
                    </h3>
                  </Link>
                  <div className="text-neutral-600 text-sm mb-2">
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
                      By{" "}
                      <span className="text-emerald-500 font-semibold hover:text-emerald-700 cursor-pointer">
                        {book.volumeInfo.authors?.join(", ") ||
                          "Unknown Author"}
                      </span>
                    </Link>
                    {" · "}
                    <span>
                      {book.volumeInfo.categories?.[0] || "Unknown Category"}
                    </span>
                  </div>
                  <p className="text-gray-700 text-xs line-clamp-4">
                    {parse(
                      book.searchInfo?.textSnippet ||
                        book.volumeInfo.description ||
                        "Summary unavailable."
                    )}
                  </p>
                </div>
              ) : null
            )}
          </div>
        </div>
      ) : (
        <div className="text-center my-36">
          <span className="px-6 py-3 rounded-lg bg-emerald-500 text-white font-bold shadow-lg text-lg">
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
