require("dotenv").config();
const express = require("express");
const path = require("path");
const morgan = require("morgan");

const app = express();

const APIRouter = require("./API/index");

app.use("/", express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));

app.use("/src", APIRouter);
app.get("/api/v1", (req, res) => {
  res.json({
    project: "Vite/React and Express Global Keebs",
    from: "IanDab47",
  });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`You have entered financial 💲 discomfort on port ${PORT}`);
});
