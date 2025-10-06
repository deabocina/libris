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
import { useNavigate, Link } from "react-router-dom";
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
    if (localQuery.trim() === "") {
      alert("Search query cannot be empty!");
      return;
    }

    dispatch(setLoading(true));
    dispatch(setResults([]));
    dispatch(setQuery(localQuery));

    try {
      const data = await fetchGoogleBooks(localQuery);
      if (data && data.length > 0) dispatch(setResults(data));
      else dispatch(setError("No results found."));
    } catch (error) {
      dispatch(setError(`Error: ${error}`));
    } finally {
      dispatch(setLoading(false));
      navigate("/search");
    }
  };

  const handleMobileMenuToggle = () => setMobileMenuToggle(!mobileMenuToggle);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserName(null);
      navigate("/");
    } catch (error) {
      setError(`Logout failed! ${error}`);
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
    return () => unsub();
  }, []);

  const navStyle =
    "text-white hover:text-white/80 transition-all duration-300 border-b-2 border-transparent hover:border-white/50";

  return (
    <div>
      <header className="bg-[#35a46f] text-white flex justify-between items-center px-6 py-4 relative shadow-md">
        <div className="flex items-center gap-4">
          <a href="/libris/">
            <img
              src={icons.logo}
              alt="Logo"
              className="w-16 lg:w-20 hover:scale-110 duration-300 ease-in-out "
            />
          </a>
        </div>

        <nav className="hidden lg:flex gap-8 items-center">
          <Link to="/" className={navStyle}>
            Bestsellers
          </Link>
          <Link to="/categories" className={navStyle}>
            Categories
          </Link>
          <Link to="/about-us" className={navStyle}>
            About Us
          </Link>
        </nav>

        <div className="lg:hidden flex items-center">
          <img
            src={icons.menu}
            alt="Menu Icon"
            className="cursor-pointer"
            onClick={handleMobileMenuToggle}
          />
        </div>

        <div className="relative flex items-center ml-4">
          <input
            type="search"
            placeholder="Search books..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="pl-10 pr-4 py-2 rounded-full border border-white/20 bg-white/10 placeholder-white/70 text-white focus:outline-none focus:border-white focus:bg-white/20 transition"
          />
          <button
            onClick={handleSearch}
            className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition"
          >
            <img src={icons.search} alt="Search" className="w-4 h-4" />
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-4 ml-6">
          {loadingPage ? (
            <p className="text-white/70">Loading..</p>
          ) : userName ? (
            <>
              <Link
                to="/favourites"
                className="font-bold bg-white/20 px-3 py-1 rounded hover:bg-white/30 transition"
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
              <Link to="/register" className={navStyle}>
                Register
              </Link>
            </>
          )}
        </div>

        <div
          className={`lg:hidden fixed top-0 left-0 w-64 h-full z-20 bg-[#35a46f] transform ${
            mobileMenuToggle ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="p-5">
            <button
              onClick={handleMobileMenuToggle}
              className="bg-white/20 rounded-full p-2 hover:animate-pulse"
            >
              <img src={icons.leftArrow} className="w-6 h-6" alt="Back" />
            </button>
            <div className="flex flex-col p-5 gap-4">
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
      </header>
    </div>
  );
};

export default Search;
