const express = require("express");
const app = express();
const PORT = 4000;
const cors = require("cors");
const { randomBytes } = require("crypto");
const axios = require("axios").default;

app.use(express.json());
app.use(cors());

// * For Holding Data
const post = {};

// * Routing
app.get("/api/posts", (req, res) => {
  res.json({ success: true, data: post });
});

app.post("/api/posts", async (req, res, next) => {
  try {
    const id = randomBytes(4).toString("hex");
    const { title } = req.body;

    post[id] = {
      id,
      title,
    };

    // * Send to Event Bus
    await axios.post("http://localhost:4005/events", {
      type: "postCreated",
      data: { id, title },
    });

    res.status(201).json({ success: true, data: req.body });
  } catch (err) {
    next(err);
  }
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Post Service is running on port ${PORT}`);
});
