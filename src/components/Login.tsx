import Search from "./Search";
import Footer from "./Footer";
import { useState } from "react";
import { icons } from "../assets/assets";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else {
        setError("E-mail or password is not correct! Please try again.");
      }
    }
  };

  const inputForm = `bg-neutral-800 p-3 pl-5 w-64 rounded-md transition-all duration-300 hover:bg-neutral-600 outline-none focus:ring-4 focus:ring-emerald-500`;

  return (
    <div className="flex flex-col min-h-screen">
      <Search />
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold text-center mb-10 mt-20">
          Login
          <div className="w-20 bg-emerald-500 h-1 mt-3 mx-auto" />
        </h2>
        <p className="mb-8 text-center">
          Don't have an account?{" "}
          <Link to="/register">
            <span className="text-emerald-500 font-bold transition-colors duration-200 ease-in-out hover:text-emerald-700">
              Register here
            </span>
          </Link>
        </p>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center gap-3"
        >
          <input
            type="text"
            value={email}
            placeholder="example@gmail.com"
            className={inputForm}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
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
              className="cursor-pointer absolute top-1/2 right-4 transform -translate-y-1/2 size-6"
            />
          </div>
          {error && (
            <p className="text-red-600 bg-red-100 border-l-4 border-red-500 p-3 rounded-md text-sm font-medium max-w-xs text-center mt-8">
              {error}
            </p>
          )}
          
          <button
            type="submit"
            className="bg-emerald-500 p-5 rounded-md w-64 mt-10 font-bold uppercase transition-colors duration-300 ease-in-out hover:bg-emerald-700"
          >
            Login
          </button>
        </form>
      </div>

      <div className="flex-grow" />
      <Footer />
    </div>
  );
};

export default Login;
