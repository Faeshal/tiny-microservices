const express = require("express");
const app = express();
const PORT = 1000;
const cors = require("cors");
const { randomBytes } = require("crypto");

app.use(express.json());
app.use(cors());

// * For Holding Data
const post = {};

// * Routing
app.get("/api/posts", (req, res) => {
  res.json({ success: true, data: post });
});

app.post("/api/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  post[id] = {
    id,
    title,
  };

  res.status(201).json({ success: true, data: req.body });
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Post Service is running on port ${PORT}`);
});
