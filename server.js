const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

// Basic route to check server
app.get("/", (req, res) => {
    res.send("Proxy Server is Running!");
});

// Google Search Proxy Route
app.get("/search", async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).send("Missing search query.");
    }

    const googleSearchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

    try {
        // Adding timeout to prevent it from hanging indefinitely
        const response = await axios.get(googleSearchURL, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout: 10000, // 10 seconds timeout
        });
        res.send(response.data); // Send the search results from Google
    } catch (error) {
        // Log the error for debugging
        console.error("Error fetching Google results:", error.message);
        res.status(500).send("Error fetching Google results.");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
