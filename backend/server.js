// imports

const express = require('express');
const bodyParser = require('body-parser');
const app = require('./app');
const dotenv = require('dotenv');
const result = dotenv.config();


// instantiate server
const server = express();

//body parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// configure routes
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour sur mon server</h1>');
});



// Launch server
server.listen(8080, function() {
    console.log('Server en écoute');
});