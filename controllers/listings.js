const express = require("express");
const router = express.Router();
const db = require("../models");
const isLoggedIn = require("../middleware/isLoggedIn");

// Get routes
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new");
});

router.get("/:id/edit", isLoggedIn, (req, res) => {
  db.listing
    .findOne({
      where: { id: parseInt(req.params.id) },
    })
    .then((listing) => {
      res.render("listings/edit", { listing: listing });
    })
    .catch((error) => {
      res.status(404).render("404");
    });
});

// router.get("/myListings", isLoggedIn, (req, res) => {
//   res.render("listings/myListings");
// });

router.get("/myListings", isLoggedIn, (req, res) => {
  db.listing
    .findAll({
      where: { userId: req.user.id },
      include: [db.item, db.comment],
    })
    .then((listings) => {
      if (!listings) throw Error();
      res.render("listings/myListings", { listings: listings });
    })
    .catch((err) => {
      res.render("404");
    });
});

router.get("/:id", (req, res) => {
  db.listing
    .findOne({
      where: { id: parseInt(req.params.id) },
      include: [db.item, db.comment],
    })
    .then((listings) => {
      res.render("listings/show", { listings: listings });
    })
    .catch((error) => {
      res.status(404).render("404");
    });
});

router.put("/:id/edit", isLoggedIn, async (req, res) => {
  try {
    const foundListing = await db.listing.findOne({
      where: { id: req.body.id },
    });
    if (foundListing.name && foundListing.id !== req.listing.id) {
      req.flash("error", "Cannot edit this listing.");
      res.redirect("/listings/myListings");
    } else {
      const listingUpdated = await db.listing.update(
        {
          name: req.body.name,
          location: req.body.location,
          tags: req.body.tags,
          content: req.body.content,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      console.log("********** PUT ROUTE *************");
      console.log("Listing updated", listingUpdated);
      console.log("**************************************************");

      // redirect back to the profile page
      res.redirect("/listings/mylistings"); // route
    }
  } catch (error) {
    console.log("*********************ERROR***********************");
    console.log(error);
    console.log("**************************************************");
    res.render("listings/edit");
  }
});

// Post routes for New Listing, and Edit Listing
router.post("/new", isLoggedIn, (req, res) => {
  db.listing
    .create(
      {
        userId: req.user.id,
        name: req.body.name,
        location: req.body.location,
        tags: req.body.tags,
        content: req.body.content,
      },
      {
        where: { id: req.user.id },
      }
    )
    .then(() => {
      res.redirect("/profile");
    })
    .catch((err) => {
      console.log("error", error);
    });
});

router.delete("/:id/myListings", isLoggedIn, async (req, res) => {
  try {
    let deleteMylistings = await db.listing.destroy({
      where: { id: req.params.id },
    });
    res.redirect("/listings/myListings");
  } catch (error) {
    console.log("*********************ERROR***********************");
    console.log(error);
    console.log("**************************************************");
    res.render("...");
  }
});
module.exports = router;
