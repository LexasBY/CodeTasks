const express = require("express");
const { nanoid } = require("nanoid");

const app = express();
app.use(express.json());

const urlMap = new Map(); // shortId → originalUrl

// 🔗 POST /shorten — создать короткую ссылку
app.post("/shorten", (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  const shortId = nanoid(6); // например: 'abc123'
  urlMap.set(shortId, url);

  res.json({ shortUrl: `http://localhost:3000/${shortId}` });
});

// 📎 GET /:shortId — редирект по короткой ссылке
app.get("/:shortId", (req, res) => {
  const { shortId } = req.params;
  const originalUrl = urlMap.get(shortId);

  if (!originalUrl) return res.status(404).json({ error: "Not found" });

  res.redirect(originalUrl);
});

// 🚀 Старт сервера
app.listen(3000, () => {
  console.log("URL Shortener running at http://localhost:3000");
});