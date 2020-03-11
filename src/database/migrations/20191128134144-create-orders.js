'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      dt_order_issue: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dt_order_delivery: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      dt_order_delivered: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      dt_order_finished: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('orders');
  }
};
