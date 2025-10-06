import Search from "./Search";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { icons } from "../assets/assets";

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Search />

      <section className="py-24 px-5 text-center bg-emerald-800">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
          About Libris
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-100 leading-relaxed mb-8">
          Libris is your gateway to the world of books. From timeless classics
          to trending bestsellers, we connect readers with stories that inspire,
          challenge, and transform.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-full shadow-md hover:bg-emerald-600 transition"
          >
            Bestsellers
          </Link>
          <Link
            to="/categories"
            className="px-6 py-3 bg-white text-emerald-800 font-semibold rounded-full shadow-md hover:bg-gray-100 transition"
          >
            Categories
          </Link>
        </div>
      </section>

      <div className="mt-12 flex flex-col md:flex-row justify-center gap-6 text-center">
        <div className="p-6 bg-gray-100 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-110">
          <img
            src={icons.mission}
            alt="Mission"
            className="w-8 h-8 mx-auto mb-3"
          />
          <h3 className="font-bold mb-2">Mission</h3>
          <p className="text-sm text-gray-700">
            Bring readers the best stories.
          </p>
        </div>
        <div className="p-6 bg-gray-100 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-110">
          <img
            src={icons.vision}
            alt="Vision"
            className="w-8 h-8 mx-auto mb-3"
          />
          <h3 className="font-bold mb-2">Vision</h3>
          <p className="text-sm text-gray-700">
            Make reading accessible and fun.
          </p>
        </div>
        <div className="p-6 bg-gray-100 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-110">
          <img
            src={icons.value}
            alt="Values"
            className="w-8 h-8 mx-auto mb-3"
          />
          <h3 className="font-bold mb-2">Values</h3>
          <p className="text-sm text-gray-700">
            Integrity, passion, curiosity.
          </p>
        </div>
      </div>

      <section className="mt-16 px-5 md:mx-auto md:w-4/5 lg:w-3/5 xl:w-2/4 text-center">
        <h2 className="text-3xl font-bold text-emerald-500 mb-8">
          Meet the Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Member 1 */}
          <div className="bg-gray-100 text-gray-900 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 group">
            <img
              src={icons.member1}
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full mb-3 border-4 border-emerald-500/30 group-hover:border-emerald-500 transition-all duration-300"
            />
            <h3 className="font-bold text-lg mb-1 group-hover:text-emerald-600 transition-colors">
              Jane Doe
            </h3>
            <p className="text-sm text-gray-600 mb-4">Founder & Book Lover</p>

            <div className="flex justify-center gap-4 transition-all duration-300 hover:animate-pulse">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-600 transition-colors"
              >
                <img src={icons.linkedin} alt="LinkedIn" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Member 2 */}
          <div className="bg-gray-100 text-gray-900 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 group">
            <img
              src={icons.member2}
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full mb-3 border-4 border-emerald-500/30 group-hover:border-emerald-500 transition-all duration-300"
            />
            <h3 className="font-bold text-lg mb-1 group-hover:text-emerald-600 transition-colors">
              Mark Thompson
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Lead Curator & Customer Support
            </p>

            <div className="flex justify-center gap-4 transition-all duration-300 hover:animate-pulse">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-600 transition-colors"
              >
                <img src={icons.linkedin} alt="LinkedIn" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Member 3 */}
          <div className="bg-gray-100 text-gray-900 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 group">
            <img
              src={icons.member3}
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full mb-3 border-4 border-emerald-500/30 group-hover:border-emerald-500 transition-all duration-300"
            />
            <h3 className="font-bold text-lg mb-1 group-hover:text-emerald-600 transition-colors">
              Sophie Miller
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Visual Designer & Developer
            </p>

            <div className="flex justify-center gap-4 transition-all duration-300 hover:animate-pulse">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-600 transition-colors"
              >
                <img src={icons.linkedin} alt="LinkedIn" className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 mb-20 px-5 md:mx-auto md:w-4/5 lg:w-3/5 xl:w-2/4 space-y-8 text-center">
        <p className="text-gray-800 text-lg leading-relaxed">
          Welcome to{" "}
          <span className="text-emerald-500 font-semibold">Libris</span>, a home
          for readers who cherish the power of stories. Whether you're looking
          for timeless classics, trending bestsellers or undiscovered treasures,
          you'll find a world of inspiration in our carefully curated
          collection.
        </p>
        <p className="text-gray-800 text-lg leading-relaxed">
          At Libris, we believe that every book is a journey – a chance to
          explore new ideas, discover distant worlds and connect with the
          stories that move us. Our mission is to bring you an ever-growing
          library of tales and knowledge, all in one place.
        </p>
        <p className="text-gray-800 text-lg leading-relaxed">
          Take your time, follow your curiosity and let the magic of books
          inspire your journey.
        </p>

        <p className="text-gray-500 italic mt-10">
          Happy reading,
          <br />
          <span className="text-emerald-500 font-semibold">
            The Libris Team
          </span>
        </p>
      </section>

      <section className="mt-28 text-center px-6 sm:px-10">
        <h2 className="text-3xl font-bold text-emerald-500 mb-8">
          What Our Readers Say
        </h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          <blockquote className="bg-gray-100 text-gray-900 p-10 sm:p-14 rounded-lg shadow-md italic">
            "Libris transformed my reading habits! I always find the perfect
            book." – Alex P.
          </blockquote>
          <blockquote className="bg-gray-100 text-gray-900 p-10 sm:p-14 rounded-lg shadow-md italic">
            "The best curated book collections online. Highly recommended!" –
            Maria S.
          </blockquote>
        </div>
      </section>

      <div className="my-28 text-center">
        <p className="mb-4 text-lg text-gray-700">
          Ready to explore the world of books?
        </p>
        <Link
          to="/categories"
          className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-full shadow-md hover:bg-emerald-600 transition"
        >
          Start your journey
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
