import Search from "./Search";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { groupedCategories } from "../data/categories";
import Select from "react-select";
import { AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { filterStyle } from "../styles/reactSelectStyles/filterStyle";
import {
  setCategory,
  setTitle,
  setAuthor,
  setIsbn,
  setPublisher,
} from "../redux/filtersSlice";
import { handleBookFilter } from "../utils/filterUtils";
import { useCustomDebounce } from "../hooks/useCustomDebounce";

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector((state: RootState) => state.googleBooks.books);
  const bookFilters = useSelector((state: RootState) => state.filters);
  const [reactSelect, setReactSelect] = useState<any>(null);

  const debouncedSetTitle = useCustomDebounce(setTitle);
  const debouncedSetAuthor = useCustomDebounce(setAuthor);
  const debouncedSetIsbn = useCustomDebounce(setIsbn);
  const debouncedSetPublisher = useCustomDebounce(setPublisher);

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
    dispatch(setCategory(selectedOption.value));
  };

  useEffect(() => {
    handleBookFilter(
      dispatch,
      bookFilters.category,
      bookFilters.isbn,
      bookFilters.title,
      bookFilters.author,
      bookFilters.publisher
    );
  }, [
    bookFilters.category,
    bookFilters.isbn,
    bookFilters.title,
    bookFilters.author,
    bookFilters.publisher,
  ]);

  const filters =
    "bg-white border border-gray-300 text-gray-800 placeholder-gray-500 p-3 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 w-full";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <div className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <Search />
        <div className="bg-emerald-800 p-10 shadow-inner">
          <p className="text-white text-sm md:text-base leading-relaxed px-52">
            Welcome to our book collection! Use the filters below to explore and
            refine your search. You can select a category, or search by title,
            author, publisher, or ISBN. These tools will help you quickly
            discover books that match your interests, find hidden gems, and dive
            deeper into your favorite genres. Whether you’re looking for
            bestsellers, classics, or something entirely new, start your
            literary journey here.
          </p>
        </div>
      </div>

      <div className="pt-56 px-4 lg:px-16 flex flex-col lg:flex-row gap-8 my-24">
        <div className="flex-shrink-0 w-full lg:w-64 flex flex-col gap-4 mb-6 lg:mb-0">
          <Select
            value={reactSelect}
            onChange={handleSelectChange}
            onFocus={() => {
              dispatch(setTitle(""));
              dispatch(setAuthor(""));
              dispatch(setCategory(""));
              dispatch(setIsbn(""));
              dispatch(setPublisher(""));
            }}
            options={options}
            placeholder="Choose a category..."
            isClearable
            isSearchable
            styles={filterStyle}
          />
          <input
            type="text"
            placeholder="Find by title..."
            className={filters}
            onChange={(e) => debouncedSetTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Find by author..."
            className={filters}
            onChange={(e) => debouncedSetAuthor(e.target.value)}
          />
          <input
            type="text"
            placeholder="Find by publisher..."
            className={filters}
            onChange={(e) => debouncedSetPublisher(e.target.value)}
          />
          <input
            type="text"
            placeholder="Find by ISBN..."
            minLength={10}
            maxLength={13}
            className={filters}
            onChange={(e) => debouncedSetIsbn(e.target.value)}
          />
        </div>

        <div className="flex-1">
          {books?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map(
                (book) =>
                  book.volumeInfo.title &&
                  book.volumeInfo.pageCount > 0 &&
                  book.volumeInfo.categories && (
                    <div
                      key={book.id}
                      className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col"
                    >
                      <Link to={`/details/${book.id}`}>
                        <img
                          src={
                            book.volumeInfo.imageLinks?.thumbnail ||
                            "/default-book.jpg"
                          }
                          alt={book.volumeInfo.title}
                          className="w-full rounded-lg h-60 object-contain mb-2 transform hover:scale-110 transition-transform ease-in-out"
                        />
                      </Link>
                      <Link to={`/details/${book.id}`}>
                        <h3 className="text-lg font-bold mb-1 text-emerald-700 hover:text-emerald-800 transition">
                          {book.volumeInfo.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 mb-1">
                        by{" "}
                        <span className="text-emerald-600 font-medium hover:text-emerald-700 cursor-pointer">
                          {book.volumeInfo.authors?.join(", ") ||
                            "Unknown Author"}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500 mb-2">
                        {book.volumeInfo.pageCount} pages ·{" "}
                        {book.volumeInfo.publisher || "Unknown Publisher"}
                      </p>
                      <p className="text-sm text-gray-700 line-clamp-6">
                        {parse(
                          book.searchInfo?.textSnippet ||
                            book.volumeInfo.description ||
                            "Summary unavailable."
                        )}
                      </p>
                    </div>
                  )
              )}
            </div>
          ) : (
            <div className="text-center my-14">
              <span className="px-6 py-3 rounded-lg bg-emerald-500 text-white font-bold shadow">
                No results found.
              </span>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Categories;
