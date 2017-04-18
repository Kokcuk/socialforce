var landing = require("./controllers/landing");
var account = require("./controllers/account");
var restricted = require("./controllers/restricted");
var dashboard = require("./controllers/dashboard");
var accounts = require("./controllers/accounts");

function requireLogin(req, res, next) {
    if (req.user) {
        next(); // allow the next route to run
    } else {
        // require the user to log in
        res.redirect("/signin"); // or render a form, etc.
    }
}

module.exports = function(app){
    app.get('/', landing.index);
    app.get('/signup', account.signup);
    app.post('/signup', account.postSignup);
    app.get('/signin', account.signin);
    app.post('/signin', account.postSignin);
    app.post('/logout', account.logout);
    app.get('/test', requireLogin, restricted.index);
    app.get('/dashboard', requireLogin, dashboard.index);
    app.get('/accounts/list', requireLogin, accounts.list);
    app.get('/accounts/details/:id', requireLogin, accounts.details);
    app.post('/accounts/add', requireLogin, accounts.add);
    app.post('/accounts/updateConfirmationCode', requireLogin, accounts.updateConfirmationCode);
    app.post('/accounts/delete', requireLogin, accounts.delete);
}