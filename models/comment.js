"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.comment.belongsTo(models.item),
      models.comment.belongsTo(models.listing),
      models.comment.belongsTo(models.user)
    }
  }
  comment.init(
    {
      userId: DataTypes.INTEGER,
      listingId: DataTypes.INTEGER,
      itemId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "comment",
    }
  );
  return comment;
};
