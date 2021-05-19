const express = require("express");
const bodyParser=require("body-parser");
const mongoose = require('mongoose');
const User = require("./models/user");
const Schema = mongoose.Schema;
const Debate = require("./models/debate");
const Comment = require("./models/comment");
const passport = require('passport');
const cookieParser = require('cookie-parser'); //new
const session = require('express-session'); //new
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();
const app = express();
const routes = require("./routes");

app.set("views", __dirname + "/views/");
app.set("view engine", "ejs");
app.engine('ejs', require('ejs').__express);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'hcetbew',
  store: new MongoStore({ mongooseConnection: mongoose.connection, autoRemove: 'native' })
}));
app.use(routes);

function sesh(user){
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(_id, done) {
        User.findById(_id, function(err, user) {
            done(err, user);
        });
    });
};

// setup the authentication strategy
passport.use("login", new LocalStrategy({
    usernameField: 'email_id',
    passwordField: 'password'
}, function(username, password, done) {
  User.findOne({email_id: username}, function(err, user){
    console.log(user);
    if (err) {
        return done(err)
    };
    if (!user) {
      return done(null, false, {message: "No user with that username"});
    };
    if(!password == user.password){
        return done(null, false, {message: "Invalid password"});
    }
    else{
        console.log(user);
        sesh(user);
        return done(null, user);
    }
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(_id, done) {
        User.findById(_id, function(err, user) {
            done(err, user);
        });
    });
});
}));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://ompatel:Omanivaid123@cluster0.isotw.mongodb.net/lets_debate_trial');
var db=mongoose.connection;

db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback) {
    console.log("connection succeeded");
})

app.get('/',function(req,res) {
    res.render('/Users/sandeepmysore/Desktop/new/views/index.ejs');
}).listen(27017);

app.get('/signup',function(req,res) {
    res.render('/Users/sandeepmysore/Desktop/new/views/signup.ejs');
});

app.get('/login',function(req,res) {
    res.render('/Users/sandeepmysore/Desktop/new/views/login.ejs');
});

app.get('/success',function(req,res){
    res.render('/Users/sandeepmysore/Desktop/new/views/success.ejs');
});

app.get('/create_debate',function(req,res){
    res.render('/Users/sandeepmysore/Desktop/new/views/create_debate.ejs');
});

app.post('/signup',function(req,res) {
    var firstname = req.body.first_name;
    var lastname = req.body.last_name;
    var email_id = req.body.email_id;
    var password = req.body.password;

    User.findOne({ email_id: email_id }, function(err, user) {
        if (err) {
            return next(err);
        }
        if (user) {
            req.flash("error", "User already exists");
            return res.redirect("/Users/sandeepmysore/Desktop/new/views/login.ejs");
        }
        var newUser = new User({
            first_name: firstname,
            last_name:lastname,
            email_id:email,
            password: password,
            preferences:[],
            debate_id_liked:[],
            comments_id_liked:[]
        });
        newUser.save();
    });
    res.render('/Users/sandeepmysore/Desktop/new/views/login.ejs');
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

app.post('/create_debate', function(req,res){
    var title = req.body.title;
    var main_category =req.body.main_category;
    var sub_category =req.body.sub_category;

    var data = {
        "title": title,
        "topic":topic,
        "sub_category":sub_category,
    }

    db.collection('debates').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log(title);
        console.log(main_category);
        console.log(sub_category);
        console.log("Record inserted Successfully");
    });
    res.render('/Users/sandeepmysore/Desktop/app/views/success.ejs');
});
