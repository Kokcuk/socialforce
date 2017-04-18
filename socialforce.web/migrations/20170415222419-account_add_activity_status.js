'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.addColumn(
            'Accounts',
            'activity_status',
            Sequelize.INTEGER
        )
    },

    down: function (queryInterface, Sequelize) {
        queryInterface.removeColumn('Accounts', 'activity_status')
    }
};
