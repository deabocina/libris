import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
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
import { setAuthor, setCategory } from "../redux/filtersSlice";
import { auth, db } from "../config/firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";

const BookDetails = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFreeReadingAvailable, setIsFreeReadingAvailable] = useState(false);
  const { id } = useParams<{ id: string }>();
  const user = auth.currentUser;
  const bookFilters = useSelector((state: RootState) => state.filters);
  const book = useSelector(
    (state: RootState) =>
      state.googleBooks.books.find((b) => b.id === id) ||
      state.search.results.find((b) => b.id === id)
  );
  const dispatch = useDispatch<AppDispatch>();

  const generateStars = (rating: number, totalStars = 5) => {
    const fullStars = "★".repeat(rating);
    const emptyStars = "☆".repeat(totalStars - rating);
    return fullStars + emptyStars;
  };

  const handleBookmark = async () => {
    if (!user || !book) return;
    const bookRef = doc(db, "users", user.uid, "favourites", book.id);
    if (isBookmarked) {
      await deleteDoc(bookRef);
      setIsBookmarked(false);
    } else {
      await setDoc(bookRef, {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors?.join(", ") || "Unknown Author",
        previewLink: book.volumeInfo.previewLink,
        viewability: book.accessInfo.viewability,
        thumbnail: book.volumeInfo.imageLinks?.thumbnail,
      });
      setIsBookmarked(true);
    }
  };

  useEffect(() => {
    if (book)
      handleGutenbergData(book.volumeInfo.title, setIsFreeReadingAvailable);
  }, [book]);

  useEffect(() => {
    const checkBookmark = async () => {
      if (!user || !book) return;
      const bookRef = doc(db, "users", user.uid, "favourites", book.id);
      const bookDoc = await getDoc(bookRef);
      setIsBookmarked(bookDoc.exists());
    };
    checkBookmark();
  }, [user, book]);

  if (!book)
    return (
      <div className="m-5 md:mx-auto md:w-4/5 lg:w-3/5 bg-white p-4 border-l-4 border-emerald-500 text-emerald-600 rounded shadow">
        Book not found.
      </div>
    );

  const linkStyle =
    "text-emerald-600 font-semibold hover:text-emerald-800 transition";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <div className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <Search />
      </div>

      <div className="pt-28 px-4 md:px-16 flex flex-col gap-12">
        {/* Book Header */}
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-6 md:gap-8 w-full md:w-4/5 lg:w-3/5 mx-auto">
          <img
            src={book.volumeInfo.imageLinks?.thumbnail || "/default-book.jpg"}
            alt={book.volumeInfo.title}
            className="w-40 h-56 object-cover rounded-md mx-auto md:mx-0 transform transition-transform duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
          />
          <div className="flex-1 mt-4 md:mt-0">
            <h1 className="text-3xl font-bold text-emerald-700 mb-2">
              {book.volumeInfo.title}
            </h1>
            <p className="text-gray-600 mb-3">
              by{" "}
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
                className={linkStyle}
              >
                {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
              </Link>{" "}
              ·{" "}
              <Link
                to="/categories"
                onClick={() => {
                  const cat = book.volumeInfo.categories?.[0];
                  dispatch(setCategory(cat));
                  handleBookFilter(dispatch, cat, "", "", "", "");
                }}
                className={linkStyle}
              >
                {book.volumeInfo.categories || "Unknown Category"}
              </Link>{" "}
              · {book.volumeInfo.pageCount || "/"} pages
            </p>
            <p className="text-yellow-500 text-xl mb-4">
              {generateStars(book.volumeInfo.averageRating || 0)}{" "}
              <span className="text-gray-500 text-sm">
                ({book.volumeInfo.ratingsCount || 0})
              </span>
            </p>

            <div className="flex flex-wrap gap-3">
              {/* Preview Button */}
              <a
                href={book.volumeInfo.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                  book.accessInfo.viewability !== "NO_PAGES"
                    ? "bg-emerald-500 text-white hover:bg-emerald-700"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                <img src={icons.search} />
                Preview
              </a>

              {/* Read Gutenberg */}
              <button
                onClick={() =>
                  isFreeReadingAvailable &&
                  openGutenbergLink(book.volumeInfo.title)
                }
                disabled={!isFreeReadingAvailable}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                  isFreeReadingAvailable
                    ? "bg-emerald-500 text-white hover:bg-emerald-700"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                <img src={icons.read} />
                Read
              </button>

              {/* Bookmark */}
              {user && (
                <button
                  onClick={handleBookmark}
                  className="p-2 hover:scale-110 transition-transform rounded-full border border-gray-300"
                >
                  <img
                    src={
                      isBookmarked ? icons.removeBookmark : icons.addBookmark
                    }
                  />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="md:w-4/5 lg:w-3/5 md:mx-auto bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-emerald-700 mb-2">
            Description
            <div className="w-20 h-1 bg-emerald-500 mt-2" />
          </h2>
          <p className="text-gray-700">
            {book.volumeInfo.description || "No description available."}
          </p>
        </div>

        {/* Book Edition Info */}
        <div className="md:w-4/5 lg:w-3/5 md:mx-auto bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-emerald-700 mb-4">
            About this edition
            <div className="w-20 h-1 bg-emerald-500 mt-2" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="py-2 font-medium">Page count:</td>
                  <td>{book.volumeInfo.pageCount || "/"}</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Category:</td>
                  <td>{book.volumeInfo.categories || "/"}</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Language:</td>
                  <td>{languages[book.volumeInfo.language] || "/"}</td>
                </tr>
              </tbody>
            </table>

            <table className="w-full">
              <tbody>
                <tr>
                  <td className="py-2 font-medium">Author:</td>
                  <td>{book.volumeInfo.authors?.join(", ") || "/"}</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Publisher:</td>
                  <td>{book.volumeInfo.publisher || "/"}</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Published:</td>
                  <td>
                    {getFormattedDate(book.volumeInfo.publishedDate) || "/"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Identifiers */}
        <div className="md:w-4/5 lg:w-3/5 md:mx-auto mb-10">
          <h2 className="text-xl font-bold text-emerald-700 mb-4">
            Identifiers
            <div className="w-20 h-1 bg-emerald-500 mt-2" />
          </h2>
          <div className="flex flex-col gap-2">
            {book.volumeInfo.industryIdentifiers?.map((idItem, idx) => (
              <div
                key={idx}
                className="flex justify-between bg-white p-3 rounded-md shadow hover:scale-105 transition-transform"
              >
                <span className="font-semibold text-emerald-600">
                  {idItem.type}:
                </span>
                <span>{idItem.identifier}</span>
              </div>
            )) || <p>No identifiers available.</p>}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookDetails;
