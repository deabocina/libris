import Search from "./Search";
import Footer from "./Footer";

const Login = () => {
  const inputForm = `bg-neutral-800 p-3 pl-5 w-64 rounded-md transition-all duration-300 hover:bg-neutral-600 outline-none focus:ring-4 focus:ring-emerald-500`;

  return (
    <div className="flex flex-col min-h-screen">
      <Search />
      <>
        <h2 className="flex flex-col justify-center items-center mb-10 mt-20 text-4xl font-bold">
          Login
          <div className="w-20 bg-emerald-500 h-1 mt-3" />
        </h2>
        <div className="flex flex-col gap-3 justify-center items-center">
          <input
            type="text"
            placeholder="example@gmail.com"
            className={inputForm}
          />
          <input
            type="password"
            placeholder="Enter your password.."
            className={inputForm}
          />

          <button className="bg-emerald-500 p-5 rounded-md w-64 mt-10 font-bold uppercase transition-colors duration-300 ease-in-out hover:bg-emerald-700">
            Login
          </button>
        </div>
      </>

      <div className="flex-grow" />
      <Footer />
    </div>
  );
};

export default Login;
