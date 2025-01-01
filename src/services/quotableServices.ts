export const fetchQuotes = async () => {
  const url = `https://api.quotable.io/random/?tags=famous-quotes`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Error fetching quotes: ${error}`);
    return;
  }
};
