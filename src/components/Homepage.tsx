import "../styles/index.css";
import { icons } from "../assets/assets";
import { useEffect, useState } from "react";
import { nyTimesInterface } from "../interface/nyTimesInterface";
import { fetchNyTimesBestsellers } from "../services/nyTimesServices";
import { useCustomInView } from "../hooks/useCustomInView";
import Search from "./Search";

const Homepage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [bestsellerResults, setBestsellerResults] = useState<
    nyTimesInterface[] | null
  >(null);
  const { ref: sectionRef, inView: sectionInView } = useCustomInView(0);

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

  return (
    <div>
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-homepage bg-cover bg-no-repeat blur-sm -z-10" />
        <Search />
        <section
          ref={sectionRef}
          className={`flex flex-col px-5 mt-10 h-96 justify-center items-center transition-all duration-300 ease-out ${
            sectionInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-4xl font-bold mb-5 md:mx-10 lg:text-5xl lg:mb-10 xl:mx-36">
            The Quest for Your Next Story Begins Here
          </h1>
          <p className="text-lg md:mx-10 md:text-xl lg:text-2xl xl:mx-36 2xl:mx-52">
            In the vast land of books, many paths await. Explore the lands of
            the bestsellers or venture forth into the unknown with a search. The
            next great story is waiting for you.
          </p>
        </section>
      </div>

      <h2 className="text-2xl font-bold mb-5 p-5 uppercase bg-emerald-900 text-center md:text-3xl">
        Bestsellers
      </h2>

      <div>
        {loading && <div className="spinner mx-auto"></div>}
        {bestsellerResults && bestsellerResults.length > 0 ? (
          bestsellerResults.map((list) => (
            <div key={list.list_id}>
              <h2 className="text-2xl font-bold mx-auto my-16 bg-neutral-800 bg-opacity-40 w-fit rounded-lg p-5 shadow-lg shadow-emerald-800 md:text-3xl transition-all duration-300 ease-in-out hover:shadow-emerald-600">
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

                    <p className="font-bold text-md md:text-lg">
                      {bestsellers.title}
                    </p>
                    <small className="text-neutral-500">
                      By {bestsellers.author}
                    </small>

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
