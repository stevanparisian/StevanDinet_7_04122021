'use strict';

const {Model} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    
  class Post extends Model {
    static associate(models) {
      models.Post.belongsTo(models.User, {
        foreignKey: 'user_id'
        
      })
    }
  };
  Post.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });

  return Post;
}

