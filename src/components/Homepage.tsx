import "../styles/index.css";
import { icons } from "../assets/assets";
import { useEffect, useState } from "react";
import { nyTimesInterface } from "../interface/nyTimesInterface";
import { fetchNyTimesBestsellers } from "../services/nyTimesServices";
import { googleBooksInterface } from "../interface/googleBooksInterface";
import { fetchGoogleBooks } from "../services/googleBooksServices";
import { useCustomInView } from "../hooks/useCustomInView";

const Homepage = () => {
  const [query, setQuery] = useState<string>("");
  const [bookResult, setBookResults] = useState<googleBooksInterface[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [bestsellerResults, setBestsellerResults] = useState<
    nyTimesInterface[] | null
  >(null);
  const [optionsMenu, setOptionsMenu] = useState<boolean>(false);
  const { ref: sectionRef, inView: sectionInView } = useCustomInView(0);

  const handleSearch = async () => {
    setLoading(true);
    setBookResults(null);
    try {
      const data = await fetchGoogleBooks(query);
      if (data && data.length > 0) {
        setBookResults(data);
      }
    } catch (error) {
      console.log(`Error catching data: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuToggle = () => {
    setOptionsMenu(!optionsMenu);
  };

  useEffect(() => {
    const handleBestsellers = async () => {
      setLoading(true);
      try {
        const data = await fetchNyTimesBestsellers();
        if (data && data.length > 0) {
          setBestsellerResults(data);
        }
      } catch (error) {
        throw new Error(`Error fetching bestsellers: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    handleBestsellers();
  }, []);

  const navStyle =
    "border-b-2 border-transparent transition-all duration-300 ease-in-out hover:border-white";

  return (
    <div>
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-homepage bg-cover bg-no-repeat blur-sm -z-10" />
        <header className="flex justify-evenly relative pt-5 uppercase">
          <nav className="flex gap-10 items-center">
            <img
              src={icons.menu}
              alt="Menu Icon"
              className="md:hidden cursor-pointer"
              onClick={handleMenuToggle}
            />

            <div
              className={`md:hidden fixed top-0 left-0 w-64 h-full z-10 bg-emerald-900 transform ${
                optionsMenu ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 ease-in-out`}
            >
              <div className="p-5">
                <button
                  onClick={handleMenuToggle}
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
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="w-70 h-10 pl-11 focus:outline-none bg-transparent border-b-2 transition-all duration-300 ease focus:border-emerald-900"
            />
          </div>
        </header>

        <section
          ref={sectionRef}
          className={`flex flex-col px-5 mt-10 h-96 justify-center items-center transition-all duration-300 ease-out ${
            sectionInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl font-bold mb-5">
            The Quest for Your Next Story Begins Here
          </h1>
          <p className="text-xl">
            In the vast land of books, many paths await. Explore the lands of
            the bestsellers or venture forth into the unknown with a search. The
            next great story is waiting for you.
          </p>
        </section>
      </div>

      <h2 className="text-3xl font-bold mb-5 p-5 uppercase bg-emerald-900 md:text-center">
        Bestsellers
      </h2>

      <div>
        {loading && <div className="spinner mx-auto"></div>}
        {bestsellerResults && bestsellerResults.length > 0 ? (
          bestsellerResults.map((list) => (
            <div key={list.list_id}>
              <h2 className="text-3xl font-bold text-center my-16 bg-gradient-to-r from-green-400 via-teal-500 to-emerald-900 text-transparent bg-clip-text">
                {list.display_name}
              </h2>

              <div className="flex flex-wrap gap-5 justify-center">
                {list.books.map((bestsellers) => (
                  <div key={bestsellers.primary_isbn13} className="w-48 italic">
                    <p className="text-center border-b-2 border-emerald-900 w-8 mb-5">
                      {bestsellers.rank}
                    </p>
                    <div className="relative group w-48 h-72 mb-3 shadow-2xl">
                      <img
                        src={bestsellers.book_image}
                        alt={`Cover of ${bestsellers.title}`}
                        className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-30 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-4">
                        <p>{bestsellers.description}</p>
                      </div>
                    </div>

                    <p className="font-bold">{bestsellers.title}</p>
                    <small>By {bestsellers.author}</small>

                    {/* {bestsellers.buy_links.map((links, index) => (
                      <div key={index}>
                        <a href={links.url} className="pt-5">{links.name}</a>
                      </div>
                    ))} */}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No bestsellers found.</p>
        )}
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
    </div>
  );
};

export default Homepage;
