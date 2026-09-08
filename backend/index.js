const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  }),
);
app.get("/", (req, res) => {
  return res.json({
    message: "connection success ✔",
  });
});
app.get("/test-route", (req, res) => {
  return res.json({
    message: "Test route",
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});

