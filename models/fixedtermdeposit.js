"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FixedTermDeposit extends Model {
    static associate(models) {
      FixedTermDeposit.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
      });

      FixedTermDeposit.belongsTo(models.Account, {
        as: "account",
        foreignKey: "accountId",
      });
    }
  }

  FixedTermDeposit.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      accountId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Accounts",
          key: "id",
        },
      },
      amount: DataTypes.DECIMAL,
      creation_date: DataTypes.DATE,
      closing_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "FixedTermDeposit",
    }
  );
  return FixedTermDeposit;
};
