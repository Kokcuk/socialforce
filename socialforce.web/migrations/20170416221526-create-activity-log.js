'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('ActivityLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.INTEGER
      },
      json: {
        type: Sequelize.STRING(1000)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
        accountId:{
            type: Sequelize.BIGINT,
            references: {
                model: 'Accounts',
                key: 'id'
            }
        },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('ActivityLogs');
  }
};