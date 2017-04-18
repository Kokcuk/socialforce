var models = require("../models");
var accountState = require("../models/enums/account_state");
var activityStatus = require("../models/enums/activity_status");
var helpers = require("../lib/helpers");

exports.list = function(req, res, next){
    models.Account.findAll({
        where: {userId: req.user.id}
    }).then(function(accounts){
        var accountModels = accounts.map(function(acc){
           return {
               type: acc.type,
               name: acc.login,
               id: acc.id,
               state: helpers.getKeyByValue(accountState, acc.state),
               activity_status: helpers.getKeyByValue(activityStatus, acc.activity_status)
           }
        });
        res.json(accountModels);
    }).catch(function(error){
        next(error)
    });
}

//:id
exports.details = function(req, res, next){
    models.Account.findOne({
        where: {
            id: req.body.id,
            userId: req.user.id
        }
    }).then(function(account){
        var details = {
            id: account.id,
            type: account.type,
            state: account.state,
            activity_status: account.activity_status,
            activity_time: account.activity_time,
            likes: account.likes,
            comments: account.comments,
            follows: account.follows,
            posts: account.posts,
            followers: account.followers,
            followings: account.followings
        };
        res.json(details);
    }).catch(function(error){
        next(error);
    });
};

//req:{type, login, password}
//res:{status, message, id}
exports.add = function(req, res){
    if(!req.body.login || !req.body.password || !req.body.type){
        res.json({status:"invalid input", message:"Login or password or type is empty"});
    }
    var account = {
        type: req.body.type,
        login: req.body.login,
        password: req.body.password,
        state: accountState.created,
        activity_status: activityStatus.stop,
        userId: req.user.id
    };
    models.Account.create(account).then(function(created){
        //TODO: try to login
        res.json({status:"need_confirmation", message:"Need confirmation code from email", id:created.id});
    });
};

//req:{id, code}
//res:{status, message}
exports.updateConfirmationCode = function(req, res){
    models.Account.findOne({
        where: {
            id: req.body.id,
            userId: req.user.id
        }
    }).then(function(account){
        account.confirmation_code = req.body.code;
        account.save().then(function(){
            res.json({status:"success", message:"Confirmed successfully"});
        });
    });

    //res.json({status:"invalid_code", message:"Wrong code, please try again"});
};

//req:{id}
//res:{status}
exports.delete = function(req, res){
    models.Account.findOne({
        where: {
            id: req.body.id,
            userId: req.user.id
        }
    }).then(function(account){
        account.destroy({force: true}).then(function(){
            res.json({status:"success"});
        });
    });
};