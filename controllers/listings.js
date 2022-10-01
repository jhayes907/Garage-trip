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
  db.listing
    .findAll({
      where: { id: req.params.id },
      include: [db.id, db.listing, db.items],
    })
    .then((listings) => {
      if (!listings) throw Error();
      res.render("listings/myListings", { listings: listings });
    })
    .catch((err) => {
      res.render("home/404");
    });
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
// router.put("/:id", isLoggedIn, (req, res) => {
//   db.listing
//     .update(
//       {
//         name: req.body.name,
//         location: req.body.location,
//         tags: req.body.tags,
//         content: req.body.content,
//       },
//       {
//         where: { id: req.listing.id },
//       }
//     )
//     .then((req, res) => {
//       res.redirect("listings/myListings");
//     })
//     .catch((error) => {
//       res.status(400).render("home/404");
//     });
// });

router.put('/:id', isLoggedIn, async (req, res) => {
  try {
      const foundListing = await db.listing.findOne({ where: { id: req.body.id }});
      if (foundListing.name && foundListing.id !== req.listing.id) {
        req.flash('error', 'Cannot edit this listing.');
        res.redirect('/listings/myListings');
      } else {
        const listingUpdated = await db.listing.update({
          name: req.body.name,
          location: req.body.location,
          tags: req.body.tags,
          content: req.body.content
        }, {
          where: {
            id: req.params.id
          }
        });

        console.log('********** PUT ROUTE *************');
        console.log('Listing updated', listingUpdated);
        console.log('**************************************************');
  
        // redirect back to the profile page
        res.redirect('/listings/mylistings'); // route
      }
  } catch (error) {
    console.log('*********************ERROR***********************');
    console.log(error);
    console.log('**************************************************');
    res.render('listings/edit');
  }
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
router.delete("/:id", isLoggedIn, (req, res) => {
  db.listing
    .delete(
      {
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        content: req.body.content,
      },
      {
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
