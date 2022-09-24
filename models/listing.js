'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.listing.belongsToOne(models.user),
      models.listing.hasMany(models.item),
      models.listing.hasMany(models.comment)
    }
  }
  listing.init({
    userId: DataTypes.STRING,
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    tags: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'listing',
  });
  return listing;
};