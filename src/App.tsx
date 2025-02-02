import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Categories from "./components/Categories";
import AboutUs from "./components/AboutUs";
import SearchResults from "./components/SearchResults";
import BookDetails from "./components/BookDetails";
import Register from "./components/Register";
import Login from "./components/Login";
import Favourites from "./components/Favourites";

const App = () => {
  return (
    <Router basename="/libris">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/details/:id" element={<BookDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </Router>
  );
};

export default App;
