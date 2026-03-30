const mongoose = require("mongoose");
const path = require("path");
const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");
const connectedToDB = require("./config/db.js");
const authentify = require("./midlleware/userAuth.middleware.js");
const cookieParser = require("cookie-parser");
const loginRouter = require("./routes/login.route.js");
const logupRouter = require("./routes/logup.route.js");
dotenv.config();
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/logup", logupRouter);
app.use("/login", loginRouter);
// good to go on local system
// const frontendPath =
//   "/home/work/Documents/Backend/testServer/expressServerShayranStyled/frontend";

const frontendPath = path.join(__dirname, "frontend");

app.use(express.static(path.join(frontendPath, "assets")));

app.get("/", authentify, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

async function startServer() {
  try {
    await connectedToDB();
    app.listen(process.env.PORT, () => {
      console.log(`server is running at port : ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("server could start", error);
  }
}

startServer();
