const express = require("express");
const router = express.Router();
const db = require("../models");
const isLoggedIn = require("../middleware/isLoggedIn");

// Get Routes
router.get("/mail", isLoggedIn, (req, res) => {
  res.render("profile/mail");
});

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
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new");
});

router.get("/listings/:id", isLoggedIn, (req, res) => {
  db.listing
    .findOne({
      include: [db.listing],
      where: { id: req.params.id },
    })
    .then((listing) => {
      if (!listing) throw Error();
      res.render("/profile", {
        listings: listings,
      });
    })
    .catch((error) => {
      res.status(400).render("home/404");
    });
});

router.get("/edit", isLoggedIn, (req, res) => {
  db.user
    .findOne({
      where: { id: req.user.id },
    })
    .then((user) => {
      if (!user) throw Error();
      res.render("profile/edit", {
        user,
      });
    })
    .catch((error) => {
      res.status(400).render("home/404");
    });
});

// router.put("/edit", isLoggedIn, (req, res) => {
//   db.user
//     .update(
//       {
//         name: req.body.name,
//         location: req.body.location,
//         email: req.body.email,
//       },
//       {
//         where: { id: req.user.id },
//       }
//     )
//     .then((user) => {
//       if (!user) throw Error();
//       res.redirect("/profile");
//     })
//     .catch((error) => {
//       res.status(400).render("home/404");
//     });
// });

router.put('/:id', async (req, res) => {
  try {
        const foundUser = await db.user.findOne({ where: { email: req.body.email }});
        if (!foundUser) {
          const usersUpdated = await db.user.update({
            email: req.body.email,
            name: req.body.name
          }, {
            where: {
              id: req.params.id
            }
          });
          res.redirect('/profile'); // route
          
        } else if (foundUser.email && foundUser.id !== req.user.id) {
          req.flash('error', 'Email already exists. Please try again.');
          res.redirect('/profile');
        } else {
          const usersUpdated = await db.user.update({
            email: req.body.email,
            name: req.body.name
          }, {
            where: {
              id: req.params.id
            }
          });
  
          console.log('********** PUT ROUTE *************');
          console.log('Users updated', usersUpdated);
          console.log('**************************************************');
    
          // redirect back to the profile page
          res.redirect('/profile'); // route
        }
    } catch (error) {
      console.log('*********************ERROR***********************');
      console.log(error);
      console.log('**************************************************');
      res.render('profile/edit');
    }
  });

// Edit profile route


module.exports = router;
