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
      models.comment.belongsToOne(models.item),
      models.comment.belongsToOne(models.listing),
      models.comment.belongsToOne(models.user)
    }
  }
  comment.init(
    {
      userId: DataTypes.INTEGER,
      listingId: DataTypes.INTEGER,
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
