"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.items.belongsTo(models.listing);
      models.items.belongsTo(models.user);
      models.items.hasMany(models.comments);
    }
  }
  item.init(
    {
      listingId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      tags: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "item",
    }
  );
  return item;
};
