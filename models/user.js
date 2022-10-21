"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, {
        as: "role",
        foreignKey: "roleId",
      });
    }
  }

  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: {
        unique: true,
        type: DataTypes.STRING,
      },
      password: DataTypes.STRING,
      points: DataTypes.INTEGER,
      roleId: {
        type: DataTypes.INTEGER,
        defaultValue: 2,
        references: {
          model: "Roles",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
