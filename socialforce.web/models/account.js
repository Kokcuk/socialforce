'use strict';
var models = require("../models");

module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define('Account', {
      type: DataTypes.STRING,
      login: DataTypes.STRING,
      password: DataTypes.STRING,
      state: DataTypes.INTEGER,
      confirmation_code: DataTypes.STRING,
      activity_status: DataTypes.INTEGER,
      activity_time: DataTypes.BIGINT,
      likes: DataTypes.INTEGER,
      comments: DataTypes.INTEGER,
      follows: DataTypes.INTEGER,
      posts: DataTypes.INTEGER,
      followers: DataTypes.INTEGER,
      followings: DataTypes.INTEGER,
      settings: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          Account.belongsTo(models.User,{foreignKey:"userId"})
      }
    }
  });
  return Account;
};