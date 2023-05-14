const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("user");

const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log("signup requested");
  const { username, email, password } = req.body;

  const user = new User({
    username,
    email,
    password,
  });
  try {
    await user.save();
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (err) {
    console.log(err);
    res.status(422).send(err.message);
  }
});

router.post("/signin", async (req, res) => {
  console.log("signin request");
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "Must provide username and password." });
  }

  const user = await User.findOne({ email });
  console.log("finding user by email", user);
  if (!user) {
    return res.status(422).send({ error: "Invalid email or password." });
  }
  try {
    console.log("comparing passwords");
    await user.comparePassword(password);

    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "Invalid email or password." });
  }
});
module.exports = router;
