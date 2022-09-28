const express = require("express");
const router = express.Router();
const db = require("../models");
const isLoggedIn = require("../middleware/isLoggedIn");


// Get routes 
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new");
});

router.get("/:id/edit", isLoggedIn, (req, res) => {
  res.render("listings/edit");
});


router.get("/myListings", isLoggedIn, (req, res) => {
  res.render("listings/myListings");
});

router.get("/:id/delete", isLoggedIn, (req, res) => {
  res.render("listing/delete");
});

router.get("/:id/show", (req, res) => {
  db.listing
    .findOne({
      where: { name: req.params.id },
      include: [db.listing, db.item, db.comment],
    })
    .then((listings) => {
      res.render("listings/show", { listings: listings });
    })
    .catch((error) => {
      res.status(404).render("home/404");
    });
});

// Put routes
router.put("/edit", isLoggedIn, (req, res) => {
db.listing
.update(
  {
    name: req.body.name,
    location: req.body.location,
    tags: req.body.tags,
    content: req.body.content,
  },
  {
    where: { id: req.listing.id },
  }
  )
  .then((req, res) => {
    res.redirect("/myListings");
  })
  .catch((error) => {
    res.status(400).render("home/404");
  });
});

// Post routes for New Listing, and Edit Listing
router.post("/new", isLoggedIn, (req, res) => {
  db.listing
    .create(
      {
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

router.post("/listings/:id/edit", isLoggedIn, (req, res) => {
  res.render("listings/edit", {
    editListing: {
      listing,
    },
  });
});

// Delete a listing
router.post("/:id/delete", isLoggedIn, (req, res) => {
  db.listing
  .delete({
      name: req.body.name,
      location: req.body.location,
      email: req.body.email,
  },{ 
    where: { id: req.user.id },
  }
  )
  .then((listing) => {
    if (!listing) throw error;
    res.redirect("listings/myListings");
  })
  .catch((error) => {
    res.status(404).render("home/404");
  });
});

module.exports = router;
