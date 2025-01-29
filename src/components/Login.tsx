import Search from "./Search";
import Footer from "./Footer";
import { useState } from "react";
import { icons } from "../assets/assets";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      throw new Error("E-mail or password is not correct! Please try again.");
    }
  };

  const inputForm = `bg-neutral-800 p-3 pl-5 w-64 rounded-md transition-all duration-300 hover:bg-neutral-600 outline-none focus:ring-4 focus:ring-emerald-500`;

  return (
    <div className="flex flex-col min-h-screen">
      <Search />
      <>
        <h2 className="flex flex-col justify-center items-center mb-10 mt-20 text-4xl font-bold">
          Login
          <div className="w-20 bg-emerald-500 h-1 mt-3" />
        </h2>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-3 justify-center items-center">
            <input
              type="text"
              value={email}
              placeholder="example@gmail.com"
              className={inputForm}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Enter your password.."
              className={inputForm}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img
              src={showPassword ? icons.view : icons.hide}
              alt={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer relative bottom-12 left-24 size-6"
            />

            <button
              type="submit"
              className="bg-emerald-500 p-5 rounded-md w-64 mt-10 font-bold uppercase transition-colors duration-300 ease-in-out hover:bg-emerald-700"
            >
              Login
            </button>
          </div>
        </form>
      </>

      <div className="flex-grow" />
      <Footer />
    </div>
  );
};

export default Login;
