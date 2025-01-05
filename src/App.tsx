import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Categories from "./components/Categories";
import AboutUs from "./components/AboutUs";
import SearchResults from "./components/SearchResults";
import BookDetails from "./components/BookDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/libris/" element={<Homepage />} />
        <Route path="/libris/categories/" element={<Categories />} />
        <Route path="/libris/about-us" element={<AboutUs />} />
        <Route path="/libris/search/" element={<SearchResults />} />
        <Route path="/libris/details/:id" element={<BookDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
