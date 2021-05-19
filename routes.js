const express = require('express');
const router = express.Router();
const passport = require('passport');
var session = require('express-session');
const User = require("./models/user");

// Make user information available to templates
router.use("/create_debate",function(req, res, next) {
  res.locals.currentUser = req.session.passport.user;
  console.log(res.locals.currentUser);
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});


router.get("/logout", function(req, res){
  req.logout();
  req.session.destroy();
  res.render('/Users/sandeepmysore/Desktop/new/views/index.ejs');
});

router.post("/login", passport.authenticate("login", {
  successRedirect: "/success",
  failureRedirect: "/login",
  failureFlash: true
}));


module.exports = router;
