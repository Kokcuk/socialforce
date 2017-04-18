'use strict';
module.exports = function(sequelize, DataTypes) {
  var Proxy = sequelize.define('Proxy', {
    type: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    host: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Proxy;
};