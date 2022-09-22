"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.comments.belongsTo(models.listing);
      models.comments.belongsTo(models.user);
    }
  }
  comments.init(
    {
      title: DataTypes.STRING,
      body: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      listingId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "comments",
    }
  );
  return comments;
};
