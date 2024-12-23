import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import Search from "./Search";

const SearchResults = () => {
  const { query, results, loading, error } = useSelector(
    (state: RootState) => state.search
  );

  return (
    <div>
      <Search />
      <h1 className="text-3xl m-5 pt-10">Results for "{query}"</h1>
      {loading && <div className="spinner mx-auto"></div>}
      {error && <p>{error}</p>}
      {results.length > 0 ? (
        <div className="flex justify-center">
          <div className="mt-10">
            {results &&
              results.map((book) => (
                <div key={book.id}>
                  <div className="flex m-5">
                    <div className="relative group w-42 h-72 mb-3 shadow-2xl">
                      <Link to={`/libris/details/${book.id}`}>
                        {" "}
                        <img
                          src={book.volumeInfo.imageLinks.smallThumbnail}
                          alt={`Cover of ${book.volumeInfo.title}`}
                          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                        />
                      </Link>
                    </div>

                    <div className="ml-5">
                      <Link to={`/libris/details/${book.id}`}>
                        <h2 className="text-2xl font-bold">
                          {book.volumeInfo.title}
                        </h2>
                      </Link>
                      <div className="text-neutral-500">
                        <small>By {book.volumeInfo.authors}</small> ·{" "}
                        <small>{book.volumeInfo.categories}</small> ·{" "}
                        <small>{book.volumeInfo.pageCount} pages</small>
                      </div>
                      <p className="mt-3">{book.searchInfo.textSnippet}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div>No Results found.</div>
      )}
    </div>
  );
};

export default SearchResults;
