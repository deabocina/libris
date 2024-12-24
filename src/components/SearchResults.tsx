import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import Search from "./Search";
import parse from "html-react-parser";

const SearchResults = () => {
  const { query, results, loading, error } = useSelector(
    (state: RootState) => state.search
  );

  return (
    <>
      <Search />
      <h1 className="text-3xl mt-16 text-center font-bold p-6 bg-neutral-800/70 text-emerald-500 shadow-lg">
        Results for <span className="text-white">"{query}"</span>
      </h1>

      {loading && <div className="spinner mx-auto"></div>}
      {error && <p>{error}</p>}
      {results.length > 0 ? (
        <div className="flex justify-center">
          <div className="mt-10">
            {results &&
              results.map((book) => (
                <div key={book.id}>
                  <div className="flex m-5 p-3 transition-colors duration-200 ease-in-out rounded-md hover:bg-neutral-800 md:mx-auto md:w-4/5 lg:w-3/5 xl:w-2/4">
                    <div className="basis 1/5">
                      <Link to={`/libris/details/${book.id}`}>
                        {" "}
                        <img
                          src={book.volumeInfo.imageLinks.smallThumbnail}
                          alt={`Cover of ${book.volumeInfo.title}`}
                          className="transition-transform duration-300 hover:scale-110 rounded-sm"
                        />
                      </Link>
                    </div>

                    <div className="ml-5 basis-4/5">
                      <Link to={`/libris/details/${book.id}`}>
                        <h2 className="text-2xl font-bold transition-all duration-500 ease-in-out hover:underline">
                          {book.volumeInfo.title}
                        </h2>
                      </Link>
                      <div className="text-neutral-500">
                        <small>By {book.volumeInfo.authors}</small> ·{" "}
                        <small>{book.volumeInfo.categories}</small> ·{" "}
                        <small>{book.volumeInfo.pageCount} pages</small>
                      </div>
                      <p className="mt-3">
                        {parse(book.searchInfo.textSnippet)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="text-center mt-5">No Results found.</div>
      )}
    </>
  );
};

export default SearchResults;
