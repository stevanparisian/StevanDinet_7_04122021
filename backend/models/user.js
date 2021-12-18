

  'use strict';
const {Model, TINYINT} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate(models) {
    
      models.User.hasMany(models.Post);
    }
  };
  User.init({
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    picture : DataTypes.STRING,
    isAdmin : TINYINT,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};