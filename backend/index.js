const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
// This makes the 'schoolImages' folder publicly accessible
app.use('/schoolImages', express.static(path.join(__dirname, 'schoolImages')));

// Configure multer to store uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'schoolImages/'); // Save images in this folder
  },
  filename: function (req, file, cb) {
    // Create a unique filename to avoid overwrites
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({ storage: storage });

// Create MySQL connection pool
// !!! CHANGE THE PASSWORD TO YOUR MYSQL PASSWORD !!!
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin123@', // <-- EDIT THIS
  database: 'school_db'
});

// Check if connection to MySQL is successful
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
  } else {
    console.log('✅ Connected to MySQL database!');
    connection.release();
  }
});

// API ROUTES

// 1. GET ALL SCHOOLS
app.get('/api/schools', (req, res) => {
  const sql = 'SELECT id, name, address, city, image FROM schools';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to fetch schools.' });
    }
    res.json(results);
  });
});

// 2. ADD A NEW SCHOOL
app.post('/api/schools', upload.single('image'), (req, res) => {
  // Check if an image was uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload a school image.' });
  }

  // Get data from the form
  const { name, address, city, state, contact, email_id } = req.body;
  // Get the filename of the uploaded image
  const image = req.file.filename;

  const sql = `INSERT INTO schools (name, address, city, state, contact, image, email_id) 
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [name, address, city, state, contact, image, email_id];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to add school to database.' });
    }
    res.status(201).json({ message: 'School added successfully!' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Backend server running on http://localhost:${port}`);
});