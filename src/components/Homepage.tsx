import "../styles/index.css";
import { useEffect, useState } from "react";
import { nyTimesInterface } from "../interface/nyTimesInterface";
import { fetchNyTimesBestsellers } from "../services/nyTimesServices";
import { useCustomInView } from "../hooks/useCustomInView";
import Search from "./Search";
import Footer from "./Footer";

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
    <>
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

      <div className="bg-neutral-900 min-h-screen py-10 px-5">
        <h2 className="text-3xl font-bold uppercase tracking-wide text-center mb-16">
          Bestsellers
          <span className="block w-16 h-1 bg-emerald-500 mx-auto mt-2" />
        </h2>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="spinner" />
          </div>
        )}

        {bestsellerResults && bestsellerResults.length > 0 ? (
          <div className="space-y-16">
            {bestsellerResults.map((list) => (
              <div key={list.list_id} className="space-y-10">
                <h3 className="text-xl font-bold text-center uppercase tracking-wide">
                  {list.display_name}
                </h3>
                <div className="flex flex-wrap justify-center gap-6">
                  {list.books.map((bestseller) => (
                    <div
                      key={bestseller.primary_isbn13}
                      className="w-48 bg-neutral-800 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                    >
                      <div className="relative group w-full h-64 overflow-hidden rounded-md">
                        <img
                          src={bestseller.book_image}
                          alt={`Cover of ${bestseller.title}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute top-2 left-2 bg-emerald-500 font-bold text-xs py-1 px-2 rounded shadow-lg">
                          #{bestseller.rank}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-85 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <p className="text-sm p-4">
                            {bestseller.description}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <h4 className="text-md font-bold">
                          {bestseller.title}
                        </h4>
                        <p className="text-sm text-neutral-400">
                          By {bestseller.author}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-neutral-400">No bestsellers found.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
