import { Link } from "react-router-dom";
import { icons } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-emerald-900 text-gray-200 py-12 px-5 flex flex-col items-center justify-center relative">
      <div className="flex flex-col items-center mb-8">
        <Link to="/">
          {" "}
          <img
            src={icons.logo}
            alt="Libris Logo"
            className="w-24 mb-3 rounded-full transition-transform duration-300 hover:-translate-y-1 hover:brightness-125 hover:drop-shadow-[0_0_6px_rgba(16,185,129,0.4)]"
          />
        </Link>

        <p className="text-gray-400 text-center text-sm md:text-base max-w-md">
          Libris – Your gateway to the world of stories.
        </p>
      </div>

      <div className="flex gap-6 mb-8">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-emerald-500 transition-colors duration-300"
        >
          <img
            src={icons.facebook}
            alt="Facebook"
            className="w-6 h-6 transition-transform duration-300 hover:-translate-y-1"
          />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-emerald-500 transition-colors duration-300"
        >
          <img
            src={icons.instagram}
            alt="Instagram"
            className="w-6 h-6 transition-transform duration-300 hover:-translate-y-1"
          />
        </a>
        <a
          href="https://www.whatsapp.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-emerald-500 transition-colors duration-300"
        >
          <img
            src={icons.whatsapp}
            alt="Whatsapp"
            className="w-6 h-6 transition-transform duration-300 hover:-translate-y-1"
          />
        </a>
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-emerald-500 transition-colors duration-300"
        >
          <img
            src={icons.youtube}
            alt="Youtube"
            className="w-6 h-6 transition-transform duration-300 hover:-translate-y-1"
          />
        </a>
      </div>

      <a
        href="#"
        className="fixed bottom-6 right-6 md:right-10 flex items-center justify-center bg-emerald-600 text-white rounded-full w-12 h-12 hover:bg-emerald-500 shadow-lg transition"
        aria-label="Back to top"
      >
        <img src={icons.upArrow} className="w-6 h-6" alt="Back to top" />
      </a>

      <p className="text-gray-500 text-sm mt-6 text-center">
        &copy; {new Date().getFullYear()} Libris. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
