const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const router = express.Router();
const user = require("../models/user.model.js");

// good to go on local system
// const frontendPath =
//   "/home/work/Documents/Backend/testServer/expressServerShayranStyled/frontend";

const frontendPath = path.join(__dirname, "../frontend");

router.post("/", async (req, res) => {
  try {
    // log this if you need
    // console.log(req.body);
    const { email, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUSer = new user({
      email,
      username,
      password: hashedPassword,
    });
    await newUSer.save();
    // return res
    //   .status(201)
    //   .send("User registered successfully and saved to Atlas!");
    res.status(201).redirect("/login");
  } catch (error) {
    res.status(500).send("Error saving user: " + error.message);
  }
});

router.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "logup.html"));
});

module.exports = router;
