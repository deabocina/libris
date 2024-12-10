import { useState } from "react";
import "../styles/index.css";
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
      <input
        type="search"
        placeholder="Search for books.."
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-xl text-black"
      />
      <button onClick={handleSearch}>Search</button>

      {loading ? (
        <div className="flex justify-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          {result && result.length > 0 ? (
            result.map((book) => (
              <div key={book.id}>
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
                <a href={book.formats["text/html"]}>Link to read</a>
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
