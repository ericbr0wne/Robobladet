import React from "react"; // Keep this only once at the top
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ArticleList from "./components/ArticleList.jsx";
import Header from "./components/Header";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

const Main = () => {
  return (
    <div>
      <Header />
      <ArticleList /> {/* This should render the articles */}
    </div>
  );
};

export default Main;
