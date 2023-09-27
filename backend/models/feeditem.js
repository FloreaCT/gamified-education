"use strict";
const { Model } = require("sequelize");
const User = require("./user");
const Comment = require("./comment");

module.exports = (sequelize, DataTypes) => {
  class FeedItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FeedItem.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });

      FeedItem.hasMany(models.Comment, {
        foreignKey: "feedItemId",
        as: "comments",
      });
    }
  }
  FeedItem.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      likedBy: {
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: "FeedItem",
    }
  );

  return FeedItem;
};
