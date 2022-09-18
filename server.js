require("dotenv").config();
const axios = require("axios");
const express = require("express");
const layouts = require("express-ejs-layouts");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("./config/ppConfig");
const isLoggedIn = require("./middleware/isLoggedIn");
const { application, request } = require("express");

const SECRET_SESSION = process.env.SECRET_SESSION;
console.log("yoooooooo.......>>>", SECRET_SESSION);

app.set("view engine", "ejs");

app.use(require("morgan")("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(layouts);

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

app.use("/404", require("./controllers/404"));

app.use((req, res) => {
  res.status(404).render("main/404");
});

app.get("/", (req, res) => {
  res.render("main/index");
});

app.get("./browse", (req, res) => {});
// Add this above /auth controllers
app.get("/profile", isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get();
  res.render("profile", { id, name, email });
});

// access to all of out auth routes GET /auth/login, Get /auth/signup Post routes
app.use("/auth", require("./controllers/auth"));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
