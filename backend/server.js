const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

// Simulated user database (replace with actual database)
const users = [];

// Secret key for JWT
const secretKey = 'your-secret-key';

// Middleware to verify the token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      req.userId = decoded.userId;
      next();
    });
  };
  
  app.get('/api/user-data', verifyToken, (req, res) => {
    try {
      const userId = req.userId;
      // Retrieve user-specific data based on the userId from your database or data source
      const userData = {
        selectedVendors: getUserSelectedVendors(userId),
        totalSpend: getUserTotalSpend(userId),
        guests: getUserGuests(userId),
      };
      res.json(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
// Signup endpoint
app.post('/api/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Check if the username or email already exists
  if (users.find(user => user.username === username || user.email === email)) {
    return res.status(400).json({ error: 'Username or email already exists' });
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Create a new user object
  const newUser = {
    id: Date.now().toString(),
    username,
    email,
    password: hashedPassword,
  };

    try {
        // Add the new user to the database
        users.push(newUser);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
  
    // Find the user by username
    const user = users.find(user => user.username === username);
  
    // Check if the user exists and the password is correct
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  
    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, secretKey);
  
    res.json({ token });
  });

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});