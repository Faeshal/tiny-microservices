const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

// * Hold Data
const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];

    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res, next) => {
  try {
    const { type, data } = req.body;
    handleEvent(type, data);

    console.log(posts);
    res.send({});
  } catch (err) {
    next(err);
  }
});

app.listen(4002, async () => {
  console.log("Listening on 4002");
  const res = await axios.get("http://localhost:4005/events");
  const datas = res.data;
  for (data of datas) {
    const { type, data } = data;
    console.log("event:", type);
    handleEvent(type, data);
  }
});
