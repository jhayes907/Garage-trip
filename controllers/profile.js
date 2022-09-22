const express = require("express");
const router = express.Router();
const db = require("../models");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", isLoggedIn, (req, res) => {
  db.user
    .findOne({
      include: [db.comments, db.listing],
      where: { id: req.user.id },
      limit: 5,
      order: [["updatedAt", "DESC"]],
    })
    .then((user) => {
      if (!user) throw Error();
      res.render("profile/index", {
        id: user.id,
        name: user.name,
        email: user.email,
        listings: user.listings,
        tags: user.tags,
      });
    })
    .catch((error) => {
      res.status(400).render("home/404");
    });
});

router.get("/listing/:id", isLoggedIn, (req, res) => {
  db.listing
    .findOne({
      include: [db.comments],
      where: { id: req.params.id },
    })
    .then((listing) => {
      if (!listing) throw Error();
      res.render("profile/listings/listing", {
        listing: listing,
      });
    })
    .catch((error) => {
      res.status(400).render("home/404");
    });
});

router.get("/listing/:id/edit", isLoggedIn, (req, res) => {
  db.listing
    .findOne({
      include: [db.comments],
      where: { id: req.params.id },
    })
    .then((listing) => {
      if (!listing) throw Error();
      res.render("profile/listings/edit", {
        listing: listing,
      });
    })
    .catch((error) => {
      res.status(400).render("home/404");
    });
});

router.get("/listing/new", isLoggedIn, (req, res) => {
  res.render("/listings/new");
});

router.post("/profile/:id/edit", isLoggedIn, (req, res) => {
  res.render("profile/edit", {
    editProfile: {
      user,
    },
  });
});

module.exports = router;
