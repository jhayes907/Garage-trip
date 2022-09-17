"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.listing.belongsTo(models.user);
    }
  }
  listing.init(
    {
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      tags: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "listing",
    }
  );
  return listing;
};
