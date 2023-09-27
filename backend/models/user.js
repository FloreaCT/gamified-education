"use strict";
const { Model } = require("sequelize");
const FeedItem = require("./feeditem");
const Comment = require("./comment");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.FeedItem, {
        foreignKey: "userId",
        as: "feedItems",
      });

      User.hasMany(models.Comment, {
        foreignKey: "userId",
        as: "comments",
      });
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.TEXT,
      experience: DataTypes.INTEGER,
      weeklyXP: DataTypes.INTEGER,
      monthlyXP: DataTypes.INTEGER,
      level: DataTypes.INTEGER,
      achievements: DataTypes.JSON,
      lastWeeklyUpdate: DataTypes.DATE,
      lastMonthlyUpdate: DataTypes.DATE,
      pathStarted: DataTypes.STRING,
      loginTime: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
