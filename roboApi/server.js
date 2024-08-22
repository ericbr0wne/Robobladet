const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000; 
const mysql = require('mysql2'); 

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'robobladet_db'
});



app.get("/api/articles", (req, res) => {
  const { topic, sortBy, search } = req.query;

  let query = 'SELECT * FROM news'; 
  let values = []; 

  if (topic) {
    query += ' WHERE topic = ?';
    values.push(topic);
  }

  if (search) {
    const searchTerm = search.toLowerCase();
    query += topic ? ' AND (' : ' WHERE ('; 
    query += ' LOWER(title) LIKE ? OR LOWER(summary) LIKE ?)';
    values.push(`%${searchTerm}%`, `%${searchTerm}%`); 
  }

  if (sortBy === "newest") {
    query += ' ORDER BY published DESC';
  } else if (sortBy === "oldest") {
    query += ' ORDER BY published ASC';
  }

  connection.query(query, values, (err, results) => { 
    if (err) {
      console.error('Error fetching articles:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results); 
    }
  });
});

app.listen(port, () => {
  console.log(`Backend API running at http://localhost:${port}`);
});