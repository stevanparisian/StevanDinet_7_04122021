'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    
    static associate(models) {
      // define association here
      models.Message.belongTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  Message.init({
    idUsers: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    attachement: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};