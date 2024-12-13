import "../styles/index.css";
import { icons } from "../assets/assets";
import { useState } from "react";
import { gutenbergInterface } from "../interface/gutenbergInterface";
import { fetchGutenbergBooks } from "../services/gutenbergServices";

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<gutenbergInterface[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    setLoading(true);
    setResult(null);
    try {
      const data = await fetchGutenbergBooks(query);
      if (data && data.length > 0) {
        setResult(data);
      }
    } catch (error) {
      console.log(`Error catching data: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center relative mt-5">
        <a href="/libris/">
          {" "}
          <img src={icons.logo} className="w-12"></img>
        </a>

        <button onClick={handleSearch}>
          <img src={icons.search} className="absolute top-1 ml-2 mt-0.5 w-6" />
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
          className="rounded-3xl text-black w-72 h-10 pl-11 focus:outline-none focus:ring-2 focus:ring-offset-sky-700"
        />
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="spinner mt-10"></div>
        </div>
      ) : (
        <div>
          {result && result.length > 0 ? (
            result.map((book) => (
              <div key={book.id} className="my-10">
                <p>
                  <img src={book.formats["image/jpeg"]} />
                </p>
                <p>{book.title}</p>
                <p>
                  {book.authors.map((author) => (
                    <div>
                      <p>{author.name}</p>
                      <p>
                        {author.birth_year} - {author.death_year}
                      </p>
                    </div>
                  ))}
                </p>
                <p>{book.languages}</p>
                <p className="mt-5">
                  {" "}
                  <a
                    href={book.formats["text/html"]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-sky-700 hover:bg-sky-800 rounded-3xl p-3"
                  >
                    Link to read
                  </a>
                </p>
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
