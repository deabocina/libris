import "../styles/index.css";
import { useEffect, useState } from "react";
import { nyTimesInterface } from "../interface/nyTimesInterface";
import { fetchNyTimesBestsellers } from "../services/nyTimesServices";
import { useCustomInView } from "../hooks/useCustomInView";
import Search from "./Search";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { handleBookFilter } from "../utils/filterUtils";
import { setAuthor } from "../redux/filtersSlice";
import { icons } from "../assets/assets";

const Homepage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [bestsellerResults, setBestsellerResults] = useState<
    nyTimesInterface[] | null
  >(null);
  const bookFilters = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch<AppDispatch>();
  const { ref: sectionRef, inView: sectionInView } = useCustomInView(0);

  useEffect(() => {
    const handleBestsellers = async () => {
      setLoading(true);
      try {
        const data = await fetchNyTimesBestsellers();
        if (data && data.length > 0) setBestsellerResults(data);
      } catch (error) {
        console.error(`Error fetching bestsellers: ${error}`);
      } finally {
        setLoading(false);
      }
    };
    handleBestsellers();
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-gray-900">
      <div className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <Search />
      </div>

      <div
        className="relative h-screen bg-homepage bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center text-center"
        ref={sectionRef}
      >
        <div className="absolute inset-0 bg-white/70 -z-10" />

        <h1
          className={`text-5xl md:text-6xl font-extrabold mb-6 text-emerald-700 transition-all duration-500 ${
            sectionInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          Discover Your Next Great Read
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">
          Whether you're into thrillers, classics, or inspiring non-fiction —
          Libris connects you with the stories that shape the world.
        </p>

        <div className="flex gap-4">
          <Link
            to="/categories"
            className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-full shadow-md hover:bg-emerald-700 transition"
          >
            Explore Categories
          </Link>
          <Link
            to="/about-us"
            className="px-8 py-3 border border-emerald-600 text-emerald-700 font-semibold rounded-full hover:bg-emerald-100 transition"
          >
            Learn More
          </Link>
        </div>

        <div className="mt-12 animate-bounce text-emerald-600 font-semibold">
          ↓ Scroll to Explore
        </div>
      </div>

      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-10">
          Why Readers Love Libris
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 lg:px-20">
          {[
            {
              title: "Curated Collections",
              desc: "We handpick only the most inspiring, thought-provoking, and beloved titles.",
              icon: (
                <img src={icons.books} alt="Collections" className="w-8 h-8" />
              ),
            },
            {
              title: "Trusted Reviews",
              desc: "Every book is recommended by real readers who share your passion for stories.",
              icon: <img src={icons.trust} alt="Reviews" className="w-8 h-8" />,
            },
            {
              title: "Personalized Discovery",
              desc: "Find books tailored to your taste with our smart filtering and search tools.",
              icon: (
                <img src={icons.discovery} alt="Search" className="w-8 h-8" />
              ),
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-4"
            >
              <div className="mb-3">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-gray-100 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-emerald-700 mb-4">
          NYT Bestsellers
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Explore the 20 hottest titles from the New York Times Bestseller list.
          Click any title for a deeper dive into its story and author.
        </p>

        {loading && (
          <div className="flex justify-center items-center h-48">
            <div className="spinner" />
          </div>
        )}

        {bestsellerResults && bestsellerResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 place-items-center">
            {bestsellerResults
              .flatMap((list) => list.books)
              .slice(0, 20)
              .map((book) => (
                <div
                  key={book.primary_isbn13}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition p-5 flex flex-col items-center text-center max-w-xs"
                >
                  <div className="relative w-40 h-60 mb-4 overflow-hidden rounded-lg">
                    <img
                      src={book.book_image}
                      alt={book.title}
                      className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2 left-2 bg-emerald-600 text-white text-xs font-semibold py-1 px-2 rounded-full">
                      #{book.rank}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 italic">
                    by {book.author}
                  </p>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-6">
                    {book.description || "No description available."}
                  </p>

                  <p className="text-xs text-gray-400 mb-3">
                    Publisher: {book.publisher}
                  </p>

                  <Link
                    to="/categories"
                    onClick={() => {
                      const author = book.author;
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
                    className="text-emerald-600 font-semibold hover:text-emerald-800 transition"
                  >
                    More from this author →
                  </Link>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No bestsellers found.</p>
        )}
      </section>

      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-10">
          What Our Readers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-8 lg:px-20">
          {[
            {
              name: "Olivia R.",
              quote:
                "Libris helped me rediscover my love for reading. The curated lists are spot-on!",
            },
            {
              name: "Daniel S.",
              quote:
                "I found my favorite author through Libris. Clean design, fast search, perfect UX!",
            },
            {
              name: "Sophia M.",
              quote:
                "As a lifelong reader, Libris feels like home. Everything is just beautifully organized.",
            },
          ].map((t) => (
            <div
              key={t.name}
              className="bg-emerald-50 border border-emerald-100 rounded-xl shadow-md p-8 hover:-translate-y-2 transition-transform"
            >
              <p className="text-gray-700 italic mb-4">“{t.quote}”</p>
              <h4 className="font-semibold text-emerald-700">– {t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage;
