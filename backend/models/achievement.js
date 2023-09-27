"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Achievement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Achievement.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      achievementName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Achievement",
    }
  );
  return Achievement;
};
