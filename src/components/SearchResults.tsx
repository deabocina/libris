import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import Search from "./Search";
import parse from "html-react-parser";
import { icons } from "../assets/assets";

const SearchResults = () => {
  const { query, results, loading, error } = useSelector(
    (state: RootState) => state.search
  );

  return (
    <>
      <Search />
      <h1 className="text-3xl font-bold text-center mt-16 lg:text-4xl">
        Results for <span className="text-emerald-500">"{query}"</span>
        <div className="w-20 h-1 bg-emerald-500 mx-auto mt-3" />
      </h1>

      {loading && <div className="spinner mx-auto" />}
      {error && <p>{error}</p>}
      {results.length > 0 ? (
        <div className="flex justify-center">
          <div className="mt-10">
            {results &&
              results.map((book) => (
                <div key={book.id}>
                  <div className="flex m-5 p-3 transition-colors duration-200 ease-in-out rounded-md hover:bg-neutral-800 md:mx-auto md:w-4/5 lg:w-3/5 xl:w-2/4">
                    <div className="basis-32">
                      <Link to={`/libris/details/${book.id}`}>
                        {" "}
                        <img
                          src={book.volumeInfo.imageLinks.smallThumbnail}
                          alt={`Cover of ${book.volumeInfo.title}`}
                          className="min-w-32 min-h-48 transition-transform duration-300 hover:scale-110 rounded-sm"
                        />
                      </Link>
                    </div>

                    <div className="ml-5 basis-4/5">
                      <Link to={`/libris/details/${book.id}`}>
                        <h2 className="text-2xl font-bold relative group">
                          {book.volumeInfo.title}
                          <span className="absolute bottom-0 left-0 w-0 h-1 bg-emerald-500 transition-all duration-300 group-hover:w-full" />
                        </h2>
                      </Link>
                      <div className="text-neutral-500">
                        <small>By {book.volumeInfo.authors.join(", ")}</small> ·{" "}
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

      <footer className="bg-neutral-950 p-14 mt-20 flex items-center justify-between border-box">
        <blockquote className="italic text-lg text-center mx-auto">
          Not all those who wander are lost.<cite>J.R.R. Tolkien</cite>
        </blockquote>
        <a
          href="#"
          className="relative flex items-center justify-center bg-neutral-800 rounded-full w-10 h-10 animate-pulse"
        >
          <img src={icons.upArrow} className="w-6 h-6" alt="Back to top" />
        </a>
      </footer>
    </>
  );
};

export default SearchResults;
