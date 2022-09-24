const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/:id", (req, res) => {
  db.listings
    .findOne({
      where: { name: req.query.name },
      include: [db.listings, db.comments, db.items],
    })
    .then((listings) => {
      res.render("browse/index", { listings: listings });
    })
    .catch((error) => {
      res.status(404).render("home/404");
    });
});

// router.get("/:id", (req, res) => {
//   db.listing.findOne({ id: req.params.id });

// });

module.exports = router;
