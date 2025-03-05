const express = require("express");
const request = require("request");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

// Root route
app.get("/", (req, res) => {
    res.send("Proxy is running. Use /search?q=your_query to search Google.");
});

// Google Search Proxy
app.get("/search", (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).send("Missing search query.");
    }

    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    
    request(url, (error, response, body) => {
        if (error) {
            return res.status(500).send("Error fetching data.");
        }
        res.send(body);
    });
});

// 🔄 Keep the server awake
const PING_URL = "https://your-proxy-service.onrender.com"; // Replace with your actual Render URL
setInterval(() => {
    request(PING_URL, (error, response) => {
        if (!error && response.statusCode === 200) {
            console.log("Ping successful: Keeping server awake.");
        } else {
            console.log("Ping failed:", error);
        }
    });
}, 300000); // Ping every 5 minutes (300,000ms)

// Start server
app.listen(PORT, () => {
    console.log(`Proxy running on http://localhost:${PORT}`);
});
