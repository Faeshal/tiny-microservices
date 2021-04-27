const express = require("express");
const app = express();
const PORT = 4005;
const cors = require("cors");
const axios = require("axios").default;

app.use(express.json());
app.use(cors());

// * Routing
app.post("/api/events", async (req, res, next) => {
  try {
    const { event } = req.body;

    await axios.post("http://localhost:4000/events", event);
    await axios.post("http://localhost:4001/events", event);
    await axios.post("http://localhost:4002/events", event);

    res.status(200).json({ success: true, data: "ok" });
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
