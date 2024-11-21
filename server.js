require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(require("./api/auth").router);

app.use("/playlists", require("./api/playlists"))
app.use("/tracks", require("./api/tracks"))

app.get("/", (req, res) => {
  res.send("Welcome to the Jukebox Pro API!");
});

app.use((req, res, next) => {
  next({ status: 404, message: "Cannot find that endpoint, please re-check your request."});
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.json(err.message || "Something went wrong. Please try again later. If this error persists, please email support.");
});

app.listen(PORT, () => {
  console.log(`Listening on port André ${PORT}...`);
});