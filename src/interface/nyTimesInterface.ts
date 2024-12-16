export interface nyTimesInterface {
  list_id: number;
  list_name: string;
  display_name: string;
  books: [
    {
      author: string;
      description: string;
      primary_isbn13: string;
      primary_isbn10: string;
      publisher: string;
      title: string;
      rank: number;
      book_image: string;
      buy_links: [{ name: string; url: string }];
    }
  ];
}
