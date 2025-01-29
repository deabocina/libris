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

  const inputForm = `bg-neutral-800 p-3 pl-5 w-64 rounded-md transition-all duration-300 hover:bg-neutral-600 outline-none focus:ring-4 focus:ring-emerald-500`;

  return (
    <div className="flex flex-col min-h-screen">
      <Search />
      <div className="flex flex-col justify-center items-center ">
        <h2 className="mb-10 mt-20 text-center text-4xl font-bold">
          Register
          <div className="w-20 bg-emerald-500 h-1 mt-3 mx-auto" />
        </h2>
        <p className="mb-8">
          Already have an account?{" "}
          <Link to="/login">
            {" "}
            <span className="text-emerald-500 font-bold transition-colors duration-200 ease-in-out hover:text-emerald-700">
              {" "}
              Login here
            </span>
          </Link>
        </p>
        <form onSubmit={handleRegister}>
          <div className="flex flex-col gap-3 items-center">
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
              type="text"
              placeholder="example@gmail.com"
              value={email}
              className={inputForm}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password.."
              value={password}
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
            {error && (
              <p className="text-red-600 bg-red-100 border-l-4 border-red-500 p-3 rounded-md text-sm font-medium max-w-xs text-center mt-8">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="bg-emerald-500 p-5 rounded-md w-64 mt-10 font-bold uppercase transition-colors duration-300 ease-in-out hover:bg-emerald-700"
            >
              Register
            </button>
          </div>
        </form>
      </div>

      <div className="flex-grow" />
      <Footer />
    </div>
  );
};

export default Register;
