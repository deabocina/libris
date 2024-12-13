import { useEffect, useState } from "react";
import { nyTimesInterface } from "../interface/nyTimesInterface";
import { fetchNyTimesBestsellers } from "../services/nyTimesServices";

const Homepage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<nyTimesInterface[] | null>(null);

  useEffect(() => {
    const handleBestsellers = async () => {
      setLoading(true);
      try {
        const data = await fetchNyTimesBestsellers();
        console.log("data: ", data);
        if (data && data.length > 0) {
          setResult(data);
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
    <div className="m-10">
      <div className="my-10">
        <h1 className="text-3xl font-medium mb-5">
          The Quest for Your Next Story Begins Here
        </h1>
        <p>
          In the vast land of books, many paths await. Explore the lands of the
          bestsellers or venture forth into the unknown with a search. The next
          great story is waiting for you.
        </p>
      </div>
      <h2 className="text-xl mb-5">Bestsellers</h2>
      <div>
        {loading && <p>Loading...</p>}
        {result && result.length > 0 ? (
          result.map((list) => (
            <div key={list.list_id}>
              {list.list_image && (
                <img
                  src={list.list_image}
                  alt={`List image for ${list.display_name}`}
                />
              )}

              {list.books && list.books.length > 0 ? (
                list.books.map((book, index) => (
                  <div key={index}>
                    <h3>{book.title}</h3>
                    <p>{book.contributor}</p>
                    <br></br>
                  </div>
                ))
              ) : (
                <p>No books available in this list.</p>
              )}
            </div>
          ))
        ) : (
          <p>No bestsellers found.</p>
        )}
      </div>
    </div>
  );
};

export default Homepage;
