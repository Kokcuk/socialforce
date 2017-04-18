'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.addColumn(
            'Accounts',
            'activity_time',
            Sequelize.BIGINT //seconds
        );
        queryInterface.addColumn(
            'Accounts',
            'likes',
            Sequelize.INTEGER
        );
        queryInterface.addColumn(
            'Accounts',
            'comments',
            Sequelize.INTEGER
        );
        queryInterface.addColumn(
            'Accounts',
            'follows',
            Sequelize.INTEGER
        );
        queryInterface.addColumn(
            'Accounts',
            'posts',
            Sequelize.INTEGER
        );
        queryInterface.addColumn(
            'Accounts',
            'followers',
            Sequelize.INTEGER
        );
        queryInterface.addColumn(
            'Accounts',
            'followings',
            Sequelize.INTEGER
        );
        queryInterface.addColumn(
            'Accounts',
            'settings',
            Sequelize.TEXT
        );
    },

    down: function (queryInterface, Sequelize) {
        queryInterface.removeColumn('Accounts', 'activity_status');
        queryInterface.removeColumn('Accounts', 'likes');
        queryInterface.removeColumn('Accounts', 'comments');
        queryInterface.removeColumn('Accounts', 'follows');
        queryInterface.removeColumn('Accounts', 'posts');
        queryInterface.removeColumn('Accounts', 'followers');
        queryInterface.removeColumn('Accounts', 'followings');
        queryInterface.removeColumn('Accounts', 'settings');
    }
};
