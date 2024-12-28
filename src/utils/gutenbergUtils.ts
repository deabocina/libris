export const fetchGutenbergData = async (bookTitle: string) => {
  const url = `https://gutendex.com/books/?search=${encodeURIComponent(
    bookTitle
  )}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const bookFound = data.results.find(
      (book: any) => book.title.toLowerCase() === bookTitle.toLowerCase()
    );
    return bookFound;
  } catch (error) {
    console.log(`Error fetching Gutenberg data: ${error}`);
    return null;
  }
};

export const handleGutenbergData = async (
  bookTitle: string,
  setIsFreeReadingAvailable: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const bookFound = await fetchGutenbergData(bookTitle);

  if (bookFound) {
    const formats = bookFound.formats;
    if (formats["text/html"]) {
      setIsFreeReadingAvailable(true);
    } else {
      setIsFreeReadingAvailable(false);
    }
  } else {
    setIsFreeReadingAvailable(false);
  }
};

export const openGutenbergLink = async (bookTitle: string) => {
  const bookFound = await fetchGutenbergData(bookTitle);

  if (bookFound) {
    const formats = bookFound.formats;
    if (formats["text/html"]) {
      window.open(formats["text/html"], "_blank", "noopener noreferrer");
    }
  } else {
    console.log("Book not found.");
  }
};
