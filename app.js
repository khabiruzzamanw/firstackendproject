const mongoose = require("mongoose");
const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");
// const { log, timeLog } = require("console");

dotenv.config();

const app = express();

app.use(express.static("frontend"));

app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/file", (req, res) => {
  res.sendFile("index.html");
});

app.listen(process.env.PORT, () => {
  console.log(`server is running at port : ${process.env.PORT}`);
});
