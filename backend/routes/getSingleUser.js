const router = require("express").Router();
const User = require("../models/Users");

router.get("/members/:id", async (req, res) => {
  //  Solving cors issue Let the system differnet ports talk to eachother
  // res.header("Access-Control-Allow-Origin", "*");

  // console.log(req.params.id);
  try {
    const myId = req.params.id;
    const user = await User.query().select().where({ id: myId });

    if (!user) {
      res.status(404).send({ message: "Can not get user" });
    }
    // console.log(user);

    res.send({ user });
  } catch {
    res
      .status(500)
      .send({ response: "Something went wrong with the database" });
  }
});
module.exports = router;
