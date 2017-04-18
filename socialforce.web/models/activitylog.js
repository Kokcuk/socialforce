'use strict';
var models = require("../models");

module.exports = function(sequelize, DataTypes) {
  var ActivityLog = sequelize.define('ActivityLog', {
    type: DataTypes.INTEGER,
    json: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
          ActivityLog.belongsTo(models.Account, {foreignKey:"accountId"})
      }
    }
  });
  return ActivityLog;
};