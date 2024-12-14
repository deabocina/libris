import { useState } from "react";
import { googleBooksInterface } from "../interface/googleBooksInterface";

const Search = () => {
  const [bookResult, setBookResults] = useState<googleBooksInterface[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center">
          <div className="spinner mt-10">
            {bookResult &&
              bookResult.map((book) => (
                <div key={book.id}>
                  <p>{book.selfLink}</p>
                  <p>{book.volumeInfo.title}</p>
                  <p>{book.volumeInfo.subtitle}</p>
                  <p>{book.volumeInfo.authors}</p>
                  <p>{book.volumeInfo.publisher}</p>
                  <p>{book.volumeInfo.publishedDate}</p>
                  <p>{book.volumeInfo.description}</p>
                  <p>{book.volumeInfo.pageCount}</p>
                  <p>{book.volumeInfo.printType}</p>

                  <p>{book.volumeInfo.categories}</p>
                  <p>{book.volumeInfo.averageRating}</p>
                  <p>{book.volumeInfo.ratingsCount}</p>
                  <p>{book.volumeInfo.maturityRating}</p>
                  <p>{book.volumeInfo.contentVersion}</p>
                  <p>{book.volumeInfo.imageLinks.smallThumbnail}</p>
                  <p>{book.volumeInfo.language}</p>
                  <p>{book.volumeInfo.previewLink}</p>

                  <p>{book.volumeInfo.infoLink}</p>
                  <p>{book.saleInfo.country}</p>
                  <p>{book.saleInfo.saleability}</p>
                  <p>{book.saleInfo.isEbook}</p>
                  <p>{book.accessInfo.country}</p>
                  <p>{book.accessInfo.viewability}</p>
                  <p>{book.accessInfo.embeddable}</p>
                  <p>{book.accessInfo.publicDomain}</p>

                  <p>{book.accessInfo.textToSpeechPermission}</p>
                  <p>{book.accessInfo.epub.isAvailable}</p>
                  <p>{book.accessInfo.epub.acsTokenLink}</p>
                  <p>{book.accessInfo.webReaderLink}</p>
                  <p>{book.accessInfo.accessViewStatus}</p>
                  <p>{book.searchInfo.textSnippet}</p>

                  {book.volumeInfo.industryIdentifiers.map((book, index) => (
                    <div key={index}>
                      <p>{book.type}</p>
                      <p>{book.identifier}</p>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Search;
