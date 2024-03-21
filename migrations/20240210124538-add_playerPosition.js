"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.addColumn("Players", "position", {
      type: DataTypes.STRING(20),
      allowNull: false,
    });
  },
};
