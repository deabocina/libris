export const fetchGoogleBooks = async (query: string) => {
  const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_KEY;
  if (!apiKey) {
    throw new Error(`Error fetching API key.`);
  }

  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    query
  )}&key=${apiKey}
`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    const data = await response.json();
    return data.items;
  } catch (error) {
    throw new Error(`Error fetching Google Books Data: ${error}`);
  }
};
