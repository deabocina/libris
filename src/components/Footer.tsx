import { useEffect, useState } from "react";
import { icons } from "../assets/assets";
import { quotableInterface } from "../interface/quotableInterface";
import { fetchQuotes } from "../services/quotableServices";

const Footer = () => {
  const [randomQuote, setRandomQuote] = useState<quotableInterface[]>([
    {
      _id: "default",
      content: "Not all those who wander are lost.",
      author: "J.R.R. Tolkien",
      tags: ["famous-quotes"],
    },
  ]);

  const handleQuotes = async () => {
    try {
      const data = await fetchQuotes();
      if (data) {
        setRandomQuote([data]);
      }
    } catch (error) {
      console.log(`Error fetching random quote: ${error}`);
    }
  };

  useEffect(() => {
    handleQuotes();
  }, []);

  return (
    <div>
      {" "}
      <footer className="bg-neutral-950 p-14 mt-20 flex items-center justify-between border-box">
        <blockquote className="italic text-lg text-center mx-auto">
          {randomQuote.map((quote) => (
            <div key={quote._id}>
              {quote.content}
              <cite>{quote.author}</cite>
              <button
                onClick={handleQuotes}
                className="mt-3 relative flex justify-center items-center mx-auto bg-neutral-800 rounded-full w-10 h-10 hover:animate-spin"
              >
                {" "}
                <img
                  src={icons.reload}
                  className="w-6 h-6"
                  alt="Reload quote"
                />
              </button>
            </div>
          ))}
        </blockquote>
        <a
          href="#"
          className="absolute right-0 mr-6 lg:mr-20 flex items-center justify-center bg-neutral-800 rounded-full w-10 h-10 hover:animate-pulse"
        >
          <img src={icons.upArrow} className="w-6 h-6" alt="Back to top" />
        </a>
      </footer>
    </div>
  );
};

export default Footer;
