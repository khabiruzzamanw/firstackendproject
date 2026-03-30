const express = require("express");
const path = require("path");
const router = express.Router();
const jsonwebtoken = require("jsonwebtoken");
const user = require("../models/user.model.js");

const frontendPath =
  "/home/work/Documents/Backend/testServer/expressServerShayranStyled/frontend";

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    const foundUser = await user.findOne({ email });

    if (!foundUser) {
      return res.send("email or password is incorrect");
    }
    if (foundUser.password !== password) {
      return res.send("email or password is incorrect");
    }

    const token = jsonwebtoken.sign(
      {
        id: foundUser._id,
        username: foundUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, { httpOnly: true });

    // return res.send(`${foundUser.email} is logged in`);
    return res.redirect("/");
  } catch (error) {
    return res.status(500).send("Error logging in: " + error.message);
  }
});

router.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "login.html"));
});

module.exports = router;
