const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Wordl!");
});

app.listen(8000);
