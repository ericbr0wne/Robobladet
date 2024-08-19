import React, { useEffect, useState } from "react";
import "./ArticleList.css";

const ArticleList = () => {
  console.log("Article component loaded");
  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState("newest");

  const fetchArticles = (sortOption) => {
    fetch(`http://localhost:3000/api/articles?sortBy=${sortOption}`)
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error("Error fetching articles:", error));
  };

  useEffect(() => {
    fetchArticles(sortBy);
  }, [sortBy]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="article-list">
      <h1>Latest</h1>
      <div className="sort-menu">
        <label>Sort by: </label>
        <select value={sortBy} onChange={handleSortChange}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      <div className="articles">
        {articles.map((article) => (
          <div
            className="article-card"
            key={article.title}
            style={{ backgroundImage: `url(${article.img})` }}
          >
            <h2>{article.title}</h2>
            <p>{article.summary}</p>
            <a href={article.link}>Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
