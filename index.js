const express = require('express');
const serverless = require('serverless-http');  // Import the serverless-http package
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// POST API endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const adminCred = {
        username: "newton_school",
        password: "12345678",
        isLogged: function(username, password) {
            return this.username === username && this.password === password;
        }
    };

    if ((!username || !password) || !adminCred.isLogged(username, password)) {
        return res.status(400).json({ message: 'Username and password are required or incorrect.' });
    }

    return res.json({
        message: 'Login successful',
        username: username, // Just for demonstration, you can remove this in production
    });
});

// Default route for undefined endpoints
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

// Wrap the express app with serverless-http for Vercel compatibility
module.exports = serverless(app);  // Export the serverless handler
