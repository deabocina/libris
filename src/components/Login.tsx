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

  const inputForm = `bg-gray-100 text-gray-900 placeholder-gray-500 p-3 pl-5 w-72 md:w-80 rounded-lg 
  border border-gray-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 
  transition-all duration-300`;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Search />

      <div className="flex flex-col justify-center items-center flex-grow my-12 px-5">
        <div className="bg-white shadow-lg rounded-2xl p-10 md:p-14 w-full max-w-md text-center border border-gray-200">
          <h2 className="text-4xl font-extrabold text-emerald-600 mb-6">
            Welcome Back
          </h2>
          <p className="text-gray-600 mb-10 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-emerald-600 font-semibold hover:text-emerald-700 transition"
            >
              Register here
            </Link>
          </p>

          <form
            onSubmit={handleLogin}
            className="flex flex-col items-center gap-5"
          >
            <input
              type="email"
              value={email}
              placeholder="example@gmail.com"
              className={inputForm}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative w-72 md:w-80">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Enter your password..."
                className={inputForm}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <img
                src={showPassword ? icons.view : icons.hide}
                alt={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute top-1/2 right-4 transform -translate-y-1/2 w-6 h-6 opacity-70 hover:opacity-100 transition"
              />
            </div>

            {error && (
              <p className="text-red-600 bg-red-100 border-l-4 border-red-500 p-3 rounded-md text-sm font-medium max-w-xs text-center mt-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-10 rounded-lg 
              font-semibold uppercase tracking-wide transition-all duration-300 mt-6 
              shadow-md hover:shadow-lg"
            >
              Login
            </button>
          </form>

          <div className="border-t border-gray-200 mt-10 pt-6">
            <p className="text-sm text-gray-500">
              Forgot your password?{" "}
              <Link
                to="#"
                className="text-emerald-600 font-medium hover:underline"
              >
                Reset it
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
