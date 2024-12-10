export const fetchGutenbergBooks = async (
  query: string,
  title?: string,
  author?: string,
  language?: string
) => {
  let url = `https://gutendex.com/books/?search=${encodeURIComponent(query)}`;

  if (title) {
    url += `&title=${encodeURIComponent(title)}`;
  }
  if (author) {
    url += `&author=${encodeURIComponent(author)}`;
  }
  if (language) {
    url += `&languages=${encodeURIComponent(language)}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`Failed to fetch data: ${response.status}`);
      return null;
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(`Error fetching Gutenberg Book Data: ${error}`);
    return null;
  }
};
