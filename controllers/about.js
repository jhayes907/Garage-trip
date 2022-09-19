const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("dev/about");
});

module.exports = router;
