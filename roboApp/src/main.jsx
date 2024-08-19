import React from "react";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import App from "./App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
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
      <ArticleList />
    </div>
  );
};
export default Main;

/*
import React from "react"; // Keep this only once at the top
import ArticleList from "./components/ArticleList.jsx";
import Header from "./components/Header";


const Main = () => {
  return (
    <div>
      <Header />
      <ArticleList /> {}
    </div>
  );
};

export default Main;
*/