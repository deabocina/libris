import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const SearchDetails = () => {
  const { id } = useParams<{ id: string }>();
  const book = useSelector((state: RootState) =>
    state.search.results.find((book) => book.id === id)
  );

  if (!book) {
    return <div>Book not found.</div>;
  }
  return (
    <div>
      <h1>{book.volumeInfo.title}</h1>
      <img src={book.volumeInfo.imageLinks.thumbnail}></img>

      <a href={book.volumeInfo.previewLink}>Preview Book</a>
      <p>{book.volumeInfo.description}</p>

      <small>By {book.volumeInfo.authors?.join(", ")}</small> -{" "}
      <small>{book.volumeInfo.categories}</small> -{" "}
      <small>{book.volumeInfo.pageCount} pages</small>

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

      <a href={book.accessInfo.epub.acsTokenLink}>Download Preview</a>
      <a href={book.selfLink}>All book info</a>
      <a href={book.volumeInfo.infoLink}>Example display</a>

      {/* {book.volumeInfo.industryIdentifiers.map((book, index) => (
        <div key={index}>
          <p>{book.type}</p>
          <p>{book.identifier}</p>
        </div>
      ))} */}
    </div>
  );
};

export default SearchDetails;
