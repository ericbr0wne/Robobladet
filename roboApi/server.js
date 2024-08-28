require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const port = 3000;
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users_file = "./users.json";

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Users saves in a local file, temporary fix
const writeUsersToFile = (users) => {
  fs.writeFileSync(users_file, JSON.stringify(users, null, 2));
};

// Read users from the local file
const readUsersFromFile = () => {
  try {
    const usersData = fs.readFileSync(users_file, "utf-8");
    return JSON.parse(usersData);
  } catch (error) {
    return [];
  }
};

// Register Route
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Användarnamn och lösenord krävs" });
  }

  let users = readUsersFromFile();
  const userExists = users.find((user) => user.username === username);

  if (userExists) {
    return res.status(400).json({ message: "Användarnamn finns redan" });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  users.push({ username, password: hashedPassword });
  writeUsersToFile(users);

  res.status(201).json({ message: "Användare skapades utan problem!" });
});

// Login Route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  let users = readUsersFromFile();
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(400).json({ message: "Användare hittas ej" });
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Ogiltiga användaruppgifter" });
  }
  const token = jwt.sign({ username }, "your_jwt_secret", { expiresIn: "1h" });
  res.json({ token });
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
