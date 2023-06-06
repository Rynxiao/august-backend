'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sense extends Model {
    static associate(models) {}
  }
  Sense.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    cover: DataTypes.STRING,
    liked: DataTypes.INTEGER,
    read: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sense',
    indexes: [{ unique: true, fields: ['title', 'content'] }]
  });
  return Sense;
};