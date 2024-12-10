export interface gutenbergInterface {
  id: number;
  title: string;
  authors: [
    {
      name: string;
      birth_year: number;
      death_year: number;
    }
  ];
  translators: string[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean;
  formats: {
    "text/html": string;
    "application/epub+zip": string;
    "image/jpeg": string;
  };
  download_count: number;
}
