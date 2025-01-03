import Search from "./Search";
import Footer from "./Footer";
import { fetchGoogleBooks } from "../services/googleBooksServices";
import { useEffect, useState } from "react";
import { googleBooksInterface } from "../interface/googleBooksInterface";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { groupedCategories } from "../data/categories";
import Select from "react-select";

const Categories = () => {
  const [books, setBooks] = useState<googleBooksInterface[]>([]);
  const [category, setCategory] = useState<string>("fiction");
  const [reactSelect, setReactSelect] = useState<any>(null);

  const options = Object.entries(groupedCategories).map(
    ([group, categories]) => ({
      label: `${group} (${categories.length})`,
      options: categories.map((cat) => ({
        label: cat,
        value: cat.toLowerCase(),
      })),
    })
  );

  const handleSelectChange = (selectedOption: any) => {
    setReactSelect(selectedOption);
    setCategory(selectedOption.value);
  };

  useEffect(() => {
    const handleBooksByCategory = async (category: string) => {
      try {
        const data = await fetchGoogleBooks(category);
        if (data && data.length > 0) {
          setBooks(data);
        }
      } catch (error) {
        throw new Error(`Error fetching Google Books: ${error}`);
      }
    };
    handleBooksByCategory(category);
  }, [category]);

  return (
    <div>
      <Search />
      <h1 className="text-3xl font-bold m-5 pt-5 md:mx-auto md:w-4/5 lg:text-center">
        Categories
        <div className="w-20 h-1 bg-emerald-500 mt-3 lg:mx-auto" />
      </h1>

      <div className="mt-12 md:mx-auto md:w-4/5 lg:w-3/5 xl:w-2/4">
        <Select
          value={reactSelect}
          onChange={handleSelectChange}
          options={options}
          placeholder="Choose a category.."
          isClearable={true}
          isSearchable={true}
          className="text-emerald-500 w-1/2"
          styles={{
            control: (provided, state) => ({
              ...provided,
              backgroundColor: "#2d2d2d",
              padding: "5px",
              border: "transparent",
              boxShadow: state.isFocused ? "0 0 0 3px #10B981" : "none",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#3c3c3c",
              },
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected
                ? "#10B981"
                : state.isFocused
                ? "#34D399"
                : "none",
              color: state.isSelected
                ? "white"
                : state.isFocused
                ? "white"
                : "#10B981",
              padding: "10px 15px",
              cursor: "pointer",
            }),
            singleValue: (provided) => ({
              ...provided,
              color: "white",
            }),
            input: (provided) => ({
              ...provided,
              color: "white",
            }),
          }}
        />
      </div>

      <h2 className="uppercase text-xl font-bold ml-5 mt-10 md:mx-auto md:w-4/5 lg:w-3/5 xl:w-2/4">
        {category}
        <div className="w-9 h-1 bg-emerald-500 mt-3" />
      </h2>

      <div>
        {books.length > 0 ? (
          <div className="flex justify-center">
            <div>
              {books &&
                books.map((book) => (
                  <div key={book.id}>
                    {book.volumeInfo.title && book.volumeInfo.pageCount > 0 && (
                      <div className="flex m-5 p-3 transition-colors duration-200 ease-in-out rounded-md hover:bg-neutral-800 md:mx-auto md:w-4/5 lg:w-3/5 xl:w-2/4">
                        <div className="basis-32">
                          <Link to={`/libris/details/${book.id}`}>
                            {" "}
                            <img
                              src={book.volumeInfo.imageLinks?.smallThumbnail}
                              alt={`Cover of ${book.volumeInfo.title}`}
                              className="min-w-32 min-h-48 transition-transform duration-300 hover:scale-110 rounded-sm"
                            />
                          </Link>
                        </div>

                        <div className="ml-5 basis-4/5">
                          <Link to={`/libris/details/${book.id}`}>
                            <h2 className="text-2xl font-bold relative group">
                              {book.volumeInfo.title}
                              <span className="absolute bottom-0 left-0 w-0 h-1 bg-emerald-500 transition-all duration-300 group-hover:w-full" />
                            </h2>
                          </Link>
                          <div className="text-neutral-500">
                            <small>
                              By{" "}
                              {book.volumeInfo.authors?.join(", ") ||
                                "Unknown Author"}
                            </small>{" "}
                            · <small>{book.volumeInfo.pageCount} pages</small>
                          </div>
                          <p className="mt-3">
                            {parse(
                              book.searchInfo?.textSnippet ||
                                "Summary unavailable."
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="text-center my-14">
            <span className="p-4 rounded-lg mx-auto bg-emerald-500 font-bold">
              No Results found.
            </span>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Categories;
