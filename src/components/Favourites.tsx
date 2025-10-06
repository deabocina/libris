import { useEffect, useState } from "react";
import Search from "./Search";
import Footer from "./Footer";
import { collection, doc, deleteDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { icons } from "../assets/assets";

const Favourites = () => {
  const [bookmarkedBooks, setBookmarkedBooks] = useState<
    {
      id: string;
      title: string;
      author: string;
      previewLink: string;
      viewability: string;
      thumbnail: string;
    }[]
  >([]);
  const user = auth.currentUser;

  const handleRemoveBookmark = async (bookId: string) => {
    if (user) {
      const bookRef = doc(db, "users", user.uid, "favourites", bookId);
      await deleteDoc(bookRef);

      setBookmarkedBooks((prevBooks) =>
        prevBooks.filter((book) => book.id !== bookId)
      );
    }
  };

  useEffect(() => {
    const fetchBookmarkedBooks = async () => {
      if (user) {
        const bookmarkRef = await getDocs(
          collection(db, "users", user.uid, "favourites")
        );
        const bookmarkDoc = bookmarkRef.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            author: data.author,
            previewLink: data.previewLink,
            viewability: data.viewability,
            thumbnail: data.thumbnail,
          };
        });
        setBookmarkedBooks(bookmarkDoc);
      }
    };
    fetchBookmarkedBooks();
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Search />
      <h1 className="text-3xl font-bold m-5 pt-5 md:mx-auto md:w-4/5 lg:text-center text-emerald-700">
        Favourites
        <div className="w-20 h-1 bg-emerald-500 mt-3 lg:mx-auto" />
      </h1>

      <div className="flex flex-wrap justify-center mx-5 mt-12 gap-6">
        {bookmarkedBooks.length > 0 ? (
          bookmarkedBooks.map((book) => (
            <div
              key={book.id}
              className="mb-12 flex flex-col justify-center items-center bg-white rounded-xl text-center w-full sm:w-1/3 md:w-48 p-3 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-transparent hover:border-emerald-500"
            >
              <h2 className="font-bold text-base mb-2 text-emerald-700">
                {book.title}
              </h2>
              <div className="relative w-28 h-40 mb-2">
                <img
                  src={book.thumbnail || "/default-book.jpg"}
                  alt={`Cover of ${book.title}`}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                />
                <button
                  onClick={() => handleRemoveBookmark(book.id)}
                  className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow hover:scale-110 transition-transform duration-300"
                >
                  <img src={icons.removeBookmark} className="w-4 h-4" />
                </button>
              </div>
              <small className="text-xs text-gray-500 mb-2">
                By {book.author}
              </small>
              {book.viewability !== "NO_PAGES" ? (
                <a
                  href={book.previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 w-full text-center py-1.5 rounded-lg text-white font-semibold hover:bg-emerald-700 transition-colors duration-300 text-sm"
                >
                  Preview
                </a>
              ) : (
                <span className="bg-gray-400 w-full text-center py-1.5 rounded-lg text-gray-200 text-sm cursor-not-allowed">
                  Not Available
                </span>
              )}
            </div>
          ))
        ) : (
          <p className="m-5 lg:mx-auto bg-white text-gray-700 p-4 border-l-4 border-emerald-500 rounded-md shadow-md">
            Oops, no favorites here. Start bookmarking your top picks to see
            them here. Use the search or filters to explore and discover books
            that match your interests and add them to your favorites list!
          </p>
        )}
      </div>
      <div className="flex-grow" />
      <Footer />
    </div>
  );
};

export default Favourites;
