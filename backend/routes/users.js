const router = require("express").Router();

const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = require("../models/Users");

const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    next();
  }
};

//home ###############################

router.get("/", async (req, res) => {
  const { userId, username } = req.session;
  if (req.session.id && username) {
    const users = await User.query().select().where({ username: username });
    const user = users[0];
    console.log("  from home", user);
    res.send(user);
  } else {
    res.send({ isAuthenticated: false });
  }
});

//users/login ###############################
router.post("/users/login", async (req, res) => {
  const { username, password, id } = req.body;
  if (username && password) {
    const users = await User.query()
      .select()
      .where({ username: username })
      .limit(1);
    const user = users[0];

    if (!user) {
      return res.status(404).send({ message: "Wrong username" });
    }

    // console.log("sessionID from login", req.session.id);
    bcrypt.compare(password, user.password, (error, isSame) => {
      if (error) {
        return res.status(500).send({});
      }
      if (!isSame) {
        return res.status(404).send({ message: "" });
      } else {
        req.session.userId = user.id;
        req.session.username = username;
        console.log(req.session);
        return res.status(200).send(user);
      }
    });
  } else {
    return res.status(404).send({ message: "Missing username and password" });
  }
});

// users/register #############################

router.post("/users/register", (req, res) => {
  const { username, password, repeatPassword, passion, age, email } = req.body;
  if (
    username &&
    password &&
    repeatPassword &&
    password === repeatPassword &&
    passion &&
    age &&
    email
  ) {
    if (password.length < 8) {
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
              //Adding new user to database
              username,
              password: hashedPassword,
              passion,
              age,
              email,
            });
            return res
              .status(200)
              .send({ response: newUser, "user id": req.session.userId });
          }
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

//users/logout ###############################
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("sid");
  });
});

///Getting all users
router.get("/members", async (req, res) => {
  try {
    const users = await User.query().select();
    if (!users) {
      res.status(404).send({ message: "Can not get users" });
    }

    res.send({ users });
  } catch {
    res
      .status(500)
      .send({ response: "Something went wrong with the database" });
  }
});

module.exports = router;
