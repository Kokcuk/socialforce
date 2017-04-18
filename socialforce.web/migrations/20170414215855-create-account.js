'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      type: {
        type: Sequelize.STRING
      },
      login: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
        userId:{
            type: Sequelize.BIGINT,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        state:{
          type: Sequelize.INTEGER
        }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Accounts');
  }
};