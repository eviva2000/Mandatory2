const router = require("express").Router();

const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = require("../models/Users");
router.post("/users/login", async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const users = await User.query()
      .select()
      .where({ username: username })
      .limit(1);
    const user = users[0];
    if (!user) {
      return res.status(404).send({ message: "Wrong username" });
    }

    bcrypt.compare(password, user.password, (error, isSame) => {
      if (error) {
        return res.status(500).send({});
      }
      if (!isSame) {
        return res.status(404).send({});
      } else {
        return res.send({ username: user.username });
      }
    });
  } else {
    return res.send({ message: "Missing username and password" });
  }
});

// users/register

router.post("/users/register", (req, res) => {
  const { username, password, repeatPassword } = req.body;
  if (username && password && repeatPassword && password === repeatPassword) {
    if (password < 8) {
      return res.status(400).send({ response: "Password is too short" });
    } else {
      bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
        if (error) {
          return res.status(500).send({});
        }
        try {
          const existingUser = await User.query()
            .select()
            .limit(1)
            .where({ username: username });
          if (existingUser[0]) {
            return res.send({ response: "User already exist" });
          } else {
            const newUser = await User.query().insert({
              username,
              password: hashedPassword
            });

            return res.send({ response: newUser });
          }
          return res.send({ response: newUser });
        } catch {
          res
            .status(500)
            .send({ response: "Something went wrong with the database" });
        }
      });
    }
  } else {
    res.status(404).send({ response: "Missing fields" });
  }
});

module.exports = router;
