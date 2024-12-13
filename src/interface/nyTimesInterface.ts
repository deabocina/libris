export interface nyTimesInterface {
  list_id: number;
  list_name: string;
  display_name: string;
  list_image: string;
  books: [
    {
      author: string;
      contributor: string;
      description: string;
      created_date: string;
      primary_isbn13: number;
      primary_isbn10: number;
      publisher: string;
      title: string;
      rank: number;
    }
  ];
}
