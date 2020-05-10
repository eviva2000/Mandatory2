const router = require("express").Router();

router.get("/", async (req, res) => {
  if (req.session.id) {
    const { userId } = req.session;
    console.log("  from home", req.session);
    res.send({ res: userId, loggedIn: true });
  } else {
    res.send({ loggedIn: false });
  }
});
module.exports = router;
