import { useState } from "react";
import Search from "./Search";
import Footer from "./Footer";
import { icons } from "../assets/assets";
import { db, auth, createUserWithEmailAndPassword } from "../config/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !surname || !email || !password) {
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
        throw new Error("E-mail is already in use. Try logging in.");
      } else if (error.code === "auth/invalid-email") {
        throw new Error("Invalid e-mail format. Please check your input.");
      } else if (error.code === "auth/weak-password") {
        throw new Error(
          "Password is too weak. It should be at least 6 characters."
        );
      } else {
        throw new Error(
          "An error occurred during registration. Please try again."
        );
      }
    }
  };

  const inputForm = `bg-neutral-800 p-3 pl-5 w-64 rounded-md transition-all duration-300 hover:bg-neutral-600 outline-none focus:ring-4 focus:ring-emerald-500`;

  return (
    <div className="flex flex-col min-h-screen">
      <Search />
      <>
        <h2 className="flex flex-col justify-center items-center mb-10 mt-20 text-4xl font-bold">
          Register
          <div className="w-20 bg-emerald-500 h-1 mt-3" />
        </h2>
        <form onSubmit={handleRegister}>
          <div className="flex flex-col gap-3 justify-center items-center">
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

            <button
              type="submit"
              className="bg-emerald-500 p-5 rounded-md w-64 mt-10 font-bold uppercase transition-colors duration-300 ease-in-out hover:bg-emerald-700"
            >
              Register
            </button>
          </div>
        </form>
      </>

      <div className="flex-grow" />
      <Footer />
    </div>
  );
};

export default Register;
