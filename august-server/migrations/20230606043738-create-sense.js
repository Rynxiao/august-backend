'use strict';

const { random } = require('../utils');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('common_sense', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
      },
      cover: {
        type: Sequelize.STRING,
        defaultValue: `https://picsum.photos/id/${random(0, 1050)}/360/170`,
      },
      liked: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      read: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      type: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('common_sense');
  }
};