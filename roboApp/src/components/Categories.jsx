import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Categories.css";

function Categories() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/topics");
        if (!response.ok) {
          throw new Error("Failed to fetch topics");
        }
        const data = await response.json();
        setTopics(data.map((item) => item.topic));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {topics.length > 0 ? (
          topics.map((topic) => (
            <li key={topic} className="category-item">
              <Link to={`/articles?topic=${topic}`} className="category-link">
                {topic}
              </Link>
            </li>
          ))
        ) : (
          <p>No categories found</p>
        )}
      </ul>
    </div>
  );
}

export default Categories;
