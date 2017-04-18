'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      queryInterface.addColumn(
          'Accounts',
          'confirmation_code',
          Sequelize.STRING
      )
  },

  down: function (queryInterface, Sequelize) {
      queryInterface.removeColumn('Accounts', 'confirmation_code')
  }
};
