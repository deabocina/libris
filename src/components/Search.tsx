import { useEffect, useState } from "react";
import { icons } from "../assets/assets";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  setQuery,
  setResults,
  setLoading,
  setError,
} from "../redux/searchSlice";
import { fetchGoogleBooks } from "../services/googleBooksServices";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Search = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const [mobileMenuToggle, setMobileMenuToggle] = useState<boolean>(false);
  const [localQuery, setLocalQuery] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSearch = async () => {
    dispatch(setLoading(true));
    dispatch(setResults([]));
    try {
      const data = await fetchGoogleBooks(localQuery);
      if (data && data.length > 0) {
        dispatch(setResults(data));
      } else {
        dispatch(setError("No results found."));
      }
    } catch (error) {
      dispatch(setError(`Error: ${error}`));
    } finally {
      dispatch(setLoading(false));
      navigate("/search");
    }
  };

  const checkSearchInput = () => {
    if (localQuery.trim() === "") {
      alert("Search query cannot be empty!");
      return;
    }
    handleSearch();
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuToggle(!mobileMenuToggle);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserName(null);
      navigate("/");
    } catch (error) {
      setError(`Login failed! ${error}`);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserName(null);
        setLoadingPage(false);
        return;
      }
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name + " " + userDoc.data().surname);
        }
      } catch (error) {
        setError(`Error fetching user data: ${error}`);
      }
      setLoadingPage(false);
    });
    return () => unsub(); // Cleanup function
  }, []);

  const navStyle =
    "border-b-4 border-transparent transition-all duration-300 ease-in-out hover:border-emerald-500";

  return (
    <div>
      <header className="flex justify-evenly relative pt-5 uppercase">
        <nav className="flex gap-10 items-center">
          <img
            src={icons.menu}
            alt="Menu Icon"
            className="lg:hidden cursor-pointer"
            onClick={handleMobileMenuToggle}
          />

          <div
            className={`lg:hidden fixed top-0 left-0 w-64 h-full z-10 bg-emerald-700 transform ${
              mobileMenuToggle ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out`}
          >
            <div className="p-5">
              <button
                onClick={handleMobileMenuToggle}
                className="bg-neutral-900 rounded-full p-2 hover:animate-pulse"
              >
                <img src={icons.leftArrow} className="w-6 h-6" />
              </button>
              <div className="flex flex-col p-5">
                <Link to="/" className={navStyle}>
                  Bestsellers
                </Link>
                <Link to="/categories" className={navStyle}>
                  Categories
                </Link>
                <Link to="/about-us" className={navStyle}>
                  About Us
                </Link>
                {userName ? (
                  <>
                    <Link to="/favourites" className={navStyle}>
                      Favourites
                    </Link>
                    <Link to="/" onClick={handleLogout} className={navStyle}>
                      Logout
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/login" className={navStyle}>
                      Login
                    </Link>
                    <Link to="/register" className={navStyle}>
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="lg:flex gap-10 items-center hidden">
            <Link to="/" className={navStyle}>
              Bestsellers
            </Link>
            <Link to="/categories" className={navStyle}>
              Categories
            </Link>
            <Link to="/about-us" className={navStyle}>
              About Us
            </Link>
          </div>
        </nav>

        <div className="flex">
          <button onClick={checkSearchInput}>
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex justify-center items-center relative left-9 transition-all duration-300 ease-in-out hover:bg-emerald-600">
              <img src={icons.search} className="w-5 h-5 object-cover" />
            </div>
          </button>

          <input
            type="search"
            placeholder="Search books.."
            onChange={(e) => setLocalQuery(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                checkSearchInput();
                dispatch(setQuery(localQuery));
              }
            }}
            className="w-70 h-10 pl-11 bg-transparent border-2 border-neutral-400/5 rounded-full transition-all duration-300 focus:border-emerald-500 focus:outline-none"
          />

          <div className="ml-5 sm:flex items-center gap-2 hidden">
            {loadingPage ? (
              <p className="text-neutral-500">Loading..</p>
            ) : userName ? (
              <>
                <Link
                  to="/favourites"
                  className="font-bold text-emerald-500 bg-neutral-800/40 rounded-md p-2 mr-5 transition-transform duration-300 hover:scale-105"
                >
                  {userName}
                </Link>
                <Link to="/" onClick={handleLogout} className={navStyle}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className={navStyle}>
                  Login
                </Link>
                {"/"}
                <Link to="/register" className={navStyle}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Search;
