import React from "react";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import App from "./App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Link } from "react-router-dom";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

const Main = () => {
  console.log("Main component loaded");
  return (
    <div>
      <Header />
      <ul>
        <li><Link to="/privacy">Privacy Policy</Link></li>
      </ul>
      <ArticleList />
    </div>
  );
};
export default Main;
