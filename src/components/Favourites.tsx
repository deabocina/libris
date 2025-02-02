import { useEffect, useState } from "react";
import Search from "./Search";
import Footer from "./Footer";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { Link } from "react-router-dom";

const Favourites = () => {
  const [bookmarkedBooks, setBookmarkedBooks] = useState<
    {
      id: string;
      title: string;
      author: string;
      thumbnail: string;
    }[]
  >([]);
  const user = auth.currentUser;

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
              <Link to={`/details/${book.id}`}>
                {" "}
                <img
                  src={book.thumbnail}
                  alt={`Cover of ${book.title}`}
                  className="min-w-32 min-h-48 rounded-sm"
                />
              </Link>
              <small className="text-sm text-neutral-500 mt-4">
                By {book.author}
              </small>
            </div>
          ))
        ) : (
          <p className="m-5 lg:mx-auto bg-neutral-800 text-emerald-500 rounded-md p-4 border-l-4 border-emerald-500">
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
