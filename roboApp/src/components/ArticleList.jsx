import React, { useEffect, useState } from "react";
import "./ArticleList.css";
import Highlight from "./Highlight";

const ArticleList = () => {
  console.log("Article component loaded");
  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchArticles = (sortOption, searchTerm = "") => {
    fetch(
      `http://localhost:3000/api/articles?sortBy=${sortOption}&search=${searchTerm}`
    )
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error("Error fetching articles:", error));
  };

  useEffect(() => {
    fetchArticles(sortBy, searchQuery);
  }, [sortBy, searchQuery]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="article-list">
      <h1>Artiklar</h1>
      <div className="search-sort-bar">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="sort-menu">
          <label>Sort by: </label>
          <select value={sortBy} onChange={handleSortChange}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      <div className="articles">
        {articles.length > 0 ? (
          articles.map((article) => {
            const shortSummary =
              article.summary.length > 120
                ? article.summary.substring(0, 120) + "..."
                : article.summary;
            return (
              <div
                className="article-card"
                key={article.title}
                style={{ backgroundImage: `url(${article.img})` }}
              >
                <h2>
                  <Highlight text={article.title} searchTerm={searchQuery} />
                </h2>
                <p>
                  <Highlight text={shortSummary} searchTerm={searchQuery} />
                </p>
                <a href={article.link} target="_blank">
                  Read more
                </a>
              </div>
            );
          })
        ) : (
          <p>Inga artiklar hittades...</p>
        )}
      </div>
    </div>
  );
};

export default ArticleList;
