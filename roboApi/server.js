const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "robobladet_db",
});

app.get("/api/articles", (req, res) => {
  const { topic, sortBy, search } = req.query;

  let query = "SELECT * FROM articles";
  let values = [];

  if (topic) {
    query += " WHERE topic = ?";
    values.push(topic);
  }

  if (search) {
    const searchTerm = search.toLowerCase();
    query += topic ? " AND (" : " WHERE (";
    query += " LOWER(title) LIKE ? OR LOWER(summary) LIKE ?)";
    values.push(`%${searchTerm}%`, `%${searchTerm}%`);
  }

  if (sortBy === "newest") {
    query += " ORDER BY published DESC";
  } else if (sortBy === "oldest") {
    query += " ORDER BY published ASC";
  }

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error fetching articles:", err);
      return res.status(500).send("Internal Server Error");
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Backend API running at http://localhost:${port}`);
});
