const express = require("express");
const router = express.Router();
const db = require("../models");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", isLoggedIn, (req, res) => {
  db.user
    .findOne({
      include: [db.comments, db.listing],
      where: { id: req.user.id },
    })
    .then((user) => {
      if (!user) throw Error();
      res.render("profile/index", {
        id: user.id,
        name: user.name,
        email: user.email,
        listings: user.listings,
      });
    })
    .catch((error) => {
      res.status(400).render("main/404");
    });
});

router.get("/edit", (req, res) => {});

module.exports = router;
