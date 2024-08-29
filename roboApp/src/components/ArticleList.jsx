import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ArticleList.css";
import Highlight from "./Highlight";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [topic, setTopic] = useState("");

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const topicParam = params.get("topic");
    setTopic(topicParam || "");

    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/articles?topic=${
            topicParam || ""
          }&sortBy=${sortBy}&search=${searchQuery}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched articles data:", data); // Debugging line
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [location.search, sortBy, searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div className="article-list">
      <h1>
        Articles{" "}
        {topic ? `- ${topic.charAt(0).toUpperCase() + topic.slice(1)}` : ""}
      </h1>
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
              article.summary.length > 90
                ? article.summary.substring(0, 90) + "..."
                : article.summary;
            return (
              <div
                className="article-card"
                key={article.title}
                style={{ backgroundImage: `url(${article.img})` }}
              >
                <a
                  className="topic-text"
                  href={`/?topic=${article.topic}`}
                  rel="noreferrer"
                >
                  #
                  {article.topic.charAt(0).toUpperCase() +
                    article.topic.slice(1)}
                </a>
                <h2>
                  <Highlight text={article.title} searchTerm={searchQuery} />
                </h2>
                <p>
                  <Highlight text={shortSummary} searchTerm={searchQuery} />
                </p>
                <a
                  href={article.link}
                  className="read-more-button"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read more
                </a>
              </div>
            );
          })
        ) : (
          <p>No articles found...</p>
        )}
      </div>
    </div>
  );
};

export default ArticleList;
