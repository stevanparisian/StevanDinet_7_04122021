'use strict';

const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {

  class Comment extends Model {
    static associate(models) {
      models.Comment.belongsTo(models.User, {
        foreignKey: 'user_id'

      })

      models.Comment.belongsTo(models.Post, {
        foreignKey: 'post_id'

      })

    }
  };
  Comment.init({
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    content: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Comment',
  });

  return Comment;
}

