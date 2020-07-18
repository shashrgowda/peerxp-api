const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const auth = require("../middleware/auth");

router.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.authToken();
    res.send({ user: user.getPublicProfile(), token });
  } catch (error) {
    res.status(400).send();
  }
});

router.post("/logout", async (req, res) => {
  try {
    const user = await User.findById(req.body._id);

    user.tokens = user.tokens.filter((token) => {
      return token.token !== req.body.token;
    });

    await user.save();

    console.log(user);

    res.send({ success: "Logged out." });
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
