const express = require('express');
const serverless = require('serverless-http');  // Import the serverless-http package
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// POST API endpoint
app.post('/login', (req, res) => {
    // Get username and password from the request body
    const { username, password } = req.body;

    const adminCred = {
        username: "newton_school",
        password: "12345678",
        isLogged: function(username, password) {
            return this.username === username && this.password === password;
        }
    };

    // Basic validation
    if ((!username || !password) || !adminCred.isLogged(username, password)) {
        return res.status(400).json({ message: 'Username and password are required or incorrect.' });
    }

    return res.json({
        message: 'Login successful',
        username: username, // Just for demonstration, you can remove this in production
    });
});

// Wrap the express app with serverless-http for Vercel compatibility
module.exports = serverless(app);  // Export the serverless handler
