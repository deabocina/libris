import { useState } from "react";
import Search from "./Search";
import Footer from "./Footer";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `https://localhost:${process.env.PORT}/api/register`,
        {
          name,
          surname,
          email,
          password,
        }
      );

      if (response.status === 201) {
        setName("");
        setSurname("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log("Registration failed.");
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
            type="password"
            placeholder="Enter your password.."
            value={password}
            className={inputForm}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            onClick={handleRegister}
            className="bg-emerald-500 p-5 rounded-md w-64 mt-10 font-bold uppercase transition-colors duration-300 ease-in-out hover:bg-emerald-700"
          >
            Register
          </button>
        </div>
      </>

      <div className="flex-grow" />
      <Footer />
    </div>
  );
};

export default Register;
