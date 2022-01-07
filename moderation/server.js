const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log("moderation service reveiving:", req.body);
  if (type === "CommentCreated") {
    const status = data.content.includes("fuck") ? "rejected" : "approved";
    console.log("status nih:", status);
    await axios
      .post("http://event-bus-srv:4005/events", {
        type: "CommentModerated",
        data: {
          id: data.id,
          postId: data.postId,
          content: data.content,
          status,
        },
      })
      .catch((err) => {
        console.log(err);
      });
  }
  res.send({});
});

app.listen(4003, () => {
  console.log("Listening on 4003");
});
