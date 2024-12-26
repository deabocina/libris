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

  const averageRating = book?.volumeInfo.averageRating || 0;
  const totalStars = 5;
  const fullStars = "★".repeat(averageRating);
  const emptyStars = "☆".repeat(totalStars - averageRating);

  if (!book) {
    return <div>Book not found.</div>;
  }

  return (
    <>
      <Search />
      <div className="mt-20 mx-5">
        <div className="flex mb-16 bg-neutral-800 p-5 rounded-lg shadow-lg md:mx-auto md:w-4/5 lg:w-3/5 xl:w-2/4 justify-center items-center ">
          <div className="basis-4/5">
            <h1 className="text-3xl font-bold">{book.volumeInfo.title}</h1>
            <div className="text-neutral-500 mb-10">
              <small>By {book.volumeInfo.authors}</small> ·{" "}
              <small>{book.volumeInfo.categories}</small> ·{" "}
              <small>{book.volumeInfo.pageCount} pages</small>
              <p className="text-yellow-500 text-2xl">
                {fullStars}
                {emptyStars}{" "}
                <span className="text-white text-lg">
                  ({book.volumeInfo.ratingsCount || 0})
                </span>
              </p>
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
          <>
            {" "}
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              className="ml-5 rounded-sm translate-transform duration-300 ease-in-out hover:scale-110"
            />
          </>
        </div>

        <div className="md:mx-auto md:w-4/5 lg:w-3/5 xl:w-2/4">
          <h3 className="my-5 text-xl font-bold translate-transform duration-500 ease-in-out hover:translate-x-3">
            Description <div className="w-20 h-1 bg-emerald-500 mt-2" />
          </h3>
          <p>{book.volumeInfo.description}</p>

          <h3 className="mt-10 mb-5 text-xl font-bold translate-transform duration-500 ease-in-out hover:translate-x-3">
            About this edition <div className="w-20 h-1 bg-emerald-500 mt-2" />
          </h3>
          <div className="flex w-full">
            <table className="w-1/2 flex-grow">
              <tbody>
                <tr>
                  <td className="text-neutral-500 py-3 w-28 xl:w-44">
                    Page count:
                  </td>
                  <td>{book.volumeInfo.pageCount}</td>
                </tr>
                <tr>
                  <td className="text-neutral-500 py-3">Category:</td>
                  <td>{book.volumeInfo.categories}</td>
                </tr>
                <tr>
                  <td className="text-neutral-500 py-3">Language:</td>
                  <td>{book.volumeInfo.language}</td>
                </tr>
              </tbody>
            </table>

            <table className="w-1/3 ml-auto">
              <tbody>
                <tr>
                  <td className="text-neutral-500 py-3 w-28 xl:w-44">
                    Author:
                  </td>
                  <td>{book.volumeInfo.authors}</td>
                </tr>
                <tr>
                  <td className="text-neutral-500 py-3">Publisher:</td>
                  <td>{book.volumeInfo.publisher}</td>
                </tr>
                <tr>
                  <td className="text-neutral-500 py-3">Published:</td>
                  <td>{book.volumeInfo.publishedDate}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-10 mb-5 text-xl font-bold translate-transform duration-500 ease-in-out hover:translate-x-3">
            Identifiers <div className="w-20 h-1 bg-emerald-500 mt-2" />
          </h3>
          {book.volumeInfo.industryIdentifiers.map((book, index) => (
            <div
              key={index}
              className="bg-neutral-800 p-4 rounded-md shadow-md mb-2 flex justify-between items-center translate-transform duration-200 ease-out hover:scale-105"
            >
              <span className="text-emerald-500 font-bold">{book.type}:</span>
              <span>{book.identifier}</span>
            </div>
          ))}
        </div>
      </div>

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

export default BookDetails;
