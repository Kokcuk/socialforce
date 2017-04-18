var express = require("express");
var path = require('path');
var morgan = require("morgan");
var handlebars = require('handlebars');
var debug = require("debug")("server");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var expressValidator = require("express-validator");
var sequelize = require("sequelize");
var passwordHash = require('./lib/password_hash');

var models = require("./models");
var routes = require("./routes");


passport.use(new LocalStrategy(
    function(username, password, cb) {
        models.User.findOne({
            where: {email: username}
        }).then(function(user){
            if(user && user.password == passwordHash(req.body.password)){
                cb(null, user);
            }else{
                cb(null, false);
            }
        });
    }));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    models.User.findOne({
        where: {id: id}
    }).then(function(user){
        if(user){
            cb(null, user);
        }else{
            cb(null, false);
        }
    });
});


var app = express();
app.use(morgan('dev'));
app.use('/static', express.static('public'));
app.use('/img', express.static('img'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({ secret: '6d026d6f-f2b5-457c-a7f0-0a72d641b7a3', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator());
app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const port = 3000;
routes(app);

app.listen(port, function(){
    debug("server started, port "+port);
})