const express = require("express");
const app = express();
const PORT = 4005;
const cors = require("cors");
const axios = require("axios").default;

app.use(express.json());
app.use(cors());

// * Routing
app.post('/events', (req, res) => {
  const event = req.body;

  axios.post('http://localhost:4000/events', event);
  axios.post('http://localhost:4001/events', event);
  axios.post('http://localhost:4002/events', event);

  res.send({ status: 'OK' });
});


app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Post Service is running on port ${PORT}`);
});
