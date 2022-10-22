"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Catalogue extends Model {
    static associate(models) {}
  }
  Catalogue.init(
    {
      product_description: DataTypes.STRING,
      image: DataTypes.STRING,
      points: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Catalogue",
    }
  );
  return Catalogue;
};
