const router = require("express").Router();
const { addPage } = require("../views");

router.get("/", (req, res, next) => {
  res.send("got to GET /wiki/");
});

router.post("/", (req, res, next) => {
  res.send(req.body);
});

router.get("/add", (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
