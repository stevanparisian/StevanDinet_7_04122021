const dbConfig = require("../db.confing");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  //operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;



db.user = require("./user")(sequelize, Sequelize);
db.post = require("./post")(sequelize, Sequelize);
db.comment = require("./comment")(sequelize, Sequelize);



db.user.hasMany(db.post);

db.post.belongsTo(db.user, {
  foreignKey: "user_id",
});

db.post.hasMany(db.comment);
db.comment.belongsTo(db.user, {
  foreignKey: "post_id",
});
db.user.hasMany(db.comment);
db.comment.belongsTo(db.user, {
  foreignKey: "user_id",
});

module.exports = db;
