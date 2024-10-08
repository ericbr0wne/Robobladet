import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import Privacy from "./components/Privacy";
import Robot from "./components/Robot";
import Navbar from "./components/Navbar";
import Contact from "./components/ContactForm";
import Login from "./components/Login";
import Register from "./components/Register";
import Creators from "./components/Creators";
import "./App.css";
import ThemeToggle from "./components/ThemeToggle";
import "./index.css";
import Categories from "./components/Categories";

function App() {
  return (
    <div>
      <ThemeToggle />
      <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<Creators />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/articles" element={<ArticleList />} />
        </Routes>
        <Robot />
      </Router>
    </div>
  );
}

export default App;
