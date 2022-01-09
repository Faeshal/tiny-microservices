const express = require("express");
const cors = require("cors");
const axios = require("axios").default;

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
  console.log("query service:", posts);
  res.send(posts);
});

app.post("/events", (req, res, next) => {
  try {
    const { type, data } = req.body;
    console.log("query service - event:", req.body);
    handleEvent(type, data);

    console.log(posts);
    res.send({});
  } catch (err) {
    next(err);
  }
});

const startup = async () => {
  try {
    const res = await axios.get("http://event-bus-srv:4005/events");

    for (let event of res.data) {
      console.log("Processing event:", event.type);

      handleEvent(event.type, event.data);
    }
  } catch (err) {
    console.log(err);
  }

  app.listen(4002, async () => {
    console.log("Listening on 4002");
  });
};
startup();
