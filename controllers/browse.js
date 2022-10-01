const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", (req, res) => {
  db.listing
    .findAll()
    .then((listings) => {
      res.render("browse/index", { listings: listings });
    })
    .catch((error) => {
      res.status(404).render("404");
    });
});

module.exports = router;
