import { useState } from "react";
import Search from "./Search";
import Footer from "./Footer";
import { icons } from "../assets/assets";
import { db, auth, createUserWithEmailAndPassword } from "../config/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !surname || !email || !password) {
      setError("Please fill in all fields!");
      return;
    }

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        surname: surname,
        email: email,
      });

      navigate("/");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setError("E-mail is already in use. Try logging in.");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid e-mail format. Please check your input.");
      } else if (error.code === "auth/weak-password") {
        setError("Password is too weak. It should be at least 6 characters.");
      } else {
        setError("An error occurred during registration. Please try again.");
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
            Create an Account
          </h2>
          <p className="text-gray-600 mb-10 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-600 font-semibold hover:text-emerald-700 transition"
            >
              Login here
            </Link>
          </p>

          <form
            onSubmit={handleRegister}
            className="flex flex-col items-center gap-5"
          >
            <input
              type="text"
              placeholder="John"
              value={name}
              className={inputForm}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Smith"
              value={surname}
              className={inputForm}
              onChange={(e) => setSurname(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              className={inputForm}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative w-72 md:w-80">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password..."
                value={password}
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
              Register
            </button>
          </form>

          <div className="border-t border-gray-200 mt-10 pt-6">
            <p className="text-sm text-gray-500">
              By registering, you agree to our{" "}
              <a
                href="#"
                className="text-emerald-600 font-medium hover:underline"
              >
                Terms & Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
