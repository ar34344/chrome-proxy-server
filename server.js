const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

// ✅ Root route (to check if the server is online)
app.get("/", (req, res) => {
    res.send("✅ Proxy Server is Running!");
});

// ✅ Google Search Proxy Route
app.get("/search", async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: "Missing search query." });
    }

    const googleSearchURL = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

    try {
        const response = await axios.get(googleSearchURL, {
            headers: { "User-Agent": "Mozilla/5.0" },
            timeout: 10000, // 10-second timeout
        });
        res.send(response.data);
    } catch (error) {
        console.error("❌ Error fetching Google results:", error.message);
        res.status(500).json({ error: "Failed to fetch Google results." });
    }
});

// ✅ Keep the Server Awake (pings itself every 5 minutes)
const PING_URL = "https://chrome-proxy-server.onrender.com"; // Replace with your Render URL
setInterval(() => {
    axios.get(PING_URL).then(() => {
        console.log("✅ Ping successful: Keeping server awake.");
    }).catch(() => {
        console.log("⚠️ Ping failed.");
    });
}, 300000); // Ping every 5 minutes (300,000ms)

// ✅ Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
