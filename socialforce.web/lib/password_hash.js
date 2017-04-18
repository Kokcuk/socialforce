var crypto = require('crypto');
var settings = require("../config/settings.json");

module.exports = function(password){
    var hash = crypto.createHmac("sha1", settings.password_salt)
        .update(password).digest('hex');

    return hash;
}