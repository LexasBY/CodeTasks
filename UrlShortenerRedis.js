const express = require("express");
const { nanoid } = require("nanoid");
const Redis = require("ioredis");

const app = express();
const redis = new Redis(); // подключение к localhost:6379

app.use(express.json());

// POST /shorten — создать короткую ссылку
app.post("/shorten", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  const shortId = nanoid(6);

  await redis.set(shortId, url); // сохраняем пару shortId → url

  res.json({ shortUrl: `http://localhost:3000/${shortId}` });
});

// GET /:shortId — редирект
app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;
  const originalUrl = await redis.get(shortId);

  if (!originalUrl) return res.status(404).json({ error: "Not found" });

  res.redirect(originalUrl);
});

// Старт
app.listen(3000, () => {
  console.log("Redis-powered URL shortener running on http://localhost:3000");
});