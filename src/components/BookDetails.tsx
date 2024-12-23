import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { icons } from "../assets/assets";
import Search from "./Search";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const book = useSelector((state: RootState) =>
    state.search.results.find((book) => book.id === id)
  );

  if (!book) {
    return <div>Book not found.</div>;
  }

  return (
    <>
      <Search />
      <div className="mt-16 mx-5">
        <div className="flex mb-10">
          <div>
            <h1 className="text-3xl font-bold">{book.volumeInfo.title}</h1>
            <div className="text-neutral-500 mb-10">
              <small>By {book.volumeInfo.authors}</small> ·{" "}
              <small>{book.volumeInfo.categories}</small> ·{" "}
              <small>{book.volumeInfo.pageCount} pages</small>
            </div>
            <div className="flex justify-center items-center">
              <a
                href={book.volumeInfo.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3"
              >
                <img
                  src={icons.search}
                  className="bg-emerald-500 p-3 rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:bg-emerald-700"
                ></img>
              </a>
              <span className="ml-2">Preview</span>
            </div>
          </div>
          <div>
            {" "}
            <img src={book.volumeInfo.imageLinks.thumbnail} className="ml-5" />
          </div>
        </div>

        <h3 className="my-5 text-xl font-bold">Description</h3>
        <p>{book.volumeInfo.description}</p>

        <h3 className="mt-5 mb-8 text-xl font-bold">About this edition</h3>
        <table className="table-auto border-collapse w-full mb-5">
          <tbody>
            <tr>
              <td className="text-neutral-500 p-3">Page count:</td>
              <td>{book.volumeInfo.pageCount}</td>
            </tr>
            <tr>
              <td className="text-neutral-500 p-3">Category:</td>
              <td>{book.volumeInfo.categories}</td>
            </tr>
            <tr>
              <td className="text-neutral-500 p-3">Language:</td>
              <td>{book.volumeInfo.language}</td>
            </tr>
            <tr>
              <td className="text-neutral-500 p-3">Publisher:</td>
              <td>{book.volumeInfo.publisher}</td>
            </tr>
            <tr>
              <td className="text-neutral-500 p-3">Published:</td>
              <td>{book.volumeInfo.publishedDate}</td>
            </tr>
          </tbody>
        </table>

        <p>Average rating: {book.volumeInfo.averageRating}</p>
        <p>Rating Count: {book.volumeInfo.ratingsCount}</p>

        <p>{book.volumeInfo.maturityRating}</p>
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
    </>
  );
};

export default BookDetails;
