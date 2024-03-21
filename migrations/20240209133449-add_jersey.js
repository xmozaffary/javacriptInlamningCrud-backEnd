"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.addColumn("Players", "jersey", {
      type: DataTypes.INTEGER(3),
      allowNull: false,
    });
  },
};
