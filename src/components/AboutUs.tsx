import Search from "./Search";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Search />
      <div className="mt-16 m-5 md:mx-auto md:w-4/5 lg:w-3/5 xl:w-2/4">
        <h1 className="font-bold text-2xl text-emerald-500 mb-8">
          About Libris
        </h1>

        <hr className="border-t border-gray-300 my-6" />
        <div className="mb-8">
          <p className="mb-5">
            Welcome to <span className="font-semibold">Libris</span>, a home for
            readers who cherish the power of stories. Whether you're looking for
            timeless classics, trending bestsellers or undiscovered treasures,
            you'll find a world of inspiration in our carefully curated
            collection.
          </p>
          <p className="mb-5">
            At <span className="font-semibold">Libris</span>, we believe that
            every book is a journey – a chance to explore new ideas, discover
            distant worlds and connect with the stories that move us. Our
            mission is to bring you an ever-growing library of tales and
            knowledge, all in one place.
          </p>
          <p className="mb-5">
            Dive in and explore:{" "}
            <span className="font-semibold">browse by category</span>,{" "}
            <span className="font-semibold">search by author</span> or uncover
            titles through our{" "}
            <span className="font-semibold">bestseller lists</span>. However you
            choose to navigate, <span className="font-semibold">Libris </span>
            is here to make finding your next great read effortless and
            enjoyable.
          </p>
          <p className="mb-5">
            Take your time, follow your curiosity and let the magic of books
            inspire your journey.
          </p>
        </div>
        <hr className="border-t border-gray-300 my-6" />

        <p className="text-center mt-10 font-light italic">
          Happy reading,
          <br />
          <span className="font-semibold">The Libris Team</span>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
