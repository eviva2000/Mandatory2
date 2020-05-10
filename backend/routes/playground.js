const router = require("express").Router();

// custom middleware that prints out a timestamp
// router.use((req, res, next) => {
//   console.log("Timestamp", new Date());
//   next();
//   //res.redirect("/secondpath");
//   //return res.send({ response: "first path" });
// });

router.get("/secondpath", (req, res) => {
  console.log("Hit the second path");
  return res.send({ response: "second path" });
});
router.get("/setsessionvalue", (req, res) => {
  console.log(req.query.sessionvalue);
  req.session.sessionvalue = req.query.sessionvalue;
  console.log("req", req.session);
  return res.send({ response: "ok" });
});

router.get("/getsessionvalue", (req, res) => {
  return res.send({ response: req.session.sessionvalue });
});

module.exports = router;
