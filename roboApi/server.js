require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const port = 3000;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { predictTopic } = require("./predictorAI");

app.use(cors());
app.use(express.json());

// Set up MySQL database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
  console.log("Connected to the database");
});

// Register Route
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Användarnamn och lösenord krävs" });
  }

  // Check if the user already exists
  const checkUserQuery = "SELECT * FROM users WHERE username = ?";
  db.query(checkUserQuery, [username], (err, results) => {
    if (err) {
      console.error("Error checking user existence:", err);
      return res.status(500).json({ message: "Serverfel" });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Användarnamn finns redan" });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Insert the new user into the database
    const insertUserQuery = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(insertUserQuery, [username, hashedPassword], (err, result) => {
      if (err) {
        console.error("Error inserting user:", err);
        return res.status(500).json({ message: "Serverfel" });
      }
      res.status(201).json({ message: "Användare skapades utan problem!" });
    });
  });
});

// Login Route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Användarnamn och lösenord krävs" });
  }

  // Retrieve user from the database
  const getUserQuery = "SELECT * FROM users WHERE username = ?";
  db.query(getUserQuery, [username], (err, results) => {
    if (err) {
      console.error("Error retrieving user:", err);
      return res.status(500).json({ message: "Serverfel" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Användare hittas ej" });
    }

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Ogiltiga användaruppgifter" });
    }

    // Generate JWT token
    const token = jwt.sign({ username }, "your_jwt_secret", { expiresIn: "1h" });
    res.json({ token });
  });
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

app.get("/api/topics", (req, res) => {
  db.query("SELECT DISTINCT topic FROM articles", (err, results) => {
    if (err) {
      console.error("Error fetching topics:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.json(results);
  });
});

app.post("/api/predictTopic", async (req, res) => {
  const { summary } = req.body;

  if (!summary) {
    return res.status(400).json({ message: "No summary entered" });
  }

  try {
    const predictedLabel = await predictTopic(summary);
    res.json({ topic: predictedLabel });
  } catch (error) {
    console.error("Error predicting topic:", error);
    res.status(500).json({ message: "Error predicting topic" });
  }
});

app.listen(port, () => {
  console.log(`Backend API running at http://localhost:${port}`);
});
