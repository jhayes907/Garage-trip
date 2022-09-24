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
        models.item.belongsTo(models.listing),
        models.item.belongsToOne(models.user),
        models.item.hasMany(models.comment)
    }
  }
  item.init(
    {
      userId: DataTypes.INTEGER,
      listingId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      tags: DataTypes.STRING,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "item",
    }
  );
  return item;
};
