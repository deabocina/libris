import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import Homepage from "./components/Homepage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/libris/" element={<Homepage />} />
        <Route path="/libris/search/" element={<Search />} />
      </Routes>
    </Router>
  );
};

export default App;
