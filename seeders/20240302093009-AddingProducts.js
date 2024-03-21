"use strict";
const faker = require("faker");
const { Players } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    for (let i = 0; i < 50; i++) {
      const name = faker.name.findName();
      const jersey = faker.random.number({ min: 1, max: 100 });
      const position = faker.random.arrayElement([
        "Goalie",
        "Defence",
        "Forward",
        "Center",
        "Right Wnig",
        "Left wing",
      ]);
      let team = faker.company.companyName();
      team = team.slice(0, 12);

      await Players.create({ name, jersey, position, team });
    }
  },
};
