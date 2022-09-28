require("dotenv").config();
const axios = require("axios");
const express = require("express");
const layouts = require("express-ejs-layouts");
const rowdy = require("rowdy-logger");
const app = express();
const rowdyResults = rowdy.begin(app);
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("./config/ppConfig");
const methodOverride = require("method-override");
// const moment = require("moment");
const db = require("./models");

const isLoggedIn = require("./middleware/isLoggedIn");
const { application, request } = require("express");

const SECRET_SESSION = process.env.SECRET_SESSION;
console.log("yoooooooo.......>>>", SECRET_SESSION);

app.set("view engine", "ejs");
app.use(require("morgan")("dev"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(layouts);

// app.use((req, res, next) => {
//   res.locals.moment = moment;
//   next();
// });

app.use(flash());

app.use(
  session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Add a session

app.use((req, res, next) => {
  console.log("res locals >>>", res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

// Index route
app.get("/", (req, res) => {
  res.render("home/index");
});

// app.get("/", (req, res) => {
//   db.listing
//     .findOne({
//       include: [db.listing],
//       where: { id: req.listing.id },
//       limit: 5,
//       order: [["updatedAt", "DESC"]],
//     })
//     .then((listings) => {
//       if (!listings) throw Error();
//       res.render("home/index", {
//         //listings,
//       });
//     })
//     .catch((error) => {
//       res.status(400).render("home/404");
//     });
// });

// Add this above /auth controllers
app.get("./index", isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get();
  res.render("profile/index", { id, name, email });
});

// access to all auth routes GET /auth/login, Get /auth/signup Post routes
app.use("/auth", require("./controllers/auth"));

app.use("/404", require("./controllers/404"));

app.use("/profile", require("./controllers/profile"));

app.use("/listings", require("./controllers/listings"));

app.use("/browse", require("./controllers/browse"));

app.use("/about", require("./controllers/about"));

app.use("/contact", require("./controllers/contact"));

app.use("/feedback", require("./controllers/feedback"));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
  rowdyResults.print();
});

module.exports = server;
