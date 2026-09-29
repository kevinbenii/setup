const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello World from the K-AI server!</h1>");
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello World", project: "K-AI" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
