const express = require("express");
const request = require("request");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(cors());

app.get("/", (req, res) => {
    res.send("Proxy is running. Use /search?q=your_query to search Google.");
});

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

app.listen(PORT, () => {
    console.log(`Proxy running on http://localhost:${PORT}`);
});
