import { useState } from "react";
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

const Search = () => {
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
      navigate("/libris/search");
    }
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuToggle(!mobileMenuToggle);
  };

  const navStyle =
    "border-b-2 border-transparent transition-all duration-300 ease-in-out hover:border-white";

  return (
    <div>
      <header className="flex justify-evenly relative pt-5 uppercase">
        <nav className="flex gap-10 items-center">
          <img
            src={icons.menu}
            alt="Menu Icon"
            className="md:hidden cursor-pointer"
            onClick={handleMobileMenuToggle}
          />

          <div
            className={`md:hidden fixed top-0 left-0 w-64 h-full z-10 bg-emerald-900 transform ${
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
                <a href="/libris/" className={navStyle}>
                  Bestsellers
                </a>
                <a href="/libris/" className={navStyle}>
                  Categories
                </a>
                <a href="/libris/" className={navStyle}>
                  About Us
                </a>
              </div>
            </div>
          </div>

          <div className="md:flex gap-10 items-center hidden">
            <a href="/libris/" className={navStyle}>
              Bestsellers
            </a>
            <a href="/libris/" className={navStyle}>
              Categories
            </a>
            <a href="/libris/" className={navStyle}>
              About Us
            </a>
          </div>
        </nav>

        <div className="flex">
          <button onClick={handleSearch}>
            <img src={icons.search} className="absolute w-6 bottom-2" />
          </button>

          <input
            type="search"
            placeholder="Search books.."
            onChange={(e) => setLocalQuery(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                dispatch(setQuery(localQuery));
                handleSearch();
              }
            }}
            className="w-70 h-10 pl-11 focus:outline-none bg-transparent border-b-2 transition-all duration-300 ease focus:border-emerald-900"
          />
        </div>
      </header>
    </div>
  );
};

export default Search;
