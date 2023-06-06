'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    static associate(models) {}
  }

  Type.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Type',
    indexes: [{unique: true, fields: ['title']}]
  });
  return Type;
};