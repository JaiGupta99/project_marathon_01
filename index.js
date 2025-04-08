// index.js
const express = require('express');
const app = express();
const serverless = require('serverless-http');

// Middleware to parse JSON bodies
app.use(express.json());

// POST API endpoint
app.post('/login', (req, res) => {
    // Get username and password from the request body
    const { username, password } = req.body;
    const adminCred = {
        username: "newton_school",
        password: "12345678",
        isLogged: function(username, password){
            return this.username===username && this.password===password
        }
    }
   
    // Basic validation
    if ((!username || !password) || !adminCred.isLogged(username, password)) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Here, you can add additional logic like checking the username and password
    // against a database or other services. For now, we will just return a success message.

    return res.json({
        message: 'Login successful',
        username: username, // Just for demonstration, you can remove this in production
    });
});

// Define the port
const port = process.env.PORT || 3000;
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
module.exports.handler = serverless(app);
