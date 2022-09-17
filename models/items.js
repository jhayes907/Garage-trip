"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.items.belongsTo(models.listing);
      // define association here
    }
  }
  items.init(
    {
      name: DataTypes.STRING,
      tags: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      listingId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "items",
    }
  );
  return items;
};
