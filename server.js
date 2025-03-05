const express = require("express");
const request = require("request");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

// Basic test route
app.get("/", (req, res) => {
    res.send("Proxy Server is Running!");
});

// Google Search Proxy route
app.get("/search", (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).send("Missing search query.");
    }

    // Construct the URL to Google search
    const googleSearchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

    // Send a request to Google
    request(googleSearchURL, (error, response, body) => {
        if (error) {
            return res.status(500).send("Error fetching Google results.");
        }
        res.send(body); // Send the HTML response back to the user
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
