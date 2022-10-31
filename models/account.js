"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      Account.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
      });
    }
  }
  Account.init(
    {
      creationDate: DataTypes.DATE,
      money: DataTypes.DECIMAL(10,2),
      isBlocked: DataTypes.BOOLEAN,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Account",
    }
  );
  return Account;
};
