const express = require("express");
const router = express.Router();
const db = require("../models");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/:id/listing", (req, res) => {
  db.listing
    .findOne({
      where: { name: req.params.name },
      include: [db.listingId, db.listing, db.item, db.comment],
    })
    .then((listings) => {
      res.render("/listing", { listings: listings });
    })
    .catch((error) => {
      res.status(404).render("home/404");
    });
});

router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new");
});

router.get("/:id/edit", (req, res) => {
  res.render("listings/edit");
})


// router.delete("/:id/", isLoggedIn, (req, res) => {
//  db.listing
//   .findOne ({
//     where: { id: req.params.id },
//   })
//   .then((listing) => {
//   })
//   .catch((error) => {
//     res.status(404).render("home/404");
//   })
// });

module.exports = router;
