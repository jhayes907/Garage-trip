const express = require("express");
const router = express.Router();
const db = require("../models");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", isLoggedIn, (req, res) => {
  db.users
    .findOne({
      include: [db.comments, db.listings],
      where: { id: req.users.id },
      limit: 5,
      order: [["updatedAt", "DESC"]],
    })
    .then((user) => {
      if (!user) throw Error();
      res.render("profile/index", {
        id: users.id,
        name: users.name,
        email: users.email,
        location: users.location,
        listings: users.listings,
        tags: users.tags,
      });
    })
    .catch((error) => {
      res.status(400).render("home/404");
    });
});

router.get("/listings/:id", isLoggedIn, (req, res) => {
  db.listings
    .findOne({
      include: [db.comments],
      where: { id: req.params.id },
    })
    .then((listing) => {
      if (!listing) throw Error();
      res.render("listings/listing", {
        listing: listing,
      });
    })
    .catch((error) => {
      res.status(400).render("home/404");
    });
});

router.get("/listings/:id/edit", isLoggedIn, (req, res) => {
  db.listings
    .findOne({
      include: [db.comments, db.item],
      where: { id: req.params.id },
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
