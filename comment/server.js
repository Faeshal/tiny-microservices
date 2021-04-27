const express = require("express");
const app = express();
const PORT = 4001;
const cors = require("cors");
const { randomBytes } = require("crypto");
const { default: axios } = require("axios");

app.use(express.json());
app.use(cors());

// * For Holding Data
const commentByPostId = {};

// * Routing
app.get("/api/posts/:id/comments", (req, res) => {
  res
    .status(200)
    .json({ success: true, data: commentByPostId[req.params.id] || [] });
});

app.post("/api/posts/:id/comments", async (req, res, next) => {
  try {
    const commentId = randomBytes(4).toString("hex");
    const { content } = req.body;

    const comments = commentByPostId[req.params.id] || [];

    comments.push({ id: commentId, content });

    commentByPostId[req.params.id] = comments;

    await axios.post("http://localhost:4005/events", {
      type: "commentCreated",
      data: {
        id: commentId,
        content,
        postId: req.params.id,
      },
    });

    res.status(201).json({ success: true, data: comments });
  } catch (err) {
    next(err);
  }
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Comment Service is running on port ${PORT}`);
});
