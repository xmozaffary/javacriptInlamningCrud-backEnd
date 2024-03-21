"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Players extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Players.init(
    {
      name: DataTypes.STRING,
      jersey: DataTypes.INTEGER,
      position: DataTypes.STRING,
      team: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Players",
    }
  );
  return Players;
};
