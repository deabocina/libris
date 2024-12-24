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
      <div className="mt-20 mx-5">
        <div className="flex mb-16 mr-5 md:mx-auto md:w-4/5 lg:w-3/5 xl:w-2/4 justify-center items-center ">
          <div className="basis-4/5">
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
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              className="ml-5 rounded-sm"
            />
          </div>
        </div>

        <div className="md:mx-auto md:w-4/5 lg:w-3/5 xl:w-2/4">
          <h3 className="my-5 text-xl font-bold">Description</h3>
          <p>{book.volumeInfo.description}</p>

          <h3 className="mt-10 mb-5 text-xl font-bold">About this edition</h3>
          <div className="flex table-auto border-collapse w-full mb-5">
            <table className="w-2/4">
              <tbody>
                <tr>
                  <td className="text-neutral-500 p-3 w-44">Page count:</td>
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
              </tbody>
            </table>

            <table className="w-2/4">
              <tbody>
              <tr>
                  <td className="text-neutral-500 p-3">Author:</td>
                  <td>{book.volumeInfo.authors}</td>
                </tr>
                <tr>
                  <td className="text-neutral-500 p-3 w-44">Publisher:</td>
                  <td>{book.volumeInfo.publisher}</td>
                </tr>
                <tr>
                  <td className="text-neutral-500 p-3">Published:</td>
                  <td>{book.volumeInfo.publishedDate}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

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
