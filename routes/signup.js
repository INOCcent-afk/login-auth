const express = require("express");
const User = require("../models/Users");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("signup");
});

router.post("/", (req, res) => {
  const user = new User({
    username: req.body.user.username,
    password: req.body.user.password,
  });

  user.save((err) => {
    if (err) {
      res.status(500).json({ msg: "Sorry, internal server errors" });
      return;
    }
    return res.redirect("/");
  });
});

module.exports = router;
