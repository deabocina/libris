import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { icons } from "../assets/assets";
import Search from "./Search";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import {
  handleGutenbergData,
  openGutenbergLink,
} from "../utils/gutenbergUtils";
import { getFormattedDate } from "../utils/dateUtils";
import { languages } from "../data/languages";
import { handleBookFilter } from "../utils/filterUtils";
import { Link } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { setAuthor, setCategory, setPublisher } from "../redux/filtersSlice";
import { auth, db } from "../config/firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";

const BookDetails = () => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isFreeReadingAvailable, setIsFreeReadingAvailable] =
    useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const user = auth.currentUser;

  const book = useSelector(
    (state: RootState) =>
      state.googleBooks.books.find((book) => book.id === id) ||
      state.search.results.find((book) => book.id === id)
  );
  const bookFilters = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch<AppDispatch>();

  const generateStars = (rating: number, totalStars = 5) => {
    const fullStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(totalStars - rating);
    return fullStars + emptyStars;
  };

  const handleBookmark = async () => {
    if (user) {
      const bookRef = doc(
        db,
        "users",
        user.uid,
        "favourites",
        book?.id || "Unknown Id"
      );
      if (isBookmarked) {
        await deleteDoc(bookRef);
        setIsBookmarked(false);
      } else {
        await setDoc(bookRef, {
          title: book?.volumeInfo.title,
          author: book?.volumeInfo.authors?.join(", ") || "Unknown Author",
          thumbnail: book?.volumeInfo.imageLinks.thumbnail,
        });
        setIsBookmarked(true);
      }
    }
  };

  useEffect(() => {
    if (book) {
      handleGutenbergData(book.volumeInfo.title, setIsFreeReadingAvailable);
    }
  }, [book]);

  useEffect(() => {
    const checkIfBookmarked = async () => {
      if (user && book) {
        const bookRef = doc(db, "users", user.uid, "favourites", book.id);
        const bookDoc = await getDoc(bookRef);
        setIsBookmarked(bookDoc.exists());
      }
    };
    checkIfBookmarked();
  }, [user, book]);

  if (!book) {
    return <div className="text-center m-20">Book not found.</div>;
  }

  const linkStyle = `text-emerald-500 font-semibold transition-colors duration-300 ease-out hover:text-emerald-700`;

  return (
    <>
      <Search />
      <div className="mt-20 mx-5">
        <div className="flex mb-16 bg-neutral-800 p-5 rounded-lg shadow-lg md:mx-auto md:w-4/5 lg:w-3/5 xl:w-2/4 justify-center items-center ">
          <div className="basis-4/5">
            <h1 className="text-3xl font-bold">{book.volumeInfo.title}</h1>
            <div className="text-neutral-500 mb-10">
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
                <small>
                  By{" "}
                  <span className={linkStyle}>
                    {book.volumeInfo.authors?.join(", ") || "Unknown Author"}{" "}
                  </span>
                </small>
              </Link>{" "}
              ·{" "}
              <Link
                to="/categories"
                onClick={() => {
                  const cat = book.volumeInfo.categories?.[0];
                  dispatch(setCategory(cat));
                  handleBookFilter(dispatch, cat, "", "", "", "");
                }}
              >
                <small className={linkStyle}>
                  {book.volumeInfo.categories}
                </small>
              </Link>{" "}
              · <small>{book.volumeInfo.pageCount} pages</small>
              <p className="text-yellow-500 text-2xl">
                {generateStars(book?.volumeInfo.averageRating || 0)}
                <span className="text-white text-lg">
                  ({book.volumeInfo.ratingsCount || 0})
                </span>
              </p>
            </div>
            <div className="flex justify-center items-center flex-wrap gap-1">
              <>
                {book.accessInfo.viewability !== "NO_PAGES" ? (
                  <a
                    href={book.volumeInfo.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-500 min-w-32 transition-all duration-300 ease-in-out hover:bg-emerald-700 p-3 rounded-lg cursor-pointer"
                  >
                    <div className="flex justify-center items-center">
                      {" "}
                      <img src={icons.search} />
                      <span className="ml-1">Preview</span>
                    </div>
                  </a>
                ) : (
                  <a className="bg-neutral-500 cursor-not-allowed min-w-32 transition-all duration-300 ease-in-out hover:bg-neutral-600 p-3 rounded-lg">
                    <div className="flex justify-center items-center">
                      {" "}
                      <img src={icons.search} />
                      <span className="ml-1">Not Available</span>
                    </div>
                  </a>
                )}
              </>
              <>
                {isFreeReadingAvailable ? (
                  <button
                    onClick={() => openGutenbergLink(book.volumeInfo.title)}
                    className="ml-12 md:ml-5 min-w-32 bg-emerald-500 transition-all duration-300 ease-in-out hover:bg-emerald-700 p-3 rounded-lg cursor-pointer"
                  >
                    <div className="flex justify-center items-center">
                      <img src={icons.read} />
                      <span className="ml-2">Read</span>
                    </div>
                  </button>
                ) : (
                  <button
                    disabled
                    className="ml-4 md:ml-5 min-w-32 bg-neutral-500 cursor-not-allowed transition-all duration-300 ease-in-out hover:bg-neutral-600 p-3 rounded-lg"
                  >
                    <div className="flex justify-center items-center">
                      <img src={icons.read} />
                      <span className="ml-2">Not Available</span>
                    </div>
                  </button>
                )}
              </>
              <>
                {user ? (
                  <>
                    <button
                      onClick={handleBookmark}
                      className="sm:ml-4 p-2 transition-transform duration-300 hover:scale-105"
                    >
                      <img
                        src={
                          isBookmarked
                            ? icons.removeBookmark
                            : icons.addBookmark
                        }
                      />
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </>
            </div>
          </div>
          <>
            {" "}
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              alt={`Cover of ${book.volumeInfo.title}`}
              className="ml-5 rounded-sm translate-transform duration-300 ease-in-out hover:scale-110"
            />
          </>
        </div>

        <div className="md:mx-auto md:w-4/5 lg:w-3/5 xl:w-2/4">
          <h3 className="my-5 text-xl font-bold translate-transform duration-500 ease-in-out hover:translate-x-3">
            Description <div className="w-20 h-1 bg-emerald-500 mt-2" />
          </h3>
          <p>{book.volumeInfo.description || "No description available."}</p>

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
                  <td>{book.volumeInfo.pageCount || "/"}</td>
                </tr>
                <tr>
                  <td className="text-neutral-500 py-3">Category:</td>
                  <td>
                    <Link
                      to="/categories"
                      onClick={() => {
                        const cat = book.volumeInfo.categories?.[0];
                        dispatch(setCategory(cat));
                        handleBookFilter(dispatch, cat, "", "", "", "");
                      }}
                    >
                      <span className={linkStyle}>
                        {book.volumeInfo.categories || "/"}
                      </span>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="text-neutral-500 py-3">Language:</td>
                  <td>
                    {" "}
                    <a
                      href={`https://www.google.com/search?q=${
                        languages[book.volumeInfo.language]
                      }+language`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className={linkStyle}>
                        {languages[book.volumeInfo.language] || "/"}
                      </span>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="w-1/3 flex-grow ml-auto">
              <tbody>
                <tr>
                  <td className="text-neutral-500 py-3 w-28 xl:w-44">
                    Author:
                  </td>
                  <td>
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
                      <span className={linkStyle}>
                        {book.volumeInfo.authors?.join(", ") || "/"}
                      </span>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="text-neutral-500 py-3">Publisher:</td>
                  <td>
                    <Link
                      to="/categories"
                      onClick={() => {
                        const publisher = book.volumeInfo.publisher;
                        dispatch(setPublisher(publisher));
                        handleBookFilter(
                          dispatch,
                          bookFilters.category,
                          "",
                          "",
                          "",
                          publisher
                        );
                      }}
                    >
                      <span className={linkStyle}>
                        {book.volumeInfo.publisher || "/"}
                      </span>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="text-neutral-500 py-3">Published:</td>
                  <td>
                    {getFormattedDate(book.volumeInfo.publishedDate) || "/"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-10 mb-5 text-xl font-bold translate-transform duration-500 ease-in-out hover:translate-x-3">
            Identifiers <div className="w-20 h-1 bg-emerald-500 mt-2" />
          </h3>
          {book.volumeInfo.industryIdentifiers?.map((book, index) => (
            <div
              key={index}
              className="bg-neutral-800 p-4 rounded-md shadow-md mb-2 flex justify-between items-center translate-transform duration-200 ease-out hover:scale-105"
            >
              <span className="text-emerald-500 font-bold">{book.type}:</span>
              <span>{book.identifier}</span>
            </div>
          )) || <p>No identifiers available.</p>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookDetails;
