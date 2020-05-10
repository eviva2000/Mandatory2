const router = require("express").Router();
const User = require("../models/Users");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();
router.post("/resetpassword", async (req, res) => {
  const { email } = req.body;
  if (email === "") {
    res.status(400).send("email required");
  }
  const users = await User.query().select().where({ email: email }).limit(1);
  const user = users[0];
  if (!user) {
    return res.status(404).send({ message: "Email is not in DB" });
  }
  const token = crypto.randomBytes(20).toString("hex");
  user.update({
    resetpasswordtoken: token,
  });
  // console.log("Hi", user);

  res.send({ email });
});
module.exports = router;
