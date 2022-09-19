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
const moment = require("moment");
const isLoggedIn = require("./middleware/isLoggedIn");
const { application, request } = require("express");

const SECRET_SESSION = process.env.SECRET_SESSION;
console.log("yoooooooo.......>>>", SECRET_SESSION);

app.set("view engine", "ejs");

app.use(require("morgan")("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(layouts);

app.use((req, res, next) => {
  res.locals.moment = moment;
  next();
});

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

// Add this above /auth controllers
app.get("/profile/index", isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get();
  res.render("profile/index", { id, name, email });
});

// Index route
app.get("/", (req, res) => {
  res.render("main/index.ejs");
});

// access to all of out auth routes GET /auth/login, Get /auth/signup Post routes
app.use("/404", require("./controllers/404"));
app.use("/auth", require("./controllers/auth"));
app.use("/browse", require("./controllers/browse"));
app.use("/about", require("./controllers/about"));
app.use("/contact", require("./controllers/contact"));
app.use("/feedback", require("./controllers/feedback"));
// app.use("/profile", require("./controllers/profile"));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
  rowdyResults.print();
});

module.exports = server;
