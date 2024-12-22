import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import Homepage from "./components/Homepage";
import SearchDetails from "./components/SearchDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/libris/" element={<Homepage />} />
        <Route path="/libris/search/" element={<Search />} />
        <Route path="/libris/details/:id" element={<SearchDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
