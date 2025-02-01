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

  const filters = `bg-neutral-800 p-3 pl-5 w-64 rounded-md transition-all duration-300 hover:bg-neutral-600 outline-none focus:ring-4 focus:ring-emerald-500`;

  return (
    <div className="flex flex-col min-h-screen">
      <Search />
      <h1 className="text-3xl font-bold m-5 pt-5 md:mx-auto md:w-4/5 lg:text-center">
        Categories
        <div className="w-20 h-1 bg-emerald-500 mt-3 lg:mx-auto" />
      </h1>

      <div className="flex flex-wrap mt-12 m-5 gap-5 md:mx-auto md:w-4/5 items-center lg:w-3/5 xl:w-2/4">
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
          placeholder="Choose a category.."
          isClearable={true}
          isSearchable={true}
          className="w-64"
          styles={filterStyle}
        />

        <input
          type="text"
          placeholder="Find by title.."
          className={filters}
          onChange={(e) => debouncedSetTitle(e.target.value)}
          onFocus={() => {
            dispatch(setAuthor(""));
            dispatch(setTitle(""));
            dispatch(setCategory(""));
            dispatch(setIsbn(""));
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleBookFilter(
                dispatch,
                bookFilters.category,
                bookFilters.title
              );
            }
          }}
        />

        <input
          type="text"
          placeholder="Find by author.."
          className={filters}
          onChange={(e) => debouncedSetAuthor(e.target.value)}
          onFocus={() => {
            dispatch(setTitle(""));
            dispatch(setCategory(""));
            dispatch(setIsbn(""));
            dispatch(setPublisher(""));
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleBookFilter(
                dispatch,
                bookFilters.category,
                bookFilters.author
              );
            }
          }}
        />

        <input
          type="text"
          placeholder="Find by publisher.."
          className={filters}
          onChange={(e) => debouncedSetPublisher(e.target.value)}
          onFocus={() => {
            dispatch(setAuthor(""));
            dispatch(setTitle(""));
            dispatch(setCategory(""));
            dispatch(setIsbn(""));
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleBookFilter(
                dispatch,
                bookFilters.category,
                bookFilters.publisher
              );
            }
          }}
        />

        <input
          type="text"
          placeholder="Find by ISBN.."
          minLength={10}
          maxLength={13}
          onChange={(e) => debouncedSetIsbn(e.target.value)}
          onFocus={() => {
            dispatch(setPublisher(""));
            dispatch(setAuthor(""));
            dispatch(setTitle(""));
            dispatch(setCategory(""));
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleBookFilter(
                dispatch,
                bookFilters.category,
                bookFilters.isbn
              );
            }
          }}
          className={filters}
        />
      </div>

      <div className="flex flex-col justify-center items-center">
        <h2 className="uppercase text-xl font-bold ml-5 mt-10">
          {bookFilters.author
            ? bookFilters.author
            : bookFilters.title
            ? bookFilters.title
            : bookFilters.publisher
            ? bookFilters.publisher
            : bookFilters.isbn
            ? ""
            : bookFilters.category}
          <div className="w-10 h-1 bg-emerald-500 mt-3 " />
        </h2>
      </div>

      <div>
        {books?.length > 0 ? (
          <div className="flex justify-center">
            <div className="w-full max-w-7xl">
              {books &&
                books.map((book) => (
                  <div key={book.id}>
                    {book.volumeInfo.title &&
                      book.volumeInfo.pageCount > 0 &&
                      book.volumeInfo.categories && (
                        <div className="flex m-5 p-3 transition-colors duration-200 ease-in-out rounded-md hover:bg-neutral-800 md:mx-auto md:w-4/5 lg:w-3/5 xl:w-2/4">
                          <div className="basis-32">
                            <Link to={`/details/${book.id}`}>
                              {" "}
                              <img
                                src={book.volumeInfo.imageLinks?.smallThumbnail}
                                alt={`Cover of ${book.volumeInfo.title}`}
                                className="min-w-32 min-h-48 transition-transform duration-300 hover:scale-110 rounded-sm"
                              />
                            </Link>
                          </div>

                          <div className="ml-5 basis-4/5">
                            <Link to={`/details/${book.id}`}>
                              <h2 className="text-2xl font-bold relative group">
                                {book.volumeInfo.title}
                                <span className="absolute bottom-0 left-0 w-0 h-1 bg-emerald-500 transition-all duration-300 group-hover:w-full" />
                              </h2>
                            </Link>
                            <div className="text-neutral-500">
                              <Link
                                to=""
                                onClick={() => {
                                  const author = book.volumeInfo.authors?.[0];
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
                              >
                                <small>
                                  By{" "}
                                  <span className="text-emerald-500 font-semibold transition-colors duration-300 ease-out hover:text-emerald-700">
                                    {book.volumeInfo.authors?.join(", ") ||
                                      "Unknown Author"}
                                  </span>
                                </small>
                              </Link>{" "}
                              · <small>{book.volumeInfo.pageCount} pages</small>
                            </div>
                            <p className="mt-3 book-description">
                              {parse(
                                book.searchInfo?.textSnippet ||
                                  book.volumeInfo.description ||
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
      <div className="flex-grow" />
      <Footer />
    </div>
  );
};

export default Categories;
