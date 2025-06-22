const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected!");
});

app.get('/api/test', (req, res) => {
  res.send("Backend is working!");
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  const query = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving contact");
    } else {
      res.send("Contact saved successfully");
    }
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
