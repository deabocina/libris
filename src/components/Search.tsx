import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Search = () => {
  const { query, results, loading, error } = useSelector(
    (state: RootState) => state.search
  );

  return (
    <div>
      <h1 className="text-3xl">Results for {query}</h1>
      {loading && <div className="spinner mx-auto"></div>}
      {error && <p>{error}</p>}
      {results.length > 0 ? (
        <div className="flex justify-center">
          <div className="mt-10">
            {results &&
              results.map((book) => (
                <div key={book.id}>
                  <a href={book.selfLink}>All book info</a>
                  <a href={book.volumeInfo.infoLink}>Example display</a>

                  <div className="flex">
                    <img src={book.volumeInfo.imageLinks.smallThumbnail}></img>
                    <div>
                      <h2 className="text-2xl font-bold">
                        {book.volumeInfo.title}
                      </h2>
                      <small>By {book.volumeInfo.authors}</small> -{" "}
                      <small>{book.volumeInfo.categories}</small> -{" "}
                      <small>{book.volumeInfo.pageCount} pages</small>
                      <p>{book.searchInfo.textSnippet}</p>
                    </div>
                  </div>

                  <a href={book.volumeInfo.previewLink}>Preview Book</a>
                  <p>{book.volumeInfo.description}</p>

                  <h3 className="mt-5 text-xl font-bold">About this edition</h3>
                  <p>Page count: {book.volumeInfo.pageCount}</p>
                  <p>Format: {book.volumeInfo.printType}</p>
                  <p>Language: {book.volumeInfo.language}</p>

                  <p>Publisher: {book.volumeInfo.publisher}</p>
                  <p>Published: {book.volumeInfo.publishedDate}</p>

                  <p>Category: {book.volumeInfo.categories}</p>
                  <p>Average rating: {book.volumeInfo.averageRating}</p>
                  <p>Rating Count: {book.volumeInfo.ratingsCount}</p>

                  <p>{book.volumeInfo.maturityRating}</p>
                  <p>{book.accessInfo.viewability}</p>
                  <p>{book.accessInfo.embeddable}</p>
                  <p>{book.accessInfo.publicDomain}</p>

                  <p>{book.accessInfo.epub.isAvailable}</p>
                  <a href={book.accessInfo.epub.acsTokenLink}>
                    Download Preview
                  </a>

                  {/* 
                  {book.volumeInfo.industryIdentifiers.map((book, index) => (
                    <div key={index}>
                      <p>{book.type}</p>
                      <p>{book.identifier}</p>
                    </div>
                  ))} */}
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
