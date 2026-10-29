const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Node.js API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
  });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
