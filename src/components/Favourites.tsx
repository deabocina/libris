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
    <div className="flex flex-col min-h-screen">
      <Search />
      <h1 className="text-3xl font-bold m-5 pt-5 md:mx-auto md:w-4/5 lg:text-center">
        Favourites
        <div className="w-20 h-1 bg-emerald-500 mt-3 lg:mx-auto" />
      </h1>
      <div className="flex flex-wrap justify-center mx-5 mt-12 gap-8">
        {bookmarkedBooks.length > 0 ? (
          bookmarkedBooks.map((book) => (
            <div
              key={book.id}
              className="mb-5 flex flex-col justify-center items-center bg-neutral-800 rounded-lg text-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 transition-all duration-300 border-transparent hover:ring-4 hover:ring-emerald-500"
            >
              <h2 className="font-bold text-lg mb-4">{book.title}</h2>
              <div className="relative">
                <img
                  src={book.thumbnail}
                  alt={`Cover of ${book.title}`}
                  className="min-w-32 min-h-48 rounded-sm"
                />
                <button
                  onClick={() => handleRemoveBookmark(book.id)}
                  className="absolute bottom-2 right-3 transition-transform duration-300 hover:scale-105 bg-white rounded-full p-1"
                >
                  <img src={icons.removeBookmark} className="w-6 h-6" />
                </button>
              </div>
              <small className="text-sm text-neutral-500 my-4">
                By {book.author}
              </small>

              <>
                {book.viewability !== "NO_PAGES" ? (
                  <a
                    href={book.previewLink}
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
            </div>
          ))
        ) : (
          <p className="m-5 lg:mx-auto bg-neutral-800 text-emerald-500 p-4 border-l-4 border-emerald-500">
            Oops, no favorites here. Start bookmarking your top picks!
          </p>
        )}
      </div>
      <div className="flex-grow" />
      <Footer />
    </div>
  );
};

export default Favourites;
