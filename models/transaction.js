"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.Account, {
        as: "account",
        foreignKey: "accountId",
      });

      Transaction.belongsTo(models.Account, {
        as: "to_acount",
        foreignKey: "to_account_id",
      });

      Transaction.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
      });
    }
  }

  Transaction.init(
    {
      amount: DataTypes.DECIMAL,
      concept: DataTypes.STRING,
      date: DataTypes.DATE,
      type: DataTypes.STRING,
      accountId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Accounts",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      to_account_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Accounts",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
