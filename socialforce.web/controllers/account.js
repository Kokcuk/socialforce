var models  = require('../models');
var passwordHash = require('../lib/password_hash');
var passport = require("passport");

exports.signup = function(req, res){
    res.render("account/signup", {layout:"layouts/layout_landing"});
};

exports.postSignup = function(req, res){
    req.checkBody("email", "Invalid email").isEmail();
    req.checkBody("password", "Password must be at least 5 characters").len(5);
    req.checkBody("password", "Password does not match the confirm password").equals(req.body.confirm_password);

    var errors = req.validationErrors();
    if(errors){
        res.render("account/signup", {
            layout:"layouts/layout_landing",
            email: req.body.email,
            errors: errors
        });
        return;
    }
    models.User.create({
        email: req.body.email,
        password: passwordHash(req.body.password)
    }).then(function(user){
        req.logIn(user, function(err) { if (err) { return console.log(err); }
            return res.redirect('/');
        });
    });
}

exports.signin = function(req, res){
    res.render("account/signin", {layout:"layouts/layout_landing"});
};

exports.postSignin = function (req, res, next) {
    req.checkBody("username", "Invalid email").isEmail();
    req.checkBody("password", "Password must be at least 5 characters").notEmpty();

    var errors = req.validationErrors();
    if(errors){
        res.render("account/signin", {
            layout:"layouts/layout_landing",
            email: req.body.email,
            errors: errors
        });
        return;
    }

    models.User.findOne({
        where: {email: req.body.username}
    }).then(function(user){
        if(user && user.password == passwordHash(req.body.password)){
            req.logIn(user, function(err) {
                if (err) {
                    return console.log(err);
                }
                return res.redirect('/');
            });
        }else{
            errors = [{msg:"Invalid user or wrong password"}]
            res.render("account/signin", {
                layout:"layouts/layout_landing",
                email: req.body.email,
                errors: errors
            });
        }
    }).catch(function(error){
        next(error)
    });;
}

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
}