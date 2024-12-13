export const fetchNyTimesBestsellers = async () => {
  const apiKey = import.meta.env.VITE_NY_TIMES_KEY;
  if (!apiKey) {
    throw new Error("Error fetching API key.");
  }

  const url = `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${apiKey}
`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    const data = await response.json();
    return data.results.lists;
  } catch (error) {
    throw new Error(`Error fetching NY Times Data: ${error}`);
  }
};
