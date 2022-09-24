const express = require("express");
const router = express.Router();
const db = require("../models");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", isLoggedIn, (req, res) => {
  db.user
    .findOne({
      where: { id: req.user.id },
      include: [db.comment, db.listing],
    })
    .then((user) => {
      if (!user) throw Error();
      res.render("profile/index", {
        user,
      });
    })
    .catch((error) => {
      res.status(400).render("home/404");
    });
});

router.get("/listings/:id", isLoggedIn, (req, res) => {
  db.listing
    .findOne({
      include: [db.comment, db.item],
      where: { id: req.params.id },
    })
    .then((listing) => {
      if (!listing) throw Error();
      res.render("listings/listing", {
        listings: listings,
      });
    })
    .catch((error) => {
      res.status(400).render("home/404");
    });
});

router.get("/listings/:id/edit", isLoggedIn, (req, res) => {
  db.listing
    .findOne({
      include: [db.comment, db.item],
      where: { id: req.params.name },
    })
    .then((listings) => {
      if (!listings) throw Error();
      res.render("listings/edit", {
        listings: listings,
      });
    })
    .catch((error) => {
      res.status(400).render("home/404");
    });
});

router.get("/mail", isLoggedIn, (req, res) => {
  res.render("/mail");
});

router.get("/listings/new", isLoggedIn, (req, res) => {
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
