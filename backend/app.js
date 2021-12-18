const express = require('express');


const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require("path");
//const rateLimit = require("./middleware/rateLimit");
require('dotenv').config();






const app = express();

const db = require("./db.confing");



//app.use(rateLimit);  // Pour empêcher les attaques brutes
app.use(helmet()); //Tous les éléments plus bas sont intégrés à helmet mais cela permet de savoir exactement de quoi helmet protège



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  next();
});



app.use(bodyParser.json()); // Permet d'extraire le format JSON de nos requêtes 


app.use('/images', express.static(path.join(__dirname, 'images'))); // On récupère les images dans notre dossier images




const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const commentRoute = require('./routes/commentRoute');

app.use('/api/', userRoute);
app.use('/api/', postRoute);
app.use('/api/', commentRoute);




module.exports = app;