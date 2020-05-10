const router = require("express").Router();
const User = require("../models/Users");

router.get("/members", async (req, res) => {
  //  Solving cors issue Let the system differnet ports talk to eachother
  res.header("Access-Control-Allow-Origin", "*");
  try {
    // if(request.session.loggedin){}
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
