const mysql = require('mysql2')
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
})


connection.connect((err)=>{
  if (err) throw err;

 console.log("Connexion à la base de donnée réussie!")
}) 

connection.end(); 

module.exports = {
  HOST: process.env.host,
  USER: process.env.user,
  PASSWORD: process.env.password,
  
    DB: process.env.database,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  