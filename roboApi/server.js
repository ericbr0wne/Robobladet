const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000; 
const mysql = require('mysql2'); 
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');

const USERS_FILE = './users.json';

app.use(cors());
app.use(express.json());

// Helper function to read users from a file
const readUsersFromFile = () => {
  try {
    const usersData = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(usersData);
  } catch (error) {
    return [];
  }
};

// Helper function to write users to a file
const writeUsersToFile = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Register Route
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  let users = readUsersFromFile();
  const userExists = users.find(user => user.username === username);

  if (userExists) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  users.push({ username, password: hashedPassword });
  writeUsersToFile(users);

  res.status(201).json({ message: 'User registered successfully!' });
});

// Login Route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  let users = readUsersFromFile();
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });
  res.json({ token });
});

// Protected Route Example
app.get('/api/protected', expressJwt({ secret: 'your_jwt_secret', algorithms: ['HS256'] }), (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

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