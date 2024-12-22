import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";

const Search = () => {
  const { query, results, loading, error } = useSelector(
    (state: RootState) => state.search
  );

  return (
    <div>
      <h1 className="text-3xl m-5">Results for "{query}"</h1>
      {loading && <div className="spinner mx-auto"></div>}
      {error && <p>{error}</p>}
      {results.length > 0 ? (
        <div className="flex justify-center">
          <div className="mt-10">
            {results &&
              results.map((book) => (
                <div key={book.id}>
                  <div className="flex m-5">
                    <Link to={`/libris/details/${book.id}`}>
                      {" "}
                      <img
                        src={book.volumeInfo.imageLinks.smallThumbnail}
                        className="transition-all duration-300 ease-in-out hover:scale-110"
                      />
                    </Link>

                    <div className="ml-5">
                      <Link to={`/libris/details/${book.id}`}>
                        <h2 className="text-2xl font-bold">
                          {book.volumeInfo.title}
                        </h2>
                      </Link>
                      <small>By {book.volumeInfo.authors}</small> -{" "}
                      <small>{book.volumeInfo.categories}</small> -{" "}
                      <small>{book.volumeInfo.pageCount} pages</small>
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

export default Search;
